var http = require('http'),
    querystring = require('querystring');

// Initialization class
var Mailjet = function(apiKey, secretKey) {
  this._apiKey = apiKey;
  this._secretKey = secretKey;
  this._authentificate = new Buffer(apiKey + ':' + secretKey).toString('base64');
};

Mailjet.prototype = {};

// Email sending code
Mailjet.prototype.sendContent = function(to, subject, content) {
  // Build the HTTP POST body text
  var body = querystring.stringify({
        from: 'tech@apientreprise.fr',
        to: to,
        subject: subject,
        html: content
    });

  var options = {
    hostname: 'api.mailjet.com',
    port: 80,
    path: '/v3/send/',
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + this._authentificate,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body)
    }
  };

  // API request
  var req = http.request(options, function(res) {
    // console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      // console.log('BODY: ' + chunk);
    });
  });

  // Checking errors
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // Send the body
  req.end(body);
};

module.exports = Mailjet;