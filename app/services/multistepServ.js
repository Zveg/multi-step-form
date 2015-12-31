angular.module("app.services")
  .factory("multistepServ", ["$state", "$filter", function ($state, $filter) {
    var parentStateName = function () {
      return $state.current.name.split('.')[0]
    };
    return {
      // Returns list of all steps for current multistep form
      multistepRoutes: function () {
        // Regexp for multistep routes
        var routerRegexp = new RegExp(parentStateName() + "[.][a-z]*", "i");
        //List of all routes in the app
        var list = $state.get();
        var children = [];
        angular.forEach(list, function (state) {
          //If state name fits the regexp - add it to children array
          if (routerRegexp.test(state.name)) {
            children.push(state);
          }
        });
        return children;
      },
      // Get router by it's 'data.stepNumber' value
      getRouterByNumber: function (number) {
        return $filter("filter")(this.multistepRoutes(), {data: {stepNumber: number}}, true)[0];
      },

      nextStep: function () {
        return this.getRouterByNumber($state.current.data.stepNumber + 1)
      },

      previousStep: function () {
        return this.getRouterByNumber($state.current.data.stepNumber - 1)
      }
    }
  }]
  );
