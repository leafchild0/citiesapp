/**
 * Created by: leaf
 * Date: 09/11/16
 * Time: 13:30
 */

const config = require('./config');
const mongojs = require('mongojs');

const db = mongojs(config.database.url, [ config.database.cities, config.database.games ]);
let utils = {};
let games = [];

utils.saveCity = function(newCity, req, res) {
	"use strict";
	db.cities.save(newCity, function(err, result) {
		if(err) res.send(err);
		else res.json(result);
	});
};

utils.findCityByName = function(name, callback) {
	"use strict";
	db.cities.findOne({ 'name': name }, function(err, result) {
		callback(err, result);
	});
};

utils.saveGame = function(newGame) {
	"use strict";
	games.push(newGame);
};

utils.addOrUpdateCity = function(newCity, req, res) {
	"use strict";

	this.findCityByName(newCity.name, function(err, city) {
		if(err) res.send(err);

		if(city === undefined) {
			this.saveCity(newCity, req, res);
		}
		else db.cities.findAndModify(
			{
				query:  { _id: city._id },
				upsert: true,
				update: {
					'$addToSet': { photos: newCity.photos[ 0 ] }
				},
			}, function(err, result) {
				if(err) res.send(err);
				else res.json(result);
			});
	});

};

utils.getGames = function() {
	"use strict";
	return games;
};

utils.addUserInGame = function(user) {
	games.forEach((game) => {
		"use strict";
		if(game.city._id === user.game_id) {
			game.players.push(user.user);
		}
	})
};

module.exports = utils;
