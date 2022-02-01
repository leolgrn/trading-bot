
module.exports = server => {
    return {
      getHistoday: require('./getHistoday')(server)
    }
}
