const express = require('express')
const app = express()
const port = 4000

app.get('/v1/getAllAttrs/:username', function(request, response) {
  
  // Returns user data after VC layer has authenticated
  console.log('Already Authenticated');
  
  response.setHeader('Content-Type', 'application/json');
  response.end(
    JSON.stringify(
      [{
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://schema.org/",
          "https://resonate.is/VCcontext/v1"
        ],
        "type": [
          "VerifiableCredential",
          "SupporterCredential"
        ],
        "name": "Angus",
        "surname": "McLeod",
        "supporter": {
          "name": "angus mcleod",
          "artist": "Feral Five",
          "from": "09/02/2021",
          "level": "gold"
        }
      }]
    )
  );
});

app.listen(port, () => {
  console.log(`Mock Resonate User API Running on http://localhost:${port}`);
})