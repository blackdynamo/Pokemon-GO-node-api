var request = require("./api-request");
var RequestEnvelop = require("./envelops").Request;
var winston = require("winston");

module.exports = function (options, done) {
    var req = [
        new RequestEnvelop.Requests(2),
        new RequestEnvelop.Requests(126),
        new RequestEnvelop.Requests(4),
        new RequestEnvelop.Requests(129),
        new RequestEnvelop.Requests(5)
    ];

    request(options, req, function (err, res) {
        if (err) return done(err);

        var endpoint = "https://" + res.api_url + "/rpc";

        winston.info("[i] Received API Endpoint: " + endpoint);
        done(null, endpoint);
    });
};
