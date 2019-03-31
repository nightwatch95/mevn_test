const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Provider = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
},{
    collection: 'providers'
});

module.exports = mongoose.model('Provider', Provider);