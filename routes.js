/**
 * Created by: leaf
 * Date: 22/10/16
 * Time: 22:50
 */

const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const fs = require('fs');
const path = require('path');

const pathToImages = '/images/cities/';

//Use different one
const db = mongojs('mongodb://cities-user:z8H8oenD@ds061196.mlab.com:61196/cities-a', [ 'cities' ]);

let constructPaths = function(city) {
	//This path should be recreated in the fs
	city.photo = pathToImages + city.photo;
	return city;
};

//All items
router.get('/cities', function(req, res, next) {
	db.cities.find(function(err, cities) {
		if(err) res.send(err);
		else {
			cities.forEach(city => constructPaths(city));
			res.json(cities);
		}

	});
});

//Single item
router.get('/cities/:id', function(req, res, next) {
	db.cities.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, city) {
		if(err) res.send(err);
		else {
			res.json(constructPaths(city));
		}
	});
});

//Upload item
router.post('/cities', function(req, res, next) {
	let newCity = req.body;
	if(!newCity.name || !newCity.photos) {
		res.status(400);
		res.json({
			"error": "Invalid Data"
		});
	} else {
		db.cities.save(newCity, function(err, result) {
			if(err) res.send(err);
			else res.json(result);
		});
	}
});

//API Only, not UI actions for now
router.delete('/city/:id', function(req, res, next) {
	db.cities.remove({
		_id: mongojs.ObjectId(req.params.id)
	}, '', function(err, result) {
		if(err) res.send(err);
		else res.json(result);
	});
});

module.exports = router;