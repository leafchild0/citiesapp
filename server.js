/**
 * Created by: leaf
 * Date: 21/10/16
 * Time: 12:34
 */

const path = require('path');
const config = require('./config');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, 'client')));

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', routes);

app.listen(config.port, function(){
	console.log('Server started on port ' + config.port);
});