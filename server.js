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
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', routes);

io.on('connection', (socket) => {
	console.log('client connected');

	/*socket.on('disconnect', function() {

	 });*/

	//register a game
	socket.on('game-new', (data, callback) => {
		//Create game in memory
		//Send message that game has been created
		//Join room
		//Evaluate the callback to create them game by game id
		let game = utils.saveGame(data);
		console.log('game ' + game._id + ' was created');
		io.emit('game-new', game);
		socket.join(game._id);
		callback(game._id);
	});

	//room related calls
	socket.on('user-new', (data, callback) => {
		//Add user in game on server side
		//Join room using game id
		//Send message with new user name
		//Run callback to join the game
		utils.addGameUser(data);
		socket.join(data.game_id);
		socket.in(data.game_id).emit('user-new', data.user);
		callback();
	});

	socket.on('user-left', (data, callback) => {
		//Remove user from game
		//If user is host, remove game?
		//Send end-game message
		//Leave room, run callback to leave on client side
		utils.findGame(data.game_id, function(err, game) {

			if (data.user === game.host) utils.deleteGame(data.game_id);
			else utils.removeGameUser(data);
			socket.broadcast.to(data.game_id).emit('user-left', data.user);
			socket.leave(data.game_id);
			callback();

		});

	});

	socket.on('game-over', (data, callback) => {
		//Check result of the game
		//If it's true - delete the game,
		// send message that game is over and leave the room

		//Otherwise do the same, but not remove the game
		//Run a callback for end game for current user

		if (data.result) {
			utils.deleteGame(data.game_id);
            socket.broadcast.to(data.game_id).emit('game-over', data);
		}
		socket.leave(data.game_id);
		callback();
	});
    
});

http.listen(config.port, function() {
	console.log('Server started on port ' + config.port);
});