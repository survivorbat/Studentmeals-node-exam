const express = require('express');
const router = express.Router();
var config = require('./config/config');
/* Subroutes */
const expressJWT = require('express-jwt');
const authenticationapi = require('./routes/authenticationapi');
const studentapi = require('./routes/studentapi');

/* The authentication check */
router.use(expressJWT({
    secret: config.secretkey
}).unless({
    path: ['/api/login']
}));

router.use('/api/', authenticationapi);
router.use('/api/student/', studentapi);

router.use((error,req,res,next) => {
	res.status(500).send({
        message: error.message,
        code: error.code,
        name: error.name,
        status: error.status
	}).end();
});

/* Catch any undefined routes with a 404 status*/
router.get('*', (req, res) => {
	res.status(404).send({
		message: '404 not found'
	}).end();
})

module.exports = router;