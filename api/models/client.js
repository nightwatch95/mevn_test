const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Client = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    providers: {
        type: [{type: Schema.Types.ObjectId, ref: 'Provider'}]
    }
}, {
    collection: 'clients'
});

module.exports = mongoose.model('Client', Client);