const request = require("./api-request");
const RequestEnvelop = require("./envelops").Request;
const winston = require("winston");

module.exports = (options, done) => {
    const req = [
        new RequestEnvelop.Requests(2),
        new RequestEnvelop.Requests(126),
        new RequestEnvelop.Requests(4),
        new RequestEnvelop.Requests(129),
        new RequestEnvelop.Requests(5)
    ];

    request(options, req, (err, res) => {
        if (err) return done(err);

        const endpoint = "https://" + res.api_url + "/rpc";

        winston.info("[i] Received API Endpoint: " + endpoint);
        done(null, endpoint);
    });
};
