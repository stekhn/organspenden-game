(function () {

    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isChrome = !!window.chrome && !isOpera;

    var app = angular.module('app', ['ngDragDrop', 'ngSanitize']);

    app.controller('MainCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

        if (!isChrome) {
            $scope.showFallback = true;
        }

        $scope.started = false;
        $scope.ended = false;
        $scope.won = false;
        $scope.day = 0;
        $scope.level = 0;

        $http.get('data/data.json').success(function (data) {

            $scope.data = data;

            $scope.illCounter = $scope.data.illPersons;
            $scope.popupTitle = $scope.data.startText.heading;
            $scope.popupText = $scope.data.startText.text;
        });

        $scope.onDrop = function (target, source) {

            if (target.type === source.type && target.status != "dead") {

                $scope.organs[source.index].unused = false;
                target.status = "saved";
                $scope.savedCounter++;
            }
        };


        $scope.startGame = function () {

            disableCampaign($scope, $timeout);
            $scope.started = true;
            $scope.savedCounter = 0;
            $scope.deadCounter = 0;

            $scope.patients = [];
            $scope.organs = [];

            generatePatients($scope);
            generateOrgans($scope);
            dayCounter($scope);

        };

        $scope.startCampaign = function () {
            if (!$scope.donationDisabled) {
                generateOrgansRandom($scope, 3);
                disableCampaign($scope, $timeout)
            }
        }

        $scope.donationDisabled = true;


        $scope.illCounter = 0;
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
                healthCounter($scope, $timeout);
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

        var counter = 0;
        for (var organ in $scope.data.donors[$scope.level]) {
            for (var i = 0; i < $scope.data.donors[$scope.level][organ]; i++) {
                $scope.organs.push({
                    "unused": true,
                    "type": organ,
                    "index": counter
                });

                counter++;
            }
        }
    }


    function generateOrgansRandom($scope, count) {
        var organs = $scope.data.level[$scope.level];

        var min = 0;
        var max = organs.length - 1;

        var length = Math.round(Math.random() * (count - 1) + 1);

        var organLength = $scope.organs.length;

        for (var i = 0; i <= length; i++) {

            var index = Math.random() * (max - min) + min;
            var type = organs[Math.round(index)];

            $scope.organs.push({
                "unused": true,
                "type": type,
                "index": organLength + i
            });
        }
    }

    function healthCounter($scope, $timeout) {

        $.each($scope.patients, function (key, value) {

            var start = new Date();
            var maxTime = Math.floor(Math.random() * (($scope.data.maxSpeed - $scope.data.minSpeed) + $scope.data.minSpeed));

            animateUpdate();

            function updateProgress() {

                $scope.$parent.started = $scope.deadCounter + $scope.savedCounter != $scope.patients.length;

                if (!$scope.$parent.started) {
                    levelControl($scope.$parent, $timeout);
                }

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

    function levelControl($scope, $timeout) {

        $timeout(function () {
            $scope.started = false;
        }, 1000);


        var msg = $scope.data.messages[$scope.level];

        if ($scope.patients.length / 2 < $scope.savedCounter) {
            $scope.level++;
            $scope.won = true;

            $scope.popupTitle = msg.win.heading;
            $scope.popupText = msg.win.text;
            if ($scope.level > 3){
                $scope.ended = true;
            }

        } else {
            $scope.won = false;

            $scope.popupTitle = msg.lose.heading;
            $scope.popupText = msg.lose.text + "<br/> <br/> Du hast " + $scope.savedCounter + " von " + $scope.patients.length + " gerettet.";
        }

    }


}());
