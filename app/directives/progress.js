angular.module('app.directives')
  .directive('progress', function ($state) {
    return {
      restrict: 'E',
      replace: true,
      link: function ($scope, element, attrs) {
        var childStates = function(name){
          var routerRegexp = new RegExp(name + "[.][a-z]*", "i");
          var list = $state.get();
          var children = [];
          angular.forEach(list, function(state){
            if (routerRegexp.test(state.name)){
              children.push(state);
            }
          });
          return children;
        };



      }
    }
  });
