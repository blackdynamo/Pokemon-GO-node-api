var request = require("request");

module.exports = request.defaults({jar: request.jar()});
