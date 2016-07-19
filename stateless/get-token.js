const logins = require("./logins");
const winston = require("winston");

const messages = {
    ptc: "[i] Received PTC access token!",
    google: "[i] Received Google access token!"
};

module.exports = (options, done) => {
    winston.info('[i] Logging with user: ' + options.username);

    const login = logins[options.provider] || logins.google;

    login(options, (err, token) => {
        if (err) return done(err);

        winston.info(messages[options.provider] || message.google);
        return done(null, token);
    });
};
