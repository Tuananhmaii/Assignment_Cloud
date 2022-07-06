const express = require('express');
const route = express.Router()
const controller = require('../controller/controller');

route.post('/api/toys',controller.create)
route.get('/api/toys',controller.find)
route.put('/api/toys/:id',controller.update)
route.delete('/api/toys/:id',controller.delete)

module.exports = route;