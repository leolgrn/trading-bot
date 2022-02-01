module.exports = server => {

    server.use(server.middlewares.bodyParser)
    server.use(server.middlewares.logger)

    require("./histoData")(server)

}
