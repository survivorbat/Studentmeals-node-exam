const express = require('express');
const routes = express.Router();

const felloweatercontroller = require('../controllers/ctrl_felloweater');

routes.get('/', felloweatercontroller.getAll);

routes.get('/:ID', felloweatercontroller.getById);

routes.post('/', felloweatercontroller.create);

routes.put('/', felloweatercontroller.update);

routes.delete('/:id', felloweatercontroller.delete);

module.exports = routes;