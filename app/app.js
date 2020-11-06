'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [

    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    // $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/karyawanindex'});
    // $locationProvider.html5Mode({
    //         enabled: true,
    //         requireBase: false
    //     });
}]);

// angular.module('myApp', [
//     'ngRoute',
//     'myApp.view1',
//     'myApp.view2',
//     'myApp.version'
// ])
//     .config(function($routeProvider, $locationProvider) {
//
//         $routeProvider.when('/karyawanindex', {
//                 templateUrl: 'view1/KaryawanIndex.html',
//                 controller: 'View1Ctrl'
//             })
//
//         $routeProvider.when('/karyawaneditadd/:theParam', {
//                 templateUrl: 'view2/KaryawanAddEdit.html',
//                 controller: 'View2Ctrl'
//             });
//
//     $routeProvider.otherwise({redirectTo: '/karyawanindex'});
//         // use the HTML5 History API
//         $locationProvider.html5Mode({
//             enabled: true,
//             requireBase: false
//         });
//     });
