const config = require("./config");
const request = require("./request");
const RequestEnvelop = require("./envelops").Request;
const ResponseEnvelop = require("./envelops").Response;
const winston = require("winston");

module.exports = (options, req, done) => {
    const auth = new RequestEnvelop.AuthInfo({
        "provider": options.provider || "google",
        "token": new RequestEnvelop.AuthInfo.JWT(options.token, 59)
    });

    const requestEnvelop = new RequestEnvelop({
        "unknown1": 2,
        "rpc_id": 1469378659230941192,
        "requests": req,
        "latitude": options.geo.latitude,
        "longitude": options.geo.longitude,
        "altitude": options.geo.altitude,
        "auth": auth,
        "unknown12": 989
    });

    const requestOptions = {
        url: config.apiUrl,
        body: requestEnvelop.encode().toBuffer(),
        encoding: null,
        headers: {
            "User-Agent": "Niantic App"
        }
    };

    request.post(requestOptions, (err, response, body) => {
        let responseEnvelop;

        if (response === undefined || body === undefined) {
            winston.error("[!] RPC Server offline");
            return done(new Error("RPC Server offline"));
        }

        try {
            responseEnvelop = ResponseEnvelop.decode(body);
        } catch (e) {
            if (e.decoded) { // Truncated
                winston.info(e);
                responseEnvelop = e.decoded; // Decoded message with missing required fields
            }
        }

        return done(null, responseEnvelop);
    });
};
