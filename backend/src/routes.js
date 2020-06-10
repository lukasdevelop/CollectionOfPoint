import express from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
const routes = express.Router()

import ItemsController from './controllers/ItemsController'
import PointsController from './controllers/PointsController'

routes.get('/items', ItemsController.index)
routes.post('/points', PointsController.create)
routes.get('/points/:id', PointsController.show)
routes.get('/points', PointsController.index)
 


export default routes
