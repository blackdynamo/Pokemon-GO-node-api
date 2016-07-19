var request = require("./api-request");
var RequestEnvelop = require("./envelops").Request;
var ResponseEnvelop = require("./envelops").Response;
var winston = require("winston");

module.exports = function (options, done) {
    var req = new RequestEnvelop.Requests(2);
    request(options, req, function (err, res) {
        if (err) return done(err);

        winston.info('[i] Logged in!');
        done(null, ResponseEnvelop.ProfilePayload.decode(res.payload[0]).profile);
    });
};
