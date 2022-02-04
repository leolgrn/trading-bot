module.exports = server => {
    return async (req, res) => {
        const {startDate, endDate, symbol} = req.query;
        server.services.cryptoCompare.histoData(startDate, endDate, symbol, 'hour')
            .then(data => res.json(data).status(200))
            .catch(err => res.json(err).status(400));
    }
}
