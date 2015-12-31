'use strict';

angular.module('app.controllers', []);
angular.module('app.directives', []);
angular.module('app.services', []);

angular.module('app', [
    'app.controllers',
    'app.directives',
    'app.services',
    'ui.router'
])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app', {
                url: "/",
                templateUrl: "views/initial.html",
                controller: 'InitialCtrl'

            })

          .state('multistep',{
            url:'/multistep',
            abstract: true,
            templateUrl: "views/multistep/multistep.html",
            controller: 'MultiStepCtrl'
          })

          .state('multistep.Name', {
            url: "/",
            data: {
              stepNumber: 1
            },
            views: {
              'multisteps' : {
                templateUrl: "views/multistep/step1.html"
              }
            }
          })

          .state('multistep.address', {
            url: "/",
            data: {
              stepNumber: 2
            },
            views: {
              'multisteps' : {
                templateUrl: "/views/multistep/step2.html"
              }
            }
          })

          .state('multistep.telephone', {
            url: "/",
            data: {
              stepNumber: 3
            },
            views: {
              'multisteps' : {
                templateUrl: "/views/multistep/step3.html"
              }
            }
          })

          .state('multistep.age', {
            url: "/",
            data: {
              stepNumber: 4
            },
            views: {
              'multisteps' : {
                templateUrl: "/views/multistep/step4.html"
              }
            }
          });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    });

