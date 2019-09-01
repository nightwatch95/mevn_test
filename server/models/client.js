const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Client = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        min: 1,
        max: 80
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /\S+@\S+\.\S+/
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        min: 8,
        max: 80
    },
    providers: {
        type: [{type: Schema.Types.ObjectId, ref: 'Provider'}]
    }
}, {
    collection: 'clients'
});

module.exports = mongoose.model('Client', Client);