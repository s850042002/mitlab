var express = require('express');
var router = express.Router();
var enJSON = require('../lang/en.json');
var twJSON = require('../lang/tw.json');

router.get('/lang', function(req, res){
  if(req.query.lang === "en"){
    res.send(JSON.stringify(enJSON));
  }
  else{
    res.send(JSON.stringify(twJSON));
  }
});

router.get('/', function(req, res) {
    console.log(req.user);
});

module.exports = router;
