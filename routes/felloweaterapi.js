const express = require('express');
const routes = express.Router();

const studentcontroller = require('../controllers/ctrl_felloweater');

// routes.get('/', (req, res, next) => {
// 	res.contentType('application/json');
// 	next();
// });

routes.get('/', felloweatercontroller.getAll);

routes.get('/:id', felloweatercontroller.getById);

routes.post('/', felloweatercontroller.create);

routes.put('/', felloweatercontroller.update);

routes.delete('/', felloweatercontroller.delete);

module.exports = routes;