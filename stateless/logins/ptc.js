const config = require("../config");
const request = require("../request");
const winston = require("winston");

const headers = {
    "User-Agent": "niantic"
};

module.exports = function (options, done) {
    let requestOptions = {
        url: config.loginUrl,
        headers: headers
    };

    request.get(requestOptions, (err, response, body) => {
        if (err) return done(err);

        const data = JSON.parse(body);

        requestOptions = {
            url: config.loginUrl,
            form: {
                "lt": data.lt,
                "execution": data.execution,
                "_eventId": "submit",
                "username": options.username,
                "password": options.password
            },
            headers: headers
        };

        request.post(requestOptions, (err, response, body) => {
            if (err) return done(err);

            if (body) {
                const parsedBody = JSON.parse(body);
                if (parsedBody.errors && parsedBody.errors.length !== 0) return done(new Error("Error logging in: " + parsedBody.errors[0]));
            }

            const ticket = response.headers["location"].split("ticket=")[1];

            requestOptions = {
                url: config.loginOauth,
                form: {
                    "client_id": config.clientId,
                    "redirect_uri": config.redirectUrl,
                    "client_secret": config.clientSecret,
                    "grant_type": "refresh_token",
                    "code": ticket
                },
                headers: headers
            };

            request.post(requestOptions, (err, response, body) => {
                let token;

                if (err) return done(err);

                token = body.split("token=")[1];
                token = token.split("&")[0];

                if (!token) return done(new Error("Login failed"));

                winston.info("[i] Session token: " + token);
                done(null, token);
            });
        });
    });
};
