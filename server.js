/* Declare dependencies */
const express = require('express');
const app = express();
const logger = require('morgan');
const bodyparser = require('body-parser');
const router = require('./router');

/* Middleware */
app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

/* All routes */
app.use(router);

/* Catch any undefined routes with a 404 status*/
app.get('*', (req, res) => {
	res.status(404).send({
		message: '404 not found'
	}).end();
})

/* Start server on a pre-defined port or 5000  */
app.listen(process.env.PORT || 5000, () => {
	if(process.env.PORT !== undefined){
		console.log('Server gestart op poort '+process.env.PORT);
	} else {
		console.log('Server gestart op poort 5000');
	}
});

/* Export for testing */
module.exports = app;
