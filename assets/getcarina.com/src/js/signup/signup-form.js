var angular = require('angular');

var moduleName = 'carina.signup.signup-form';
module.exports = moduleName;

var SIGNUP_HOST = process.env.CARINA_SIGNUP_HOST || 'https://app.getcarina.com';

angular.module(moduleName, [])
.controller('SignupFormCtrl', ['$http', function ($http) {
  this.formData = {
    username: '',
    password: ''
  };

  this.status = 'waiting';
  this.errorMessage = '';

  this.submitForm = function () {
    this.status = 'submitting';
    this.errorMessage = '';

    $http({
      method: 'POST',
      url: SIGNUP_HOST + '/api/signup',
      data: this.formData
    })
    .then(function (response) {
      this.status = 'submitted';
      return;
    }.bind(this))
    .catch(function (response) {
      this.status = 'waiting';
      this.errorMessage = response.data.error || 'Sorry, we were unable to complete your signup request.';

      return;
    }.bind(this));
  };
}]);
