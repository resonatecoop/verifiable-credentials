var express = require('express');
var router = express.Router();

router.get('/authenticate', function(request, response) {
  // validate username and OTP

  response.end();
});

router.get('/getAllAttrs/:username', function(request, response) {

  // User API returns requested user attributes to VC Layer 
  const vc_context = "https://resonate.is/VCcontext/v1";
  const vc_type = "SupporterCredential";
  const user = {}
  const artist_data = {
    "name": "Kallie Marie"
  };

  response.setHeader('Content-Type', 'application/json');
  response.end(
    JSON.stringify(
      [{
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://schema.org/",
          vc_context
        ],
        "type": [
          "VerifiableCredential",
          vc_type
        ],
        "name": user.name,
        "artist": artist_data
      }]
    )
  );
});

module.exports = router;