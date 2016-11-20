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
const multer = require('multer');
const config = require('./config');
const utils = require('./cityUtils');

//Use different one
const db = mongojs(config.database.url, [ config.database.cities, config.database.games ]);

//All items
router.get('/cities', function(req, res, next) {
	db.cities.find(function(err, cities) {
		if(err) res.send(err);
		else {
			res.json(cities);
		}

	});
});

//Single item
router.get('/cities/:id', function(req, res, next) {
	db.cities.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, city) {
		if(err) res.send(err);
		else {
			res.json(city);
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
		utils.saveCity(newCity, req, res);
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

router.get('/games', function(req, res) {
	res.json(utils.getGames());
});

//Upload service
const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			let dest = path.join(__dirname, 'client/images/cities/', (req.body.city || ''));
			if (!fs.existsSync(dest)){
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

router.post('/upload', upload.any(), (req, res) => {
	let newCity = {
		name: req.body.city,
		path: path.join('/images/cities/', (req.body.city || '')),
		photos: req.files.map(file => {return file.filename})
	};
	//Save city in DB
	//TODO: Append to array of photos
	utils.addOrUpdateCity(newCity, req, res);
});

router.get('/', function(req, res) {
	res.redirect('/');
});


module.exports = router;