const express = require('express');
const routes = express.Router();

const studentcontroller = require('../controllers/ctrl_student');

routes.get('/', studentcontroller.getAll);

routes.get('/:id', studentcontroller.getById);

routes.post('/', studentcontroller.create);

routes.put('/', studentcontroller.update);

routes.delete('/:id', studentcontroller.delete);

routes.get('/:id/picture', studentcontroller.getImage);

routes.put('/:id/picture', studentcontroller.setImage);

module.exports = routes;
