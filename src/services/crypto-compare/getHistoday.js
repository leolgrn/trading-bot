

module.exports = server => {

    const getLimitsAndEndDate = (daysBetween, endDate) => {
        const limitsAndEndDate = [];
        while (daysBetween > 2000){
            limitsAndEndDate.push({
                limit: 2000,
                endDateTS: endDate.unix()
            });
            daysBetween = daysBetween - 2000;
            endDate = endDate.subtract(2000, 'days')
        }
        limitsAndEndDate.push({
            limit: daysBetween,
            endDateTS: endDate.unix()
        });
        return limitsAndEndDate;
    }

    return async (startDate, endDate, symbol) => {

        const [ startDateFormatted, endDateFormatted ] = server.utils.format(startDate, endDate);
        const daysBetween = endDateFormatted.diff(startDateFormatted, 'days');
        const limitsAndEndDate = getLimitsAndEndDate(daysBetween, endDateFormatted);

        const promises = limitsAndEndDate.map(item => {
            return new Promise((resolve, reject) => {
                fetch(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=EUR&limit=${item.limit}&toTs=${item.endDateTS}`, {
                    headers: {
                        "Authorization": `Apikey ${process.env.API_KEY}`
                    }
                })
                .then(res => res.json())
                .then(res => res["Data"]["Data"])
                .then(resolve)
                .catch(reject)
            })
        })

        return Promise.all(promises)
            .then(data => data.flat())
            .catch(console.error)

    }

}
