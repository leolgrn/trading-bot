module.exports = server => {
    return {
        day: require("./day")(server)
    }
}
