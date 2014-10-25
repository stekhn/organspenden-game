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

    app.controller('RenderController', ['$scope', function ($scope) {

        $scope.$on('done', function(ngRepeatFinishedEvent) {

            console.log("Patients rendered.");
            healthCounter($scope);
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
                    "saved": "false",
                    "index": i,
                    "type": organ,
                    "health": Math.floor(Math.random() * ($scope.data.maxHealth - $scope.data.minHealth) + $scope.data.minHealth)
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

    function healthCounter($scope) {

        var patients = $('.patient-health');
        $.each(patients, function(key, value) {
            console.log(patients[key]);
        });
    }

    function decreaseHealth($scope) {

        var start = new Date();
        var maxTime = 36000;
        var timeoutVal = Math.floor(maxTime/100);
        animateUpdate();

        function updateProgress(percentage) {
            console.log($('.patient-health .bar').width());
            $('.patient-health .bar').css("width", percentage + "%");
            $('.patient-health .text').text(percentage + "%");
        }

        function animateUpdate() {
            var now = new Date();
            var timeDiff = now.getTime() - start.getTime();
            var perc = Math.round((timeDiff/maxTime)*100);
            console.log(perc);
              if (perc <= 100) {
               updateProgress(perc);
               setTimeout(animateUpdate, timeoutVal);
              }
        }
    }


}());
