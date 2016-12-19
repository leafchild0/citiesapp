/**
 * Created by: leaf
 * Date: 22/10/16
 * Time: 22:50
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const utils = require('./utils');

//All items
router.get('/cities', function(req, res) {
	utils.getCities(function(err, cities) {
		if(err) res.send(err);
		else res.json(cities);
	});
});

//Single item
router.get('/cities/:id', function(req, res) {
	utils.findCity(req.params.id, function(err, city) {
		if(err) res.send(err);
		else res.json(city);
	});
});

router.get('/games/:id', function(req, res) {
	utils.findGame(req.params.id, function(err, city) {
		if(err) res.send(err);
		else res.json(city);
	});
});

router.delete('/games/:id', function(req, res) {
	utils.deleteGame(req.params.id, function(err) {
		if(err) res.send(err);
		else {
			res.status(200);
			res.send();
		}
	});
});

//Upload item
router.post('/cities', function(req, res) {
	let newCity = req.body;
	if(!newCity.name || !newCity.photos || newCity.path) {
		res.status(400);
		res.json({
			"error": "Invalid Data"
		});
	} else {
		utils.saveCity(newCity, function(err, result) {
			if(err) res.send(err);
			else res.json(result);
		});
	}
});

//API Only, not UI actions for now
router.delete('/city/:id', function(req, res) {
	utils.removeGame(req.params.id, function(err, result) {
		if(err) res.send(err);
		else res.json(result);
	});
});

router.get('/games', function(req, res) {
	res.json(utils.getGames());
});

router.post('/upload', utils.upload.any(), (req, res) => {
	let newCity = {
		name: req.body.city,
		path: path.join('/images/cities/', (req.body.city || '')),
		photos: req.files.map(file => {return file.filename})
	};
	//Save city in DB
	utils.addOrUpdateCity(newCity, function(err, result) {
		if(err) res.send(err);
		else res.json(result);
	});
});

router.get('*', function(req, res) {
	res.redirect('/');
});

module.exports = router;