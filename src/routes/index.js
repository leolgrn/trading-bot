module.exports = server => {

    server.use(server.middlewares.bodyParser);
    server.use(server.middlewares.logger);
    server.use(server.middlewares.header);

    require("./histoData")(server);
    require("./calcul")(server);
    require("./backtest")(server);

}
