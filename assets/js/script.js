'use strict';

angular.module('sachin', [])
.controller('dataCtrl', ['$scope', '$http',
	function ($scope, $http) {
		$scope.tableData = [];
		$scope.showTable = false;
		$scope.cellNumber = 10;

		$scope.showLoader = true;
		$http.get('assets/json/sachin.json').success(function(data){
			$scope.tableData = data;
			$scope.showLoader = false;
		});
		$http.get('assets/json/records.json').success(function(data){
			$scope.recordData = data;
			$scope.showLoader = false;
		});
		$scope.resultButtons = [
			'Won Matches', 'Total Runs', 'Runs Conceded', 'Total Wickets', 'Out in 0'
		]
		$scope.populateResults = function(index){
			var count = 0;
			switch (index) {
				case 0:
					_.each($scope.tableData, function (row) {
						if(row.match_result == "won")
							count = count+1;
						$scope.result_input = count;
					})
					break;
				case 1:
					_.each($scope.tableData, function (row) {
						var val = _.isFinite(row.batting_score) ? JSON.parse(row.batting_score) : 0;
						count = count+val;
						$scope.result_input = count;
					})
					break;
				case 2:
					_.each($scope.tableData, function (row) {
						var val = _.isFinite(row.runs_conceded) ? JSON.parse(row.runs_conceded) : 0;
						count = count+val;
						$scope.result_input = count;
					})
					break;
				case 3:
					_.each($scope.tableData, function (row) {
						var val = _.isFinite(row.wickets) ? JSON.parse(row.wickets) : 0;
						count = count+val;
						$scope.result_input = count;
					})
					break;
				case 4:
					_.each($scope.tableData, function (row) {
						if (_.isFinite(row.batting_score)) {
							if (JSON.parse(row.batting_score) == 0) {
								count += 1;
							}
						}
						$scope.result_input = count;
					})
					break;
				default:

			}
		}
		$scope.$watch('tableData', function(newValue, oldValue){
			$scope.showLoader = false;
		})
		$('#page_load li a').click(function () {
			$scope.scrollFunction(event.target.id);
		})
		$('.load_more_button').click(function(){
			$scope.cellNumber += 10;
		})
		$scope.scrollFunction = function(target){
			var el;
			if (target == 'table') {
				el = $("#table_container");
			}
			else if (target == 'result') {
				el = $('#results');
			}
			else if (target == 'home') {
				el = $('#home_div');
			}
			$('html, body').animate({
			   scrollTop: el.offset().top
		   }, 2000);
		}
	}
])
