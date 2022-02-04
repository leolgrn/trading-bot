
module.exports = server => {
    return {
      histoData: require('./histoData')(server)
    }
}
