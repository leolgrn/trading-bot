const Schema = require('mongoose').Schema;

const HistorySchema = new Schema({
    
}, { collection: 'history', timestamps: { createdAt: 'created_at' } });

module.exports = connection => connection.models('history', HistorySchema);
