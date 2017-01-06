var express = require('express');
var app = express();
var wrap = require('co-express');
var compression = require('compression');

var search = require('./api/core-ask.js');
var fs = require('fs');

var ip = require("ip");

var address = 'var ip_addr ='+ip.address()+';';

  fs.writeFile("./src/js/ip.js", address, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log(ip.address());
	}); 





app.use(compression({
    threshold: 0,
    level: 9,
    memLevel: 9
}));

app.use(function(req, res, next) {
    req.connection.setNoDelay(true);
    next();
});

app.use(express.static('./src'));


app.get('/api/ask', wrap(function*(req, res) {
      var input = req.query['q'];

      var result = yield search.query(input)

      res.send(result);
}));


console.log('Listening on port 4567');
app.listen(4567);
