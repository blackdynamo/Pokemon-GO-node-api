var protoBuf = require("protobufjs");

var builder = protoBuf.loadProtoFile("pokemon.proto");
if (builder === null) {
    builder = protoBuf.loadProtoFile("./node_modules/pokemon-go-node-api/pokemon.proto");
}

var pokemonProto = builder.build();

module.exports = {
    Request: pokemonProto.RequestEnvelop,
    Response: pokemonProto.ResponseEnvelop
};
