var angular = require('angular');

var moduleName = 'carina.signup.signup-form';
module.exports = moduleName;

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
      url: 'http://localhost:8080/api/signup',
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
