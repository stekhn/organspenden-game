(function () {

    var app = angular.module('app', ['ngDragDrop']);

    app.controller('JsonLoaderCtrl', ['$scope', '$http', function ($scope, $http) {

        $http.get('data/data.json').success(function (data) {

            $scope.data = data;

            generatePatients($scope);
            generateOrgans($scope);
        });

        $scope.onDrop = function (target, source) {

            console.log(this);
            if (target.type, source.type) {

                $scope.patients[target.index].saved = "true";
            }
        };

    }]);

    function generatePatients($scope) {

        $scope.patients = [];

        for (var organ in $scope.data.patients) {
            for (var i = 0; i < $scope.data.patients[organ]; i++) {
                $scope.patients.push({
                    "saved": "false",
                    "index": i,
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
                    "index": i
                });
            }
        }
    }


}());
