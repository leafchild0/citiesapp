/**
 * Created by: leaf
 * Date: 27/11/16
 * Time: 09:32
 */

const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

let citySchema = new Schema({
	name: String,
	path: String,
	photos: [String]
});


module.exports = mongoose.model('City', citySchema);