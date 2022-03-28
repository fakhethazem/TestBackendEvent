const mongoose = require('mongoose');

let user_schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
});

let User = mongoose.model('User', user_schema);

module.exports.User = User;