/**
 * Created by: leaf
 * Date: 21/10/16
 * Time: 12:34
 */


const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes');
const config = require('./config');
const utils = require('./cityUtils');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'client')));

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

io.on('connection', (socket) => {
	console.log('client connected');

	socket.on('disconnect', function() {
		console.log('client disconnected');
	});

	socket.on('user-connected', (user, callback) => {
		utils.addUserInGame(user);
		io.emit('new-user', user.user);
		callback();
	});

	socket.on('game-over', (data) => {
		io.emit('end-game', data);
	});

	socket.on('new-game', (game, callback) => {
		console.log('game ' + game.city._id + ' was created');
		utils.saveGame(game);
		io.emit('add-game', game);
		callback();
	});
});

http.listen(config.port, function() {
	console.log('Server started on port ' + config.port);
});