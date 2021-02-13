const express = require('express')
const app = express()
const port = 4000

app.get('/v1/getAllAttrs/:username', function(request, response) {
  
  // VC Layer first authenticates with User API
  console.log('Authenticated');
  
  // User API returns requested user attributes to VC Layer 
  const vc_context = "https://resonate.is/VCcontext/v1";
  const vc_type = "SupporterCredential";
  const user = {
    name: "Angus",
    surname: "McLeod"
  }
  const supporter_data = {
    "artist": "Feral Five",
    "from": (new Date()).toISOString()
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
        "surname": user.surname,
        "supporter": supporter_data
      }]
    )
  );
});

app.listen(port, () => {
  console.log(`Resonate User API Reference Running on http://localhost:${port}`);
})