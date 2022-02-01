module.exports = server => {
    return async (req, res) => {
        const {startDate, endDate, symbol} = req.query;
        const result = await server.services.cryptoCompare.getHistoday(startDate, endDate, symbol)
        res.json(result).status(200);
    }
}
