const talib = require("talib");

module.exports = server => {

    const colors = [
        "#FF6384",
        "#9966FF"
    ]

    const applyMovingAverage = (data, type, period, color) => {
        return new Promise((resolve, reject) => {
            talib.execute({
                name: type.toUpperCase(),
                startIdx: 0,
                endIdx: data.time.length - 1,
                inReal: data.indicators[2].values,
                optInTimePeriod: period
            }, function (err, res) {
                if (err) reject(err);
                else {
                    const { begIndex, nbElement, result } = res;
                    const { outReal } = result;
                    const values = Array.from({length: begIndex}, (x, i) => null);
                    for(let i = begIndex; i < begIndex + nbElement; i++){
                        values.push(outReal[i - begIndex]);
                    }
                    resolve({
                        name: `${type.toUpperCase()} (${period})`,
                        values: values,
                        color: color
                    });
                }
            });
        });
    }

    return async (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                const {startDate, endDate, symbol, type, unit, periods} = params;

                const maxPeriod = Math.max(...periods);

                const data = await server.services.cryptoCompare.histoData(startDate, endDate, maxPeriod, symbol, unit)

                const promises = [];
                for(let i = 0; i < periods.length; i++){
                    promises.push(applyMovingAverage(data, type, periods[i], colors[i], maxPeriod));
                }

                Promise.all(promises)
                    .then(results => {
                        for(let result of results) data.indicators.push(result);
                        data.indicators.forEach(indicator => {
                            indicator.values = indicator.values.slice(maxPeriod);
                        })
                        data.time = data.time.slice(maxPeriod);
                        return data;
                    })
                    .then(resolve)
            } catch (err) {
                reject(err)
            }

        })
    }
}
