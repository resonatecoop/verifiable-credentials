var express = require('express');
var axios = require('axios')
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/purchase', function(req, res) {
  
  /* Transaction is handled by the relevant Resonate application */
  console.log("Transaction completed");
  
  const username = "angus";
  const user_id = "1234";
  const artist_id = "ar_12345";
  
  /* Send request to our issuer */
  const issuer_base_url = "http://127.0.0.1:1880";
  const vc_base_url = "http://localhost:4000";
  
  axios.post(`${issuer_base_url}/v1/RegisterWithIssuer`, {
    vcIssuer: vc_base_url,
	  authnCreds: {
      "username": username,
      "user_id": user_id,
      "artist_id": artist_id
    }
  }).then(res => {
    if (res.status == 200) {
      console.log("Credentials Issued.")
    } else {
      console.log("Credentials failed to issue.");
    }
  }).catch(error => {
    console.log(`Credentials failed to issue with error: ${error}`);
  });
  
  res.redirect('/completed');
});

module.exports = router;
