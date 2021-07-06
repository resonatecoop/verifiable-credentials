var express = require('express');
var axios = require('axios')
var router = express.Router();

function randomFixedInteger(length) {
  return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
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
    let errorMessage = playsData && playsData.message ? playsData.message : 'Failed to find any plays';
    return response.send(errorMessage);
  }

  playsData = playsResponse.data.data;

  return response.send(playsData);

  if (playsData && playsData.length > 0) {
    let user = await User.findOne({
      where: {
        email
      }
    });

    if (user && user.issued) {
      return response.send("already issued");
    }

    if (!user) {
      user = await User.create({
        email,
        username: email.split('@')[0],
        otp: randomFixedInteger(16),
        issued: false
      });
    }

    // present QR code
    const requestParams = {
      vcIssuer: "issuer.vc.resonate.is",
      authnCreds: {
        username: user.username,
        otp: user.otp
      }
    }

    url = `vcwallet://register?request=${base64Encode(requestParams)}`;

    response.end(QRCode(ur));
  } else {
    response.send("havent played");
  }
  
  response.redirect('/completed');
});

module.exports = router;
