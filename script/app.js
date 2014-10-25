(function() {

	var app = angular.module('app', []);

	app.controller('JsonLoaderCtrl', ['$scope', '$http', function ($scope, $http) {

		$http.get('data/data.json').success(function (data) {

			$scope.data = data;

			generatePatients($scope);
		});

	}]);

	function generatePatients($scope) {

		$scope.patients = [];

		for (var organ in $scope.data.patients) {
			for (var i = 0; i < $scope.data.patients[organ]; i++) {
				$scope.patients.push({
					"organ": organ,
					"health": Math.floor(Math.random() * ($scope.data.maxHealth - $scope.data.minHealth) + $scope.data.minHealth),
					"chances": Math.floor(Math.random() * ($scope.data.maxChances - $scope.data.minChances) + $scope.data.minChances)
				});
			}
		}
	}

	
}());