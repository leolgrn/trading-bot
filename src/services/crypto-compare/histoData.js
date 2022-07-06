const moment = require("moment");

module.exports = server => {

    const formatData = (data) => {
        return {
            time: data.map(item => moment.unix(item.time).format("DD-MM-YYYY HH:MM")),
            indicators: [
                {
                    name: "open",
                    values: data.map(item => item.open),
                    color: "#FFCD56"
                },
                {
                    name: "high",
                    values: data.map(item => item.high),
                    color: "#FF6384"
                },
                {
                    name: "close",
                    values: data.map(item => item.close),
                    color: "#36A2EB"
                },
                {
                    name: "low",
                    values: data.map(item => item.low),
                    color: "#4BC0C0"
                }
            ]
        }
    }

    const getUrlAndUnit = (type) => {
        switch (type){
            case 'day':
                return ['histoday', 'days']
            case 'hour':
                return ['histohour', 'hours']
            case 'minute':
                return ['histominute', 'minutes']
        }
    }

    const getLimitsAndEndDates = (daysBetween, endDate, unit) => {
        const limitsAndEndDate = [];
        while (daysBetween > 2001){
            limitsAndEndDate.push({
                limit: 2000,
                endDateTS: endDate.unix()
            });
            daysBetween = daysBetween - 2001;
            endDate = endDate.subtract(2001, unit)
        }
        limitsAndEndDate.push({
            limit: daysBetween,
            endDateTS: endDate.unix()
        });
        return limitsAndEndDate.reverse();
    }

    return async (startDate, endDate, maxPeriod, symbol, type) => {

        const [ url, unit ] = getUrlAndUnit(type);

        const [ startDateFormatted, endDateFormatted ] = server.utils.format(startDate, endDate);
        const startDateFormattedMinusMaxPeriod = startDateFormatted.clone().subtract(maxPeriod, unit);
        const daysBetween = endDateFormatted.diff(startDateFormattedMinusMaxPeriod, unit);
        const limitsAndEndDate = getLimitsAndEndDates(daysBetween, endDateFormatted, unit);

        const promises = limitsAndEndDate.map(item => {
            return new Promise((resolve, reject) => {
                fetch(`https://min-api.cryptocompare.com/data/v2/${url}?fsym=${symbol}&tsym=USDT&limit=${item.limit}&toTs=${item.endDateTS}`, {
                    headers: {
                        "Authorization": `Apikey ${process.env.API_KEY}`
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        if(res["Response"] === "Success"){
                            return resolve(res["Data"]["Data"]);
                        } else {
                            reject(res["Message"])
                        }
                    })
                    .catch(reject)
            })
        })

        return Promise.all(promises)
            .then(data => data.flat())
            .then(formatData)

    }

}
