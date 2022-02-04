module.exports = server => {
  server.services = {
    cryptoCompare: require("./crypto-compare")(server),
    binance: require("./binance")(server),
    calcul: require("./calcul")(server)
  }
}
