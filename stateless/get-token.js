var logins = require("./logins");
var winston = require("winston");

var messages = {
    ptc: "[i] Received PTC access token!",
    google: "[i] Received Google access token!"
};

module.exports = function (options, done) {
    winston.info('[i] Logging with user: ' + options.username);

    var login = logins[options.provider] || logins.google;

    login(options, function (err, token) {
        if (err) return done(err);

        winston.info(messages[options.provider] || message.google);
        return done(null, token);
    });
};
