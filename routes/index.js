var express = require('express');
var router = express.Router();
var enJSON = require('../lang/en-US.json');
var twJSON = require('../lang/zh-TW.json');

router.get('/switchlanguage', function(req, res){
  if(req.query.lang === "zh-TW"){
    res.send(JSON.stringify(twJSON));
  }
  else{
    res.send(JSON.stringify(enJSON));
  }
});

router.get('/detectlanguage', function(req, res){
  var lang = req.header("Accept-Language");
  if(lang.indexOf("zh-TW") !== -1){
    res.send(JSON.stringify(twJSON));
  }
  else{
    res.send(JSON.stringify(enJSON));
  }
});

module.exports = router;
