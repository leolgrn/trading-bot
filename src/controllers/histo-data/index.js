module.exports = server => {
    return {
        day: require("./day")(server),
        hour: require("./hour")(server),
        minute: require("./minute")(server)
    }
}
