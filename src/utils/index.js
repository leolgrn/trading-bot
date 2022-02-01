module.exports = server => {
    server.utils = {
        format: require("./format")(server)
    }
}
