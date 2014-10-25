(function() {

	var app = angular.module('app', []);

	app.controller('JsonLoaderCtrl', ['$scope', '$http', function ($scope, $http) {

		$http.get('data/data.json').success(function (data) {

			$scope.data = data;
		});

	}]);

	
}());