var config = require("../config");
var Google = require("gpsoauthnode");

module.exports = function (options, done) {
    var google = new Google();

    google.login(options.username, options.password, config.androidId, function (err, data) {
        if (err) return done(err);
        if (!data) return done(err);

        google.oauth(options.username, data.masterToken, data.androidId, config.oathService, config.app, config.clientSig, function (err, data) {
            if (err) return done(err);

            done(null, data.Auth);
        });
    });
};
