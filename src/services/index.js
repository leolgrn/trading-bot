module.exports = server => {
  server.services = {
    cryptoCompare: require("./crypto-compare")(server)
  }
}