/**
 * Created by: leaf
 * Date: 09/11/16
 * Time: 13:30
 */

const config = require('./config');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const CityModel = require('./models/city');
const GameModel = require('./models/game');

mongoose.connect(config.database.url,
  [config.database.cities, config.database.games]);
let utils = {};
let games = [];

utils.getCities = function(callback) {
	CityModel.find(function(err, cities) {
		callback(err, cities)
	});
};

utils.saveCity = function(newCity, callback) {
	let city = new CityModel(newCity);
	city.save(function(err, city) {
		callback(err, city)
	});
};

utils.findCity = function(id, callback) {
	"use strict";
	CityModel.findOne({_id: mongoose.Types.ObjectId(id)}, function(err, result) {
		callback(err, result);
	});
};

utils.findCityByName = function(name, callback) {
	"use strict";
	CityModel.findOne({'name': name}, function(err, result) {
		callback(err, result);
	});
};

//Upload service
utils.upload = multer({
	storage: multer.diskStorage({
		destination: function(req, file, cb) {
			let dest = path.join(__dirname, 'client/images/cities/', (req.body.city || ''));
			if (!fs.existsSync(dest)) {
				fs.mkdirSync(dest);
			}
			cb(null, dest);
		},
		filename: (req, file, cb) => {
			let ext = path.extname(file.originalname);
			cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
		}
	})
});

utils.findGame = function(id, callback) {
	"use strict";
	return callback(null, games.find(game => {
		return game._id === id;
	}));
};

utils.deleteGame = function(id) {
	"use strict";
	let found = games.find(game => {
		return game._id === id;
	});

	if (found) {
		games.splice(games.indexOf(found), 1);
	}
	else {
		throw new Error('Game with id ' + id + ' was not found');
	}
};

utils.saveGame = function(data) {
	"use strict";
	let game = new GameModel(data);
	games.push(game);
	return game;
};

utils.addOrUpdateCity = function(newCity, callback) {
	"use strict";

	utils.findCityByName(newCity.name, function(err, city) {
		if (err) {
			callback(err, null);
		}

		//New city case
		if (city === null || city === undefined) {
			utils.saveCity(newCity, callback);
		}
		else {
			CityModel.findAndModify(
			  {
				  query: {_id: city._id},
				  upsert: true,
				  update: {
					  '$addToSet': {photos: newCity.photos[0]}
				  },
			  }, callback(err, result));
		}
	});

};

utils.getGames = function() {
	return games;
};

utils.addGameUser = function(data) {
	"use strict";
	let found = games.find(game => {
		return game._id === data.game_id;
	});
	if (found) {
		found.users.push(data.user);
	}
};

utils.removeGameUser = function(data) {
	"use strict";
	let found = games.find(game => {
		return game._id === data.game_id;
	});
	if (found) {
		found.users.splice(found.users.indexOf(data.user), 1);
	}
};

module.exports = utils;
