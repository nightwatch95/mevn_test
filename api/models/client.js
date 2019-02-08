const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: String
    }
}, {
    collection: 'clients'
});

module.exports = mongoose.model('Client', Client);