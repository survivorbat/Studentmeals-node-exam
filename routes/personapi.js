const express = require('express');
const routes = express.Router();

const personcontroller = require('../controllers/ctrl_person');

routes.get('/', (req, res, next) => {
	res.contentType('application/json');
	next();
});

routes.get('/', personcontroller.getAll);

routes.get('/:id', personcontroller.getById);

routes.post('/', personcontroller.create);

routes.put('/', personcontroller.update);

routes.delete('/', personcontroller.delete);

module.exports = routes;