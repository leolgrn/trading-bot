const moment = require("moment");

module.exports = server => {
    return async () => {
        const strategies = await server.models.strategy.find()
            .catch(err => console.error(err))

        for(strategy of strategies){
            const body = {
                startDate: moment().subtract(Math.max(...strategy.periods), strategy.unit).format("DD-MM-YYYY"),
                endDate: moment().format("DD-MM-YYYY"),
                symbol: strategy.symbol,
                type: strategy.type,
                unit: strategy.unit,
                periods: strategy.periods
            };
            const result = await server.services.talib.movingAverage(body);
            const data = await server.services.backtest.movingAverage(result);
            console.log(data.signals);
            if(data.signals.buy){
                server.services.binance.buy()
            }
            if(data.signals.sell){
                server.services.binance.sell()
            }
        }
    }
}
