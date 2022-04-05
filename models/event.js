const mongoose = require('mongoose');

let event_schema = new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    date_debut: {
        type: Date
    },
    date_fin: {
        type: Date
    },
    publisher: {
        first_name: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    location: String,
    notes: [Number],
    logo: String,
});

let Event = mongoose.model('Event', event_schema);

module.exports.Event = Event;