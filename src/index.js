

const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');


const Voice = require('./structures/Voice');

const voice = new Voice();

app.use('/static', express.static(
    path.join(require.main.path, 'static')
));

app.get('/', (req, res) => {
    return res.status(200).sendFile(
        path.join(require.main.path, 'views/index.html')
    );
});

io.on('connection', socket => {
    socket.emit('voices', require('./voices'));
    socket.on('onsubmit', async ({ optionVal, textVal }) => {
        const response = await voice.createVoice(
            optionVal,
            textVal
        );
        socket.emit('response', response.data);
    });
});

const port = 7000;

http.listen(port, () => {
    console.log('Listening on port:', port);
});
