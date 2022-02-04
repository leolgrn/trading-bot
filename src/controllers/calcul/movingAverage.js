module.exports = server => {
    return async (req, res) => {
        server.services.calcul.movingAverage(req.body)
            .then(data => res.json(data).status(200))
            .catch(err => res.json(err).status(400));
    }
}
