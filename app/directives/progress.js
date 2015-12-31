angular.module('app.directives')
  .directive('progress', ['$state', 'multistepServ', function ($state, multistepServ) {
    return {
      restrict: 'E',
      templateUrl:"views/templates/progress.html",
      replace: true,
      link: function ($scope, element, attrs) {

        $scope.childrenRoutes = multistepServ.multistepRoutes();
        $scope.isCurrentState = function (route) {
          return $state.current.data.stepNumber >= route.data.stepNumber;
        };
      }
    }
  }]);
