var angular = require('angular');

var moduleName = 'drc.components.rackuid';
module.exports = moduleName;

angular.module(moduleName, ['$cookies', 'md5'])
.run(function ($cookies, md5) {
  var rackUidCookieName = 'IS_UASrackuid';
  var rackUid = $cookies.get(rackUidCookieName);
  var rackUidRegex = /^[A-Z]{2}[a-z0-9]{32,34}$/;
  if (!rackUidRegex.test(rackUid)) {
    var currentDate = new Date();
    rackUid = 'US' + md5.createHash(currentDate.toString());
    var cookieOptions = {
      domain: '.rackspace.com',
      expires: new Date().setDate(currentDate.getDate() + (365 * 20))
    };
    $cookies.put(rackUidCookieName, value, cookieOptions);
  }
});
