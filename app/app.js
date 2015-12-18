'use strict';

angular.module('app.controllers', []);

angular.module('app', [
    'app.controllers',
    'ui.router'
])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app', {
                url: "/",
                templateUrl: "views/initial.html",
                controller: 'InitialCtrl'

            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    });

