module.exports = server => {
    return async (data) => {
        const time = data.time;
        const close = data.indicators[3].values;
        const movingAverage1 = data.indicators[4].values;
        const movingAverage2 = data.indicators[5].values;
        const movingAverage3 = data.indicators[6].values;

        let cash = 100;
        let holding = false;
        let canBuy = false;
        let quantityHolding = 0;
        let transactions = [];

        let buy = null;
        let sell = null;

        for(let i = 0; i < movingAverage1.length; i++){
            if(movingAverage1[i] !== null && movingAverage2[i] !== null && movingAverage3[i] !== null){
                const canBuy2 = movingAverage1[i] < movingAverage2[i] || movingAverage1[i] < movingAverage3[i] || movingAverage2[i] < movingAverage3[i];
                canBuy = canBuy2;
                break;
            }
        }

        let falseHolding = false;

        for(let i = 0; i < movingAverage1.length; i++){
            if(movingAverage1[i] !== null && movingAverage2[i] !== null && movingAverage3[i] !== null){

                const bullish1 = movingAverage1[i] > movingAverage2[i];
                const bullish2 = bullish1 && movingAverage1[i] > movingAverage3[i] && movingAverage2[i] > movingAverage3[i];
                const bearish1 = movingAverage1[i] < movingAverage2[i];
                const bearish2 = bearish1 || movingAverage1[i] < movingAverage3[i] || movingAverage2[i] < movingAverage3[i];

                //const diffIsEnough = ((movingAverage1[i] - movingAverage3[i]) * 100 / movingAverage1[i]) > 2;
                
                if(canBuy){
                    if(bullish2 && !holding && !falseHolding){
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
                        if(i === movingAverage1.length - 1){
                            buy = true;
                        }
                    }
                    if(bullish1){
                        falseHolding = true;
                    }
                    if(bearish2 && holding && !falseHolding){
                        cash = quantityHolding * close[i];
                        cash = cash - server.services.binance.fee(cash);
                        quantityHolding = 0;
                        holding = false;
                        transactions.push({
                            sell: {
                                date: time[i],
                                cash: cash
                            }
                        })
                        if(i === movingAverage1.length - 1){
                            sell = true;
                        }
                    }
                    if(bearish1){
                        falseHolding = false;
                    }
                } else {
                    if(bearish1){
                        canBuy = true;
                    }
                }
            }
        }


        data.report = {
            holding: holding,
            transactions: transactions
        }

        data.signals = {
            buy: buy,
            sell: sell
        }

        if(holding){
            data.report["theoreticalCash"] = quantityHolding * close[close.length - 1];
        } else {
            data.report["cash"] = cash;
        }

        return data;
    }
}