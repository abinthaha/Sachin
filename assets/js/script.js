'use strict';

angular.module('sachin', [])
.controller('dataCtrl', ['$scope', '$http',
	function ($scope, $http) {
		$scope.tableData = [];
		$scope.checkVar = false;

		$scope.showLoader = true;
		$http.get('assets/json/sachin.json').success(function(data){
			$scope.tableData = data;
            console.log($scope.tableData);
			$('#table_container').DataTable({});
			$scope.showLoader = false;
		});
		$scope.$watch('tableData', function(newValue, oldValue){
			$scope.showLoader = false;
		})
	}
])
