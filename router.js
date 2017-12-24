const express = require('express');
const router = express.Router();

/* Subroutes */
//const personapi = require('./routes/personapi.js');
//router.use('/api/person/', personapi);

/* Catch any undefined routes with a 404 status*/
router.get('*', (req, res) => {
	res.status(404).send({
		message: '404 not found'
	}).end();
})

module.exports = router;