var express = require('express');
var router = express.Router();
var db = require('../database');
var User = db.User;

router.post('/authenticate', async function(request, response) {
  const otp = request.body.otp;
  const username = request.body.username;

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
    response.status(200);
    response.contentType('json');
    response.send({
      username: user.username,
      userHandler: user.uuid
    })
  } else {
    response.status('401');
    response.send('Authentication Failure');
  }
});

router.get('/getAllAttrs/:uuid', async function(request, response) {
  const uuid = request.params.uuid;

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
    response.send(JSON.stringify(credentials));
  } else {
    response.status('403');
    response.send('No user found');
  }
});

module.exports = router;