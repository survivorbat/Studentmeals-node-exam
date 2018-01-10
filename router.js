const express = require('express');
const router = express.Router();

/* Subroutes */
const studentapi = require('./routes/studentapi.js');
router.use('/api/student/', studentapi);
//JWT insert
router.use((error,req,res,next) => {
	res.status(500).send({
		error: error
	}).end();
});

/* Catch any undefined routes with a 404 status*/
router.get('*', (req, res) => {
	res.status(404).send({
		message: '404 not found'
	}).end();
})

module.exports = router;