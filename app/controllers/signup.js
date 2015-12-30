'use strict';

angular.module('app.controllers')
  .controller('SignUpCtrl', function ($scope, $state, $filter, $rootScope, $window, $q) {
    // Get number of the current step
    var currentStep = function () {
      return $state.current.views.signupContent.data.currentStep;
    };

    var forms = [];

    $scope.user = {};

    $scope.company = {};

    $scope.clinic = {};

    $scope.practitioner = {};

    $scope.officeHours = {};

    $scope.times = [];

    $scope.errors = [];

    $scope.submitted = false;


    $scope.getIndexByValue = function (array, element) {
      var foundItem = $filter('filter')(array, element, true)[0];
      var index = array.indexOf(foundItem);
      return index
    };

    var deleteFromArray = function (array, element) {
      var index = $scope.getIndexByValue(array, element);
      var res = array.slice(0, index);
      res = res.concat(array.slice(index + 1, array.length));
      return res;
    };

    var goNext = function () {
      $scope.submitted = false;
      $state.go('signup.' + (currentStep() + 1));
    };

    var submitFirstStep = function () {
      console.log($scope)
      if (forms.step1.$valid) {
         goNext();
      }
    };

    var submitSecondStep = function () {
      if (forms.step2.$valid) {

            goNext();

      }

    };

    var submitThirdStep = function () {

            goNext();


    };

    var submitForthStep = function () {
      var savePractitioner = function () {
        $scope.practitioner.site_id = $scope.clinic.id;
        $scope.practitioner.image = $scope.practitionerImage[0].uri;
        var professional = new Professional($scope.practitioner);
        professional.$save().then(
          function (response) {
            $state.go('app.home');
          }, function (response) {
            $scope.errors = response.data.errors;
          });
      };

      if (forms.step4.$valid) {
        $scope.uploadPhotos($scope.practitionerImage, savePractitioner);
      }
    };

    $scope.isNotFirst = function () {
      return currentStep() > 1;
    };

    $scope.back = function () {
      $scope.errors = [];
      $scope.submitted = false;
      $state.go('signup.' + (currentStep() - 1));
    };

    $scope.isCurrentState = function (step) {
      return currentStep() === step;
    };

    $scope.setForm = function (form, formName) {
      forms[formName] = form;
    };

    $scope.copyCompany = function (isCopy) {
      if (isCopy) {
        $scope.clinic.name = $scope.company.trading_name;
        var commonFields = ['address_line_1', 'address_line_2', 'country', 'district', 'postcode', 'city'];
        angular.forEach(commonFields, function (fieldName) {
          $scope.clinic[fieldName] = $scope.company[fieldName];
        });
      }
    };

    $scope.uploadPhoto = function (media, identifier) {
      var deferred = $q.defer();
      if (media.uri || media.local_uri === null) {
        deferred.resolve();
      } else {
        S3.upload(media.local_uri, identifier, 'signup', media.croppedName).then(function (file_uri) {
          media.uri = file_uri;
          deferred.resolve();
        }, function (error) {
          console.log(error);
          deferred.reject(error);
        });
      }
      return deferred.promise;
    };

    $scope.uploadPhotos = function (array, save) {
      // Specifies identifier for creating S3 folder depending on step number
      var identifier = currentStep() == 3 ? $scope.clinic.name : $scope.practitioner.user.email;
      var chain = array.reduce(function (chain, media) {
          return chain.then(function (previousValue) {
            return $scope.uploadPhoto(media, identifier);
          });
        }, $q.when('start')
      );
      chain.then(function (lastResult) {
        save();
      }, function (error) {
        console.log(error);
      });
    };

    $scope.setDefault = function (image) {
      $scope.errors = [];
      $scope.clinicDefault = image;
    };

    $scope.submit = function () {
      $scope.submitted = true;
      switch (currentStep()) {
        case 1:
          submitFirstStep();
          break;
        case 2:
          submitSecondStep();
          break;
        case 3:
          submitThirdStep();
          break;
        default:
          submitForthStep();
      }

    };
  });
