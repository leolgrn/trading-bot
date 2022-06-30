module.exports = server => {
    return {
        job: require("./job")(server)
    }
}
