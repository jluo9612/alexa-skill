let express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    alexaVerifier = require('alexa-verifier');

function requestVerifier (req, res, next) {
    alexaVerifier(
	req.headers.signaturecertchainurl,
        req.headers.signature,
        req.rawBody,
        function verificationCallback(err) {
            if (err) {
                res.status(401).json({ message: 'Verification Failure', error: err });
            } else {
                next();
            }
        }
    );
}

app.use(bodyParser.json({
    verify: function getRawBody(req, res, buf) {
        req.rawBody = buf.toString();
    }
}));

app.post('/distancecost',requestVerifier, function(req, res) {
    // We'll fill this out later!
  if (req.body.request.type === 'LaunchRequest') {
    res.json({
      "version": "1.0",
      "response": {
        "shouldEndSession": true,
        "outputSpeech": {
          "type": "SSML",
          "ssml": "<speak>Start by saying a starting point, <break time=\"1s\"/>for example, <break time=\"1s\"/> Seattle, Washington. </speak>"
        }
      }
    });
  }
  // ...   
 res.json({ hello: 'world' });
});




app.listen(3000); 
