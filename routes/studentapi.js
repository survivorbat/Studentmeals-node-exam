const express = require('express');
const routes = express.Router();

const studentcontroller = require('../controllers/ctrl_student');

// routes.get('/', (req, res, next) => {
// 	res.contentType('application/json');
// 	next();
// });

routes.get('/', studentcontroller.getAll);

routes.get('/:id', studentcontroller.getById);

routes.post('/', studentcontroller.create);

routes.put('/', studentcontroller.update);

routes.delete('/', studentcontroller.delete);

routes.get('/:id/picture', studentcontroller.getImage);

module.exports = routes;
