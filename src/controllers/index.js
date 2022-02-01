module.exports = server => {
    server.controllers = {
        histoData: require("./histo-data")(server)
    }
}
