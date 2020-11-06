'use strict';

let doing = angular.module('myApp.view1', ['ngRoute'])

doing.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/karyawanindex', {
        templateUrl: 'view1/KaryawanIndex.html',
        controller: 'View1Ctrl'
    });

    // $locationProvider.html5Mode({
    //         enabled: true,
    //         requireBase: false
    //     });
}]);

doing.controller('View1Ctrl', function ($scope, $http) {
    $scope.$emit("refresh", true);

    $scope.$on('refresh', function (event) {
            $http({
                method: 'GET',
                url: 'http://localhost:8080/employee'
            }).then(function success(response) {
                $scope.value = response.data.content
                $scope.employees = $scope.value

        //         $scope.searchEmployee = function(keyword) {
        //
        //             if (typeof keyword == "" || keyword.length === 0) {
        //                 $scope.employees = $scope.value
        //             } else {
        //                 //we make search string lower case
        //                 let searchLower = keyword.toLowerCase();
        //
        //
        //                 $scope.employees= $scope.employees.filter(employee => {
        //
        //                         employee.name.toLowerCase().includes(searchLower)
        //                     }
        //                 )
        //             }
        //             console.log($scope.employees)
        //         }
            })
        //
        })


});

doing.controller('deleteServiceCtrl', function ($scope, $http) {
    $scope.id = null;
    $scope.deleteData = function (id) {
        console.log(id)
        var said = confirm('Are you sure want to delete ?');

        if (said == false) {
            alert("delete canceled!")
        } else {
            $http.delete('http://localhost:8080/employee/' + id).then(function (response) {
                alert("delete Success!")
                $scope.msg = "Data Deleted Successfully!";
                $scope.$emit("refresh", true);
            }, function (response) {
                $scope.msg = "Service not Exists";
                $scope.statusval = response.status;
                $scope.statustext = response.statusText;
                $scope.headers = response.headers();
            });
        }
    };
});
