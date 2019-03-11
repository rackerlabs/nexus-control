# Control Repository for developer.rackspace.com

[![Build Status](https://build.developer.rackspace.com/rackerlabs/nexus-control/badge?branch=master)](https://build.developer.rackspace.com/rackerlabs/nexus-control/)

Deconst control repository used to host [developer.rackspace.com](https://developer.rackspace.com/) and [support.rackspace.com](https://support.rackspace.com/). Changes to this repository take effect several minutes after being merged to master. Check [https://developer.rackspace.com/version/](https://developer.rackspace.com/version/) to see the most recent commit that's active in production. Invalid contents (incorrect JSON syntax, malformed templates) cause the repository to simply stop updating.

## Local testing

To test changes to templates or assets on your local machine before pushing them to production, follow these instructions. Replace `/path/to` with whatever root directory you wish.

1. Install Docker. Either [Docker Toolbox](https://docs.docker.com/engine/installation/mac/) or the [Docker for Mac or Windows beta](https://beta.docker.com/docs/) will work. Before you continue:

 * You should be able to run `docker version` on a terminal and see both `Client:` and `Server:` in the output before continuing.
 * You should be able to run `docker-compose version` without seeing "command not found".

2. Clone [deconst/integrated](https://github.com/deconst/integrated), this repository, and any relevant content repositories. [rackerlabs/docs-developer-blog](https://github.com/rackerlabs/docs-developer-blog) includes the frontpage and is a likely candidate.

  ```bash
  git clone https://github.com/rackerlabs/nexus-control.git
  git clone https://github.com/deconst/integrated.git
  git clone https://github.com/rackerlabs/docs-developer-blog.git
  ```

3. Copy the file `integrated-env` from the `nexus-control` clone to `env` and replace the value of `CONTROL_REPO_HOST_PATH` with the path to your nexus-control clone.

    ```bash
    cp /path/to/nexus-control/integrated-env /path/to/integrated/env

    ${EDITOR} /path/to/integrated/env
    # Change this line:
    #  export CONTROL_REPO_HOST_PATH= ; echo "Please set CONTROL_REPO_HOST_PATH in ${BASH_SOURCE[@]}" && return 1
    # To:
    #  export CONTROL_REPO_HOST_PATH=/path/to/nexus-control
    ```

4. Navigate to your deconst/integrated repository. Source the `env` file within your shell.

    ```bash
    cd /path/to/integrated
    source ./env
    ```

5. Launch services with docker-compose.

    ```bash
    cd /path/to/integrated
    docker-compose up -d

    # Wait for "content-service listening at http://[::]:8080" to appear, then ^C
    docker-compose logs -f content
    ```

6. Perform the initial asset and content load.

    ```bash
    cd /path/to/integrated

    script/add-assets /path/to/nexus-control

    script/add-jekyll /path/to/docs-developer-blog

    # For Sphinx content:
    # script/add-sphinx /path/to/docs-quickstart
    ```

Visit port 80 of your Docker host *([`http://localhost/`](http://localhost/) for the Docker beta, consult `docker-machine ip` for Docker Toolbox)* and verify that the content and assets you see match those on [the live site](https://developer.rackspace.com/). :tada:

For the path to content, see [config/content.d/developer.rackspace.com.json](https://github.com/rackerlabs/nexus-control/blob/master/config/content.d/developer.rackspace.com.json).
For example: [`http://localhost/docs/rkaas`](http://localhost/docs/rkaas/).

#### Making changes

deconst/integrated will *not* live-reload changes that you make locally. After you make changes to the control repository, refresh your instance by running:

```bash
cd /path/to/integrated

docker-compose restart presenter

script/add-assets /path/to/nexus-control
```

If you're unable to connect after doing this, wait several seconds for the presenter to start fully.

#### Debugging

If the control repository does not load, look for errors in the presenter's output:

```bash
cd /path/to/integrated

docker-compose logs presenter
```

Note that both the presenter and content service take several seconds to launch and begin listening.

#### Shutting down

To shut the system down completely and remove all local state, to start again from a blank slate:

```bash
cd /path/to/integrated

docker-compose stop
docker-compose rm -fv
```
