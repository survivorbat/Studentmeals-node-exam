const express = require('express');
const routes = express.Router();

const mealcontroller = require('../controllers/ctrl_meal');

routes.get('/', mealcontroller.getAll);

routes.get('/:id', mealcontroller.getById);

routes.post('/', mealcontroller.create);

routes.put('/', mealcontroller.update);

routes.delete('/:id', mealcontroller.delete);

routes.put('/:id/picture', mealcontroller.setByIdThePicture);

routes.get('/:id/picture', mealcontroller.getByIdThePicture);

module.exports = routes;
