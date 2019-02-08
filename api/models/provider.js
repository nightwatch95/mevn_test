const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Provider = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    }
},{
    collection: 'providers'
});

module.exports = mongoose.model('Provider', Provider);