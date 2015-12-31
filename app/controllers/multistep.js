'use strict';

angular.module('app.controllers')
  .controller('MultiStepCtrl', ["$scope", "$state", "$filter", "multistepServ", function ($scope, $state, $filter, multistepServ) {
    $scope.user = {};
    $scope.forms = {};


    var submitForm = function () {
      alert("Form submited!!!!");
    };

    $scope.goNext = function () {
      console.log($scope.forms.current);
      var nextState = multistepServ.nextStep();
      if (!nextState) {
        submitForm();
        return
      }
      $state.go(nextState);
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

    $scope.log = function (form) {
      console.log(form);
    };
  }]);
