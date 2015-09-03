'use strict';

/* Services */


  
var AssetService = hackEtherCampApp.service('Asset', function () {
    this.price = function (symbol) { 

			var web3 = require('web3');
			web3.setProvider(new web3.providers.HttpProvider('http://frontier-2.ether.camp:8082'));			

			var nameRegAbi = [{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"addressOf","outputs":[{"name":"addr","type":"address"}],"type":"function"}];
  		    var nrAddress = "0x985509582b2c38010bfaa3c8d2be60022d3d00da";
			var Namereg = web3.eth.contract(nameRegAbi).at(nrAddress);
			
			//var pfAddress = Namereg.addressOf("ether.camp/price-feed");

			// 54ed9f047958ede820978d22486fd996255ced72
			var pfAddress = Namereg.addressOf.call("ether-camp/price-feed");
//			var pfAddress = Namereg.register.sendTransaction("ether.camp/price-feed", { from: '0x54ed9f047958ede820978d22486fd996255ced72' });

            
			var priceFeedAbi = [{"constant":true,"inputs":[{"name":"symbol","type":"bytes32"}],"name":"getPrice","outputs":[{"name":"currPrice","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"symbol","type":"bytes32"}],"name":"getTimestamp","outputs":[{"name":"timestamp","type":"uint256"}],"type":"function"}];
			var PriceFeed = web3.eth.contract(priceFeedAbi).at(pfAddress);
			
			// GLD // USDT_ETH //  USDT_BTC // EURUSD // SP500
			var price = PriceFeed.getPrice.call(symbol);
			// var ts    = PriceFeed.getTimestamp.call("SP500");
			
			
			console.log(price.toString());
			console.log(ts.toString());
		
			return price;	
	};
});  
  
