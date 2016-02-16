var angular = require('angular');

var moduleName = 'carina.landing-pages.carina-workshop-form';
module.exports = moduleName;

var SIGNUP_HOST = 'https://formcapture.getcarina.com';

angular.module(moduleName, [])
.controller('WorkshopFormCtrl', ['$http', function ($http) {
  this.formData = {
    handlerId: 'carinaEmail',
    name: '',
    email: '',
    phone: ''
  };

  this.status = 'waiting';
  this.errorMessage = '';

  this.submitForm = function () {
    this.status = 'submitting';
    this.errorMessage = '';

    $http({
      method: 'POST',
      url: SIGNUP_HOST + '/collect',
      data: this.formData
    })
    .then(function (response) {
      if(window.ga) {
        window.ga('send', 'event', {
          eventCategory: 'signup-conversion',
          eventLabel: 'lp-carina-devops-workshop-form-submit',
          eventAction: 'submit'
        });
      }
      this.status = 'submitted';
      return;
    }.bind(this))
    .catch(function (response) {
      this.status = 'waiting';
      this.errorMessage = response.data.error || 'Sorry, we were unable to complete your request.';

      return;
    }.bind(this));
  };
}]);
