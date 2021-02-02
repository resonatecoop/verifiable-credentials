var express = require('express');
var axios = require('axios')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hey Angus, confirm your purchase of "Every Open Eye" by CHVRCHES' });
});

router.post('/purchase', function(req, res) {
  
  console.dir("Purchase completed by other Resonate systems");
  
  axios.post('http://127.0.0.1:1880/v1/RegisterWithIssuer', {
    vcIssuer: "http://localhost:4000",
	  authnCreds: {
      "username": "angus",
      "user_id": "12345",
      "track_id": "tr_12345",
      "artist_id": "ar_12345"
    }
  }).then(res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res.data)
  }).catch(error => {
    console.error(error)
  });
  
  res.sendStatus(200);
});

module.exports = router;
