(function () {

    var app = angular.module('app', ['ngDragDrop']);

    app.controller('JsonLoaderCtrl', ['$scope', '$http', function ($scope, $http) {

        $http.get('data/data.json').success(function (data) {

            $scope.data = data;

            generatePatients($scope);
            generateOrgans($scope);
        });

    }]);

    app.directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit(attr.onFinishRender);
                    });
                }
            }
        };
    });


    app.controller('PatientController', ['$scope', function ($scope) {

        $scope.$on('done', function(ngRepeatFinishedEvent) {

            console.log("Patients rendered.");
        });
    }]);

    function generatePatients($scope) {

        $scope.patients = [];

        for (var organ in $scope.data.patients) {
            for (var i = 0; i < $scope.data.patients[organ]; i++) {
                $scope.patients.push({
                    "type": organ,
                    "health": Math.floor(Math.random() * ($scope.data.maxHealth - $scope.data.minHealth) + $scope.data.minHealth),
                    "chances": Math.floor(Math.random() * ($scope.data.maxChances - $scope.data.minChances) + $scope.data.minChances)
                });
            }
        }
    }

    function generateOrgans($scope) {

        $scope.organs = [];

        for (var organ in $scope.data.donors) {
            for (var i = 0; i < $scope.data.donors[organ]; i++) {
                console.log(organ);
                $scope.organs.push({
                    "type": organ,
                });
            }
        }
    }


}());
