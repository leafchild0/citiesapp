/**
 * Created by: leaf
 * Date: 21/10/16
 * Time: 12:34
 */

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', routes);

app.listen(3000, function(){
	console.log('Server started on port 3000...');
});