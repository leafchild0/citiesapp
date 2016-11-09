/**
 * Created by: leaf
 * Date: 09/11/16
 * Time: 13:30
 */

let utils = {};

utils.saveCity = function(newCity, req, res, db) {
	"use strict";
	db.cities.save(newCity, function(err, result) {
		if(err) res.send(err);
		else res.json(result);
	});
};

module.exports = utils;
