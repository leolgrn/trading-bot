const Binance = require('node-binance-api');

module.exports = server => {

    const FEE_RATE = 0.075;

    const binance = new Binance().options({
        APIKEY: process.env.BINANCE_CLIENT_ID,
        APISECRET: process.env.BINANCE_CLIENT_SECRET
    });

    return {
        buy: (symbol, quantity) => {
            return binance.marketBuy(symbol + "USDT", quantity)
        },
        sell: (symbol, quantity) => {
            return binance.marketSell(symbol + "USDT", quantity)
        },
        fee: (quantity) => { return quantity * FEE_RATE}
    }
}
