const express = require('express');
const router = express.Router();
var config = require('./config/config');
/* Subroutes */
const expressJWT = require('express-jwt');
const authenticationapi = require('./routes/authenticationapi');
const studentapi = require('./routes/studentapi');
const felloweaterapi = require('./routes/felloweaterapi');

/* The authentication check */
router.use(expressJWT({
    secret: config.secretkey
}).unless({
    path: [
    { url: '/api/login', methods: ['POST']  },
    { url: '/api/student', methods: ['POST']  }
    ]
}));

/* Catch any undefined routes with a 404 status*/
router.get('*', (req, res) => {
	res.status(404).send({
		message: '404 not found'
	}).end();
})

module.exports = router;