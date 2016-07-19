var protoBuf = require("protobufjs");

var builder = protoBuf.loadProtoFile("./pokemon.proto");
var pokemonProto = builder.build();

module.exports = {
    Request: pokemonProto.RequestEnvelop,
    Response: pokemonProto.ResponseEnvelop
};
