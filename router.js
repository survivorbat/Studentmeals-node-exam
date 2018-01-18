const express = require('express'); //The express object from node modules
const router = express.Router(); //The router that we're going to need
const config = require('./config/config'); //Config file for the secret key
const expressJWT = require('express-jwt'); //

/* Subroutes, basically every endpoint */
const authenticationapi = require('./routes/authenticationapi');
const studentapi = require('./routes/studentapi');
const mealapi = require('./routes/mealapi');
const felloweaterapi = require('./routes/felloweaterapi');

/* The authentication check */
router.use(expressJWT({ //For each route use the expressJWT module
    secret: config.secretkey //With the secret key
}).unless({ //HOWEVER DON'T USE IT FOR:
    path: [
    { url: '/api/login', methods: ['POST']  }, //The login route, otherwise you can be 'locked out' so to say. Like when you need a key for your house but the key is inside
    { url: '/api/student', methods: ['POST']  } //When you want to add a new student, so people can register freely
    ]
}));

//Now that that's done let's set up all our routes
router.use('/api/', authenticationapi);
router.use('/api/student/', studentapi);
router.use('/api/meal/', mealapi);
router.use('/api/felloweater/', felloweaterapi);

//Catch any errors and display their details
router.use((error,req,res,next) => {
	res.status(error.status).send({
        message: error.message,
        code: error.code,
        name: error.name,
        status: error.status
	}).end();
});

/* Catch any undefined routes with a 404 status*/
router.get('*', (req, res) => {
	res.status(404).send({
		message: '404 not found' //To let the caller know his request doesn't have an endpoint
	}).end();
})

module.exports = router; //Export this router to the server
