module.exports = server => {

    return async (req, res) => {
        try {
            const data = await server.services.calcul.movingAverage(req.body)

            const time = data.time;
            const close = data.indicators[3].values;
            const movingAverage1 = data.indicators[4].values;
            const movingAverage2 = data.indicators[5].values;

            let cash = 100;
            let holding = false;
            let canStartBuying = false;
            let quantityHolding = 0;
            let transactions = [];

            for(let i = 0; i < movingAverage1.length; i++){
                if(movingAverage1[i] !== null && movingAverage2[i] !== null){
                    canStartBuying = !(movingAverage1[i] > movingAverage2[i]);
                    break;
                }
            }

            for(let i = 0; i < movingAverage1.length; i++){
                if(movingAverage1[i] !== null && movingAverage2[i] !== null){
                    const bullish = movingAverage1[i] > movingAverage2[i];
                    if(canStartBuying){
                        if(bullish && !holding){
                            transactions.push({
                                buy: {
                                    date: time[i],
                                    cash: cash
                                }
                            });
                            quantityHolding = cash / close[i];
                            quantityHolding = quantityHolding - server.services.binance.fee(quantityHolding);
                            cash = 0;
                            holding = true;
                        }
                        if(!bullish && holding){
                            cash = quantityHolding * close[i];
                            cash = cash - server.services.binance.fee(cash);
                            quantityHolding = 0;
                            holding = false;
                            transactions[transactions.length - 1]["sell"] = {
                                date: time[i],
                                cash: cash
                            };
                        }
                    } else {
                        if(!bullish){
                            canStartBuying = true;
                        }
                    }
                }
            }


            data.report = {
                holding: holding,
                transactions: transactions
            }

            if(holding){
                data.report["theoreticalCash"] = quantityHolding * close[close.length - 1];
            } else {
                data.report["cash"] = cash;
            }

            res.status(200).json(data);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}
