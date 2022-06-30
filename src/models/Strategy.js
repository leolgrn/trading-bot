const Schema = require('mongoose').Schema;

const StrategySchema = new Schema({
    symbol: String,
    type: String,
    unit: String,
    periods: Array,
    holding: Boolean
}, { collection: 'strategies', timestamps: { createdAt: 'created_at' } });

module.exports = connection => connection.model('strategy', StrategySchema);
