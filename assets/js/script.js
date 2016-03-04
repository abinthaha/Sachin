'use strict';

angular.module('sachin', [])
.controller('dataCtrl', ['$scope', '$http',
	function ($scope, $http) {
		$scope.tableData = [];
		$scope.showTable = false;
		$scope.cellNumber = 10;

		$scope.showLoader = true;
		$http.get('assets/json/sachin.json').success(function(data){
			_.each(data, function(a){
				if (a.runs_conceded != '-' && a.runs_conceded > 0) {
					$scope.tableData.push(a);
				}
			})
			$scope.showLoader = false;
		});

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
