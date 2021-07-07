var express = require('express');
var axios = require('axios')
var router = express.Router();
var db = require('../database');
var User = db.User;
var QRCode = require('qrcode');

function randomFixedInteger(length) {
  return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

function errorResponse(response, message) {
  response.contentType('json');
  response.status(403);
  return response.send({ message });
}

router.get('/', function(request, response, next) {
  response.render('index');
});

router.post('/issue', async function(request, response) {
  const email = request.body.email;

  // Kallie Marie - Should Your Sun Set Before Mine
  const kmtids = [21516,21517,21518];

  // All participating tracks
  const track_ids = kmtids;

  const postConfig = {
    method: 'post',
    url: 'https://api.resonate.coop/v2/user/admin/plays',
    headers: { 
      'Authorization': `Bearer ${process.env.RESONATE_API_TOKEN}`, 
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      email,
      "ids": track_ids,
      "minCount": 9
    })
  };
  
  let playsData;
  let playsResponse;

  try {
    playsResponse = await axios(postConfig);
  } catch (error) {
    playsData = error.response.data;
  }

  if (!playsResponse || !playsResponse.data) {
    let message = playsData && playsData.message ? playsData.message : "You don't yet qualify";
    return errorResponse(response, message);
  }

  playsData = playsResponse.data.data;

  if (playsData && playsData.length > 0) {
    let user = await User.findOne({
      where: {
        email
      }
    });

    if (user && user.issued) {
      return errorResponse(response, "You've already been issued with credentials");
    }

    if (!user) {
      user = await User.create({
        email,
        username: email.split('@')[0],
        otp: randomFixedInteger(16),
        issued: false
      });
    }

    const requestParams = {
      vcIssuer: "https://issuer.vc.resonate.is",
      authnCreds: {
        username: user.username,
        otp: user.otp
      }
    }
    const encodedResquest = (Buffer.from(JSON.stringify(requestParams))).toString('base64');
    const deepLink = `vcwallet://register?request=${encodedResquest}`;

    response.contentType('json');
    response.status(200);
    return response.send({ deepLink });
  } else {
    return errorResponse(response, "You don't yet qualify");
  }
});

module.exports = router;
