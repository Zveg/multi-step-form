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
          })  
          
          .state('signup',{
            url:'/signup',
            abstract: true,
            templateUrl: "views/signup/signup.html",
            controller: 'SignUpCtrl'
          })

          .state('signup.1', {
            url: "/",
            data: {
              stepNumber: 1
            },
            views: {
              'signups' : {
                templateUrl: "views/signup/step1.html"
              }
            }
          }).state('signup.2', {
            url: "/",
            data: {
              stepNumber: 2
            },
            views: {
              'signups' : {
                templateUrl: "views/signup/step1.html"
              }
            }
          }).state('signup.3', {
            url: "/",
            data: {
              stepNumber: 3
            },
            views: {
              'signups' : {
                templateUrl: "views/signup/step1.html"
              }
            }
          });

    
    

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    });

