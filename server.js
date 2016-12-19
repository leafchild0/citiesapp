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
const utils = require('./utils');

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

	/*socket.on('disconnect', function() {

	});*/

	//register a game
	socket.on('new-game', (data, callback) => {
		let game = utils.saveGame(data);
		console.log('game ' + game._id + ' was created');
		socket.broadcast.emit('add-game', game);
		socket.join(game._id);
		callback(game._id);
	});

	//room related calls
	socket.on('user-connected', (data, callback) => {
		utils.addGameUser(data);
		socket.join(data.game_id);
		socket.broadcast.to(data.game_id).emit('new-user', data.user);
		callback();
	});
	
	socket.on('user-disconnected', (data, callback) => {
		utils.removeGameUser(data);

		utils.findGame(data.game_id, function(err, game) {
			if(data.user === game.host) {
				this.deleteGame(data.game_id, function(err) {
					if(err) throw new Error(err);

					socket.broadcast.to(data.game_id).emit('user-left', data.user);
					socket.leave(data.game_id);
					callback();
				});

			}
		});

	});

	socket.on('game-over', (data, callback) => {
		utils.deleteGame(data.game_id, function(err) {
			if(err) throw new Error(err);
			socket.broadcast.to(data.game_id).emit('end-game', data);
			socket.leave(data.game_id);
			callback();
		});
	});

});

http.listen(config.port, function() {
	console.log('Server started on port ' + config.port);
});