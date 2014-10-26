(function () {

    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isChrome = !!window.chrome && !isOpera;

    var app = angular.module('app', ['ngDragDrop']);

    app.controller('MainCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

        if (!isChrome){
            $scope.showFallback = true;
        }

        $http.get('data/data.json').success(function (data) {

            $scope.data = data;

            $scope.illCounter = $scope.data.illPersons;

        });

        $scope.onDrop = function (target, source) {

            if (target.type === source.type && target.status != "dead") {

                $scope.organs[source.index].unused = false;
                target.status = "saved";
                $scope.savedCounter++;
            }
        };

        $scope.started = false;
        $scope.day = 0;

        $scope.startGame = function () {

            $scope.level = 0;
            disableCampaign($scope, $timeout);
            $scope.started = true;
            $scope.savedCounter = 0;
            $scope.deadCounter = 0;
            generatePatients($scope);
            generateOrgans($scope);
            dayCounter($scope);

        };

        $scope.startCampaign = function () {
            if (!$scope.donationDisabled) {
                generateOrgans($scope, 3);
                disableCampaign($scope, $timeout)
            }
        }

        $scope.donationDisabled = true;


        $scope.illCounter = 0;

        $scope.organs = [];
    }]);


    function enableDonation($scope) {
        $scope.donationDisabled = false;
    }

    function disableCampaign($scope, $timeout) {
        $scope.donationDisabled = true

        $timeout(function () {
            enableDonation($scope)
        }, $scope.data.campaignStop);
    }


    app.controller('RenderController', ['$scope', '$timeout', function ($scope, $timeout) {

        $scope.$on('done', function (ngRepeatFinishedEvent) {

            $timeout(function () {
                healthCounter($scope);
            }, 1000);

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

        for (var organ in $scope.data.patients[$scope.level]) {
            for (var i = 0; i < $scope.data.patients[$scope.level][organ]; i++) {
                $scope.patients.push({
                    "status": "alive",
                    "index": i,
                    "type": organ,
                    "health": Math.floor(Math.random() * ($scope.data.maxHealth - $scope.data.minHealth) + $scope.data.minHealth)
                });
            }
        }
    }

    function generateOrgans($scope, count) {

        var organs = $scope.data.level[$scope.level];

        var min = 0;
        var max = organs.length - 1;

        var length = 6;
        if (count) {
            length = Math.round(Math.random() * (count - 1) + 1);
        }

        for (var i = 0; i <= length; i++) {

            var index = Math.random() * (max - min) + min;
            var type = organs[Math.round(index)];

            $scope.organs.push({
                "unused": true,
                "type": type,
                "index": i
            });
        }
    }

    function healthCounter($scope) {

        $.each($scope.patients, function (key, value) {

            var start = new Date();
            var maxTime = Math.floor(Math.random() * (($scope.data.maxSpeed - $scope.data.minSpeed) + $scope.data.minSpeed));

            animateUpdate();

            function updateProgress() {

                $scope.$parent.started = $scope.deadCounter + $scope.savedCounter != $scope.patients.length;

                console.log($scope.started);

                if ($scope.patients[key].health > 0 && $scope.patients[key].status === "alive") {
                    --$scope.patients[key].health;
                }

                if ($scope.patients[key].health <= 0 && $scope.patients[key].status === "alive") {
                    $scope.patients[key].status = "dead";
                    $scope.$parent.deadCounter++;
                }

                $scope.$apply();
            }

            function animateUpdate() {

                var now = new Date();
                var timeDiff = now.getTime() - start.getTime();
                var time = Math.round((timeDiff / maxTime));

                if ($scope.started && time >= 0) {
                    updateProgress();
                    setTimeout(animateUpdate, maxTime);
                }
            }
        });
    }

    function dayCounter($scope) {

        if ($scope.started && !$scope.paused) {
            setTimeout(function () {
                $scope.day++;
                $scope.$apply();
                dayCounter($scope);
            }, 1000);
        }
    }


}());
