module.exports = server => {

    return async (req, res) => {
        try {
            const result = await server.services.talib.movingAverage(req.body)
            const data = await server.services.backtest.movingAverage(result);
            res.status(200).json(data);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}
