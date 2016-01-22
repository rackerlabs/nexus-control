#!/bin/bash

set -e

#
# nexus_dev.sh
# Helper script for changes to the nexus-control repo.  Expects the presenter
# to be in an image tagged "presenter-service:1.0.0".
#
# Expected environment variables:
#   CONTENT_STORE_URL = full url of the content store endpoint
#   CONTENT_STORE_APIKEY = api key for the content store
#

# validate that the necessary env varaibles exist
[ -z "$CONTENT_STORE_URL" ] && echo "Need to set CONTENT_STORE_URL" && exit 1;
[ -z "$CONTENT_STORE_APIKEY" ] && echo "Need to set CONTENT_STORE_APIKEY" && exit 1;

# validate that the presenter tag can be found
if [[ "$(docker images -q presenter-service:1.0.0 2> /dev/null)" == "" ]]; then
  echo "Docker image tagged 'presenter-service:1.0.0' not found"
fi

# build the presenter container
function build_presenter {
  # stopping and removing a presenter container, if it exists
  docker stop presenter > /dev/null 2>&1 || true
  docker rm presenter > /dev/null 2>&1 || true

  # build and push the content store
  push_content_store

  echo "building local presenter..."

  # create a new presenter
  docker run -d -p 80:8080 \
              -e NODE_ENV=development \
              -e CONTROL_REPO_PATH=/var/control-repo \
              -e CONTENT_SERVICE_URL=$CONTENT_STORE_URL \
              -e PRESENTED_URL_PROTO=http \
              -e PRESENTED_URL_DOMAIN=support.rackspace.com \
              -v `pwd`:/var/control-repo \
              --name presenter \
              presenter-service:1.0.0 script/dev

}

# push the content store
function push_content_store {
  echo "building and pushing assets to the content repo..."

  # env variables needed to make sure that we push to the content store
  export PUBLISH="true"
  export TRAVIS_PULL_REQUEST="false"

  # build and push the content to the store
  grunt build -v
}

COMMAND="$1"

case ${COMMAND} in
  build)
    build_presenter
    ;;
  push)
    push_content_store
    docker restart presenter > /dev/null 2>&1
    ;;
  *)
    echo "unknown command: ${COMMAND}" && exit 1;
    ;;
esac

echo "Done."
exit 0
