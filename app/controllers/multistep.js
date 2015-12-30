'use strict';

angular.module('app.controllers')
  .controller('MultiStepCtrl', function ($scope, $state, $filter) {
    $scope.user = {};
    $scope.forms = {};
    var childStates = function (name) {
      var routerRegexp = new RegExp(name + "[.][a-z]*", "i");
      var list = $state.get();
      var children = [];
      angular.forEach(list, function (state) {
        if (routerRegexp.test(state.name)) {
          children.push(state);
        }
      });
      return children;
    };

    $scope.childrenRoutes = childStates("multistep");

    var getRouterByNumber = function (number) {
      return $filter("filter")($scope.childrenRoutes, {data: {stepNumber: number}}, true)[0];
    };

    var nextStep = function () {
      return getRouterByNumber($state.current.data.stepNumber + 1)
    };


    var previousStep = function () {
      return getRouterByNumber($state.current.data.stepNumber - 1)
    };

    var currentStep = function () {
      return $state.current.data.stepNumber;
    };

    $scope.isCurrentState = function (step) {
      return currentStep() >= step;
    };

    var submitForm = function () {
      alert("Form submited!!!!");
    };

    $scope.goNext = function (form) {
      var nextRouter = nextStep();
      if (!nextRouter) {
        submitForm();
        return
      }
      $state.go(nextRouter);
    };

    $scope.isNotFirst = function () {
      return !!previousStep()
    };

    $scope.back = function () {
      $state.go(previousStep());
    };

    $scope.log = function (form) {
      console.log(form);
    };
  });
