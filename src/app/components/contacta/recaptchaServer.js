var express = require('express');
var rp = require('request-promise');
var cors = require('cors')
app.use(cors());

//const secret = '6LffWDUUAAAAAJzKX3L0degSCfWIq92DvTpK8G26';
const secret='6LeOajUUAAAAAK-2aI0iEpFzlF_puicpDUc8lsIm'
app.get('/validate_captcha', (req, res) => {
  
  const options = {
    method: 'POST',
    uri: 'https://www.google.com/recaptcha/api/siteverify',
    qs: {
      secret,
      response: req.query.token  
    },
    json: true
  };
  
  rp(options)
    .then(response => res.json(response))
    .catch(() => {});
  
});

module.exports = app;