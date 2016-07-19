const config = require("../config");
const Google = require("gpsoauthnode");

module.exports = (options, done) => {
    const google = new Google();

    google.login(options.username, options.password, config.androidId, (err, data) => {
        if (err) return done(err);
        if (!data) return done(err);

        google.oauth(options.username, data.masterToken, data.androidId, config.oathService, config.app, config.clientSig, (err, data) => {
            if (err) return done(err);

            done(null, data.Auth);
        });
    });
};
