import { user } from './user-routes'
import { Router } from 'express'

const routes = Router()

routes.use(user)

export default routes;
