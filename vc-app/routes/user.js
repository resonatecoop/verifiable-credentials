var express = require('express');
var router = express.Router();
var db = require('../database');
var User = db.User;

router.post('/authenticate', async function(request, response) {
  console.log(`/authenticate request body: ${JSON.stringify(request.body)}`);

  const authnCreds = request.body.authnCreds;
  const otp = authnCreds.otp;
  const username = authnCreds.username;

  if (!otp || !username) {
    response.status('401');
    return response.send('Authentication Failure');
  }

  const user = await User.findOne({
    where: {
      otp,
      username
    }
  });

  if (user) {
    const userDetails = {
      username: user.username,
      userHandler: user.uuid
    }
    console.log("Sending response to authenticate: ", JSON.stringify(userDetails));
    response.status(200);
    response.contentType('json');
    response.send(userDetails)
  } else {
    response.status('401');
    response.send('Authentication Failure');
  }
});

router.get('/getAllAttrs/:uuid', async function(request, response) {
  const uuid = request.params.uuid;

  console.log(`/getAllAttrs request: uuid: ${uuid}`);

  if (!uuid) {
    response.status('403');
    return response.send('No user found');
  }

  let user = await User.findOne({
    where: {
      uuid
    }
  });

  if (user) {
    const context = "https://resonate.is/VCcontext/v1";
    const type = "SupporterCredential";
    const artist = {
      "name": "Kallie Marie"
    };
    const credentials = [
      {
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://schema.org/",
          context
        ],
        "type": [
          "VerifiableCredential",
          type
        ],
        "id": user.uuid,
        "name": user.username,
        "artist": artist
      }
    ];

    response.status(200);
    response.contentType('json');
    response.send(credentials);
  } else {
    response.status('403');
    response.send('No user found');
  }
});

module.exports = router;