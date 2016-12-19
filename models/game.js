/**
 * Created by: leaf
 * Date: 27/11/16
 * Time: 09:32
 */

const uuid = require('uuid');

module.exports = function Game(game){
	this.city = game.city;
	this.host = game.host;
	this.users = [game.host];
	this.created = Date.now();
	this._id = uuid();
};


