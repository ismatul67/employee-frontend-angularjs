'use strict';

let passingData = angular.module('myApp.view2', ['ngRoute'])

passingData.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/karyawaneditadd/:theParam', {
        templateUrl: 'view2/KaryawanAddEdit.html',
        controller: 'View2Ctrl'
    });

    // $locationProvider.html5Mode({
    //         enabled: true,
    //         requireBase: false
    //     });
}])

passingData.controller('getEmployeeById', function ($scope, $http, $routeParams) {

  if ($routeParams.theParam!="id"){
      let id = $routeParams.theParam

      $scope.isAdd=false;
      $http({
          method: 'GET',
          url: `http://localhost:8080/employee/${id}`
      }).then(function success(response) {
          $scope.value = response.data
          console.log($scope.value, "valueee")
      })
  }else{
      $scope.isAdd=true;
      $scope.value={name:null,birthDate:null,positionId:null,idNumber:null,gender:null};
  }
});

passingData.controller('getPositions', function ($scope, $http) {
    $http({
        method: 'GET',
        url: 'http://localhost:8080/position'
    }).then(function success(response) {
        $scope.positions = response.data.content
    })
});

passingData.controller('View2Ctrl', function ($scope, $http) {
    if ($scope.isAdd==false){
        $scope.putData = function (name, birthDate, positionId, idNumber, gender) {
            var said = confirm('Are you sure want to update this data ?');
            if (said == true) {
                var data = {
                    id: $scope.value.id,
                    name: name,
                    birthDate: birthDate,
                    positionId: positionId,
                    idNumber: idNumber,
                    gender: gender,
                    remove: $scope.value.remove
                };
                console.log(data)
                $http.put('http://localhost:8080/employee', JSON.stringify(data)).then(function (respon) {
                        if (respon.data)
                            $scope.msg = "Submitted Successfully!"
                    }, function (respon) {
                        $scope.msg = "Service not Exists";
                        $scope.statusval = respon.status;
                        $scope.statustext = respon.statusText;
                        $scope.headers = respon.headers();
                    }
                )
                alert("Data has been updated! Back to see the data")
            } else {
                alert("Data update canceled!")
            }
        }
    }
    else{
        $scope.$emit("reset", true);
        $scope.$on('reset', function (event) {
            $scope.value.name = null;
            $scope.value.birthDate = null;
            $scope.value.positionId = null;
            $scope.value.idNumber = null;
            $scope.value.gender = null;
        })


        $scope.postData = function (name, birthDate, positionId, idNumber, gender) {
            var said = confirm('Are you sure want to submit this ?');
            if (said == true) {

                var data = {
                    name: name,
                    birthDate: birthDate,
                    positionId: positionId,
                    idNumber: idNumber,
                    gender: gender,
                };

                console.log(data)

                $http({
                    method: 'GET',
                    url: `http://localhost:8080/employee//check/${idNumber}`
                }).then(function success(response) {
                    $scope.isReady = response.data

                    if ($scope.isReady == false) {
                        $http.post('http://localhost:8080/employee', JSON.stringify(data)).then(function (response) {
                                if (response.data)
                                    $scope.msg = "success"
                            }, function (response) {
                                $scope.msg = "failed";
                                $scope.statusval = response.status;
                                $scope.statustext = response.statusText;
                                $scope.headers = response.headers();
                            }
                        )
                        alert("Data has been submit! Back to see the data")
                        $scope.$emit("reset", true);

                    } else {
                        alert("NIP was used!")
                    }
                })

            } else {
                alert("Add data Canceled !")
            }

        }

    }
})
