module.exports = server => {
    server.middlewares = {
        logger: require("./logger")(server),
        bodyParser: require("./bodyParser")(server),
        header: require("./header")(server)
    }
}
