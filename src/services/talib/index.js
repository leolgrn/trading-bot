module.exports = server => {
    return {
        movingAverage: require("./movingAverage")(server)
    }
}
