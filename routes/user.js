var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
	res.render('user',{userid:'test'});
});

router.get('/:userid', function(req, res, next){
	res.render('user',{userid:req.params.userid});
});

module.exports = router;