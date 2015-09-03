'use strict';

/* Controllers */


function AssetCtrl($scope, $http, $location, Asset){

	$scope.price = Asset.price('GLD');
	//$scope.timestamp = Asset.timestamp('GLD');
}

angular.module('hackEtherCampApp', []).controller('AssetCtrl', AssetCtrl)







