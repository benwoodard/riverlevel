var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');

var router = express.Router();

router.get('/', function(req,res){
	res.render('rivers',{
		rivers:[
			{riverName:'skagit mount vernon',riverId:'mvew1'},
			{riverName:'skagit concret',riverId:'conw1'}
		]
	});
});

router.get('/state/:state',function(req,res){
	request('http://water.weather.gov/ahps2/rss/obs/'+req.params.state+'.rss',
	function(error, response, body){
		if(!error && response.statusCode === 200){
			var $ = cheerio.load(body);
			console.log($('rss channel').html());
			// var result = _.map($('rss').html(),function(d){
			// 	return d;
			// });
			// 
			// console.log(result);
			// var guages = $('');
			// res.render('guages',{guages:guages});
			
		}
		
	});
});

router.get('/:riverid', function(req, res){
	request('http://water.weather.gov/ahps2/hydrograph_to_xml.php?gage='+
		req.params.riverid+'&output=xml', function (error, response, body) {
			if (!error && response.statusCode === 200) {
				// parse data here
				var $ = cheerio.load(body);
				
				var river = {};
				river ={
					name : $('site').attr('name'),
					id : req.params.rivreid,
					floodstage: $('site sigstages flood').text(),
					observed:_.max(_.map($('site observed').children().children(),function(d){
							if(d.name === 'primary'){
								return d.children[0].data;
							}
					})),
					forcast:_.max(_.map($('site forecast').children().children(),function(d){
							if(d.name === 'primary'){
								return d.children[0].data;
							}
					}))
				};
				
				res.render('river',{river:river});
				
			} 
		}
	);
});

module.exports = router;