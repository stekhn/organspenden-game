(function () {

    var app = angular.module('app', ['ngDragDrop']);

    app.controller('JsonLoaderCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

        $http.get('data/data.json').success(function (data) {

            $scope.data = data;

            $scope.illCounter = $scope.data.illPersons;

        });

        $scope.onDrop = function (target, source) {

            if (target.type === source.type) {


                $scope.organs[source.index].unused = false;
                target.saved = true;
                $scope.savedCounter++;
                console.log(target);
            }

            console.log(source.index);
        };

        $scope.started = false;

        $scope.startGame = function () {

            $scope.started = true;
            generatePatients($scope);
            generateOrgans($scope);
        };

        $scope.savedCounter = 0;
        $scope.diedCounter = 0;
        $scope.illCounter = 0;
        $scope.getNumber = function (num) {
            return new Array($scope.savedCounter);
        };

    }]);

    app.controller('RenderController', ['$scope', '$timeout', function ($scope, $timeout) {

        $scope.$on('done', function (ngRepeatFinishedEvent) {

            $timeout(function(){
                healthCounter($scope);
            }, 1000)

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

    function generatePatients($scope) {

        $scope.patients = [];

        for (var organ in $scope.data.patients) {
            for (var i = 0; i < $scope.data.patients[organ]; i++) {
                $scope.patients.push({
                    "saved": false,
                    "index": i,
                    "type": organ,
                    "health": Math.floor(Math.random() * ($scope.data.maxHealth - $scope.data.minHealth) + $scope.data.minHealth)
                });
            }
        }
    }

    function generateOrgans($scope) {

        $scope.organs = [];

        var counter = 0;
        for (var organ in $scope.data.donors) {
            for (var i = 0; i < $scope.data.donors[organ]; i++) {

                $scope.organs.push({
                    "unused": true,
                    "type": organ,
                    "index": counter
                });
                counter++;
            }
        }
    }

    function healthCounter($scope) {

        $.each($scope.patients, function(key, value) {

            var start = new Date();
            var maxTime = Math.floor(Math.random() * (($scope.data.maxSpeed - $scope.data.minSpeed) + $scope.data.minSpeed));

            animateUpdate();

            function updateProgress() {

                if ($scope.patients[key].health > 0 && !$scope.patients[key].saved) {
                    --$scope.patients[key].health;
                    $scope.$apply();
                }

                if ($scope.patients[key].health <= 0) {
                    $scope.patients[key].dead = true;
                }
            }

            function animateUpdate() {

                var now = new Date();
                var timeDiff = now.getTime() - start.getTime();
                var time = Math.round((timeDiff / maxTime));

                if (time >= 0) {
                    updateProgress();
                    setTimeout(animateUpdate, maxTime);
                }
            }
        });
    }

}());
