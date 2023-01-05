import { login, loginRequired, register } from '../controllers/userController';

import { Router } from 'express'

const user = Router()

user
    .post('/auth/register',)
    .post('/login')

export { user };
