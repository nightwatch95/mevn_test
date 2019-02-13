const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Provider = require('../models/provider');

let Client = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    providers: {
        type: [{type: Schema.Types.ObjectId, ref: 'Provider'}]
    }
}, {
    collection: 'clients'
});

module.exports = mongoose.model('Client', Client);