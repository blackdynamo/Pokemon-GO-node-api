var config = require("./config");
var request = require("./request");
var RequestEnvelop = require("./envelops").Request;
var ResponseEnvelop = require("./envelops").Response;
var winston = require("winston");

module.exports = function (options, req, done) {
    var auth = new RequestEnvelop.AuthInfo({
        "provider": options.provider || "google",
        "token": new RequestEnvelop.AuthInfo.JWT(options.token, 59)
    });

    var requestEnvelop = new RequestEnvelop({
        "unknown1": 2,
        "rpc_id": 1469378659230941192,
        "requests": req,
        "latitude": self.playerInfo.latitude,
        "longitude": self.playerInfo.longitude,
        "altitude": self.playerInfo.altitude,
        "auth": auth,
        "unknown12": 989
    });

    var requestOptions = {
        url: config.apiUrl,
        body: requestEnvelop.encode().toBuffer(),
        encoding: null,
        headers: {
            "User-Agent": "Niantic App"
        }
    };

    request.post(requestOptions, function (err, response, body) {
        if (response === undefined || body === undefined) {
            winston.error("[!] RPC Server offline");
            return done(new Error("RPC Server offline"));
        }

        try {
            var responseEnvelope = ResponseEnvelop.decode(body);
        } catch (e) {
            if (e.decoded) { // Truncated
                winston.info(e);
                responseEnvelope = e.decoded; // Decoded message with missing required fields
            }
        }

        return done(null, responseEnvelope);
    });
};
