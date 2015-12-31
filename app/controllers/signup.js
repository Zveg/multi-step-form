'use strict';

angular.module('app.controllers')
  .controller('SignUpCtrl', function ($scope, $state, $filter, $rootScope, $window, $q, multistepServ) {
    // Get number of the current step
    $scope.goNext = function (form) {
      var nextRouter = multistepServ.nextStep();
      if (!nextRouter) {
        submitForm();
        return
      }
      $state.go(nextRouter);
    };

    $scope.isFirst = function () {
      return !multistepServ.previousStep()
    };

    $scope.isLast = function () {
      return !multistepServ.nextStep()
    };

    $scope.back = function () {
      $state.go(multistepServ.previousStep());
    };
  });
