


 var mainApp = angular.module("mainApp", []);

 mainApp.run(function($rootScope) {
	$rootScope.web3_provider = 'http://frontier-lb.ether.camp';
  });

 mainApp.factory('MathService', function() {     
	 var factory = {};  
	 factory.multiply = function(a, b) {
		return a * b 
	 }
	 return factory;
  }); 
	  

 mainApp.factory('AssetService', function($rootScope) {     
	 var factory = {};  
	 
	 factory.price = function(symbol, callback) {
	 
			var web3 = require('web3');
			web3.setProvider(new web3.providers.HttpProvider($rootScope.web3_provider));	
			
			var nameRegAbi = [{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"addressOf","outputs":[{"name":"addr","type":"address"}],"type":"function"}];
  		    var nrAddress = "0x985509582b2c38010bfaa3c8d2be60022d3d00da";
			var Namereg = web3.eth.contract(nameRegAbi).at(nrAddress);
			
			Namereg.addressOf.call("ether-camp/price-feed", function(err, pfAddress){            
				var priceFeedAbi = [{"constant":true,"inputs":[{"name":"symbol","type":"bytes32"}],"name":"getPrice","outputs":[{"name":"currPrice","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"symbol","type":"bytes32"}],"name":"getTimestamp","outputs":[{"name":"timestamp","type":"uint256"}],"type":"function"}];
				var PriceFeed = web3.eth.contract(priceFeedAbi).at(pfAddress);
				
				// GLD // USDT_ETH //  USDT_BTC // EURUSD // SP500
				PriceFeed.getPrice.call(symbol, callback);						 	 		
			});
	 }
	 
	 factory.timestamp = function(symbol, callback) {
	 
			var web3 = require('web3');
			web3.setProvider(new web3.providers.HttpProvider($rootScope.web3_provider));	
			
			var nameRegAbi = [{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"addressOf","outputs":[{"name":"addr","type":"address"}],"type":"function"}];
  		    var nrAddress = "0x985509582b2c38010bfaa3c8d2be60022d3d00da";
			var Namereg = web3.eth.contract(nameRegAbi).at(nrAddress);
			
			Namereg.addressOf.call("ether-camp/price-feed", function(err, pfAddress){
			
				var priceFeedAbi = [{"constant":true,"inputs":[{"name":"symbol","type":"bytes32"}],"name":"getPrice","outputs":[{"name":"currPrice","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"symbol","type":"bytes32"}],"name":"getTimestamp","outputs":[{"name":"timestamp","type":"uint256"}],"type":"function"}];
				var PriceFeed = web3.eth.contract(priceFeedAbi).at(pfAddress);				
				PriceFeed.getTimestamp.call(symbol, callback);
			
			});            
	}
	 
	 factory.contract = function(callback) {
	 
			var web3 = require('web3');
			web3.setProvider(new web3.providers.HttpProvider($rootScope.web3_provider));	
			
			var nameRegAbi = [{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"addressOf","outputs":[{"name":"addr","type":"address"}],"type":"function"}];
  		    var nrAddress = "0x985509582b2c38010bfaa3c8d2be60022d3d00da";
			var Namereg = web3.eth.contract(nameRegAbi).at(nrAddress);
			
			Namereg.addressOf.call("ether-camp/price-feed", callback);
	 }
	 
	 
	 
	 return factory;
  }); 

	  
mainApp.service('CalcService', function(MathService){
    this.square = function(a) { 
		return MathService.multiply(a,a); 
	}
});	  


 mainApp.controller('CalcController', function($scope, $interval, CalcService, AssetService) {

		$scope.feedTableData = [
			{'symbol' : 'USDT_ETH', 'name':'ETH/USD', 'price' : '0', 'timestamp' : '0', 'denom' : '1000000'},
			{'symbol' : 'BTC_ETH', 'name':'BTC/ETH', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},
			{'symbol' : 'USDT_BTC', 'name':'USD/BTC', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},

			{'symbol' : 'EURUSD', 'name':'EUR/USD', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},
			{'symbol' : 'GBPUSD', 'name':'GBP/USD', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},
			{'symbol' : 'USDJPY', 'name':'USD/JPY', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},

			{'symbol' : 'XAUUSD', 'name':'Gold', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},
			{'symbol' : 'XAGUSD', 'name':'Silver', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},
			
			{'symbol' : 'SP500', 'name':'S&P 500', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},
			{'symbol' : 'NASDAQ', 'name':'NASDAQ', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},
		
  	 	    {'symbol' : 'AAPL', 'name':'Apple', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},
  	 	    {'symbol' : 'GOOG', 'name':'Google', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},
  	 	    {'symbol' : 'MSFT', 'name':'Microsoft', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},
  	 	    {'symbol' : 'GM', 'name':'General Motors', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},
  	 	    {'symbol' : 'GE', 'name':'General Electric', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},
  	 	    {'symbol' : 'WMT', 'name':'Walmart', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},

  	 	    {'symbol' : 'F', 'name':'Ford Motor', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},
  	 	    {'symbol' : 'T', 'name':'AT&T', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},
			
    
			//{'symbol' : 'EURUSD', 'name':'EUR/USD', 'price' : '0' , 'timestamp' : '0', 'denom' : '1000000'},

		];
 
		$scope.updateAll = function() {
		
			for (var row in $scope.feedTableData){
						
			
				(function(row_idx){	   
					AssetService.price($scope.feedTableData[row_idx].symbol, function(err, result){
					
						var price = result / $scope.feedTableData[row_idx].denom;
						
						$scope.$apply(function(){
							$scope.feedTableData[row_idx].price = price;																	
						});
						
					});	  

					AssetService.timestamp($scope.feedTableData[row_idx].symbol, function(err, result){
					
						var timestamp = result;
						
						$scope.$apply(function(){
							$scope.feedTableData[row_idx].timestamp = timeSince(timestamp) + " ago";
						});
						
					});	  
				
				})(row);
				
			}		
									
		}
		
		AssetService.contract(function(err, result){

			$scope.$apply(function(){
				$scope.contract = result;
			});				
		});
		
		$scope.updateAll();
		$interval($scope.updateAll, 60000);
		
});

function timeSince(timestamp) {

	var now =  new BigNumber(new Date().getTime() / 1000);
    var seconds = Math.floor((now.minus(timestamp)));
	
    var interval = Math.floor(seconds / 31536000);
	
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}