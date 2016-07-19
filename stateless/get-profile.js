const request = require("./api-request");
const RequestEnvelop = require("./envelops").Request;
const ResponseEnvelop = require("./envelops").Response;
const winston = require("winston");

module.exports = (options, done) => {
    const req = new RequestEnvelop.Requests(2);
    
    request(options, req, (err, res) => {
        if (err) return done(err);

        winston.info('[i] Logged in!');
        done(null, ResponseEnvelop.ProfilePayload.decode(res.payload[0]).profile);
    });
};
