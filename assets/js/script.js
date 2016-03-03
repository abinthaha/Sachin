'use strict';

angular.module('sachin', [])
.controller('dataCtrl', ['$scope',
	function ($scope) {
		$scope.tableData = [];
		$scope.checkVar = false;

		$.getJSON('../assets/json/sachin.json', function(data) {
		    window.setTimeout(function(){
		    	$scope.tableData = angular.copy(data);
		    })
		    console.log($scope.tableData);
		    $scope.checkVar = true;
		 	$('#table_container').DataTable();
		});
	}
])