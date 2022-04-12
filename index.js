require('./db/connect');
const express = require('express');
const app = express();
const event_router = require('./routers/events');
const user_router = require('./routers/users');
const port = process.env.PORT || 3000;
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', (socket) => {
    socket.on('joinNotifications', (params, cb) => {
        socket.join(params.sender)
        cb()
    })

    socket.on('sendNotifications', (request) => {
        io.to(request.reciever).emit('recieveNotifications', request)
    })
})

var cors = require('cors')
app.use(express.json());
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use('/api/event', event_router);
app.use('/api/user', user_router);
app.use(express.static('public'));
require('./middleware/extend-node-input-validator')
require('./routers/app')(app);

http.listen(3100, () => {
    console.log('started on port 3100');
});


app.listen(port, () => console.log(`Server running on ${port}`));