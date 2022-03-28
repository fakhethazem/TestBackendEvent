const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://hazem:fakhet@cluster0.b1yg2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => console.log('Mongo is UP.'))
    .catch(err => console.log('Mongo is Down , raison : ', err.message));