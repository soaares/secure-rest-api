import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { UserSchema } from '../models/userModel'

const User = mongoose.model('User', UserSchema);

export const loginRequired = (request, response, next) => {
    if (request.user) next()
    return response.status(401).json({ message: 'Unauthorized user!' })
}

export const register = (request, response) => {
    const newUser = new User(request.body)
    newUser.hashPassword = bcrypt.hashSync(request.body.password, 10)
    newUser.save((error, user) => {
        if (error) return response.status(400).send({ message: error })
        user.hashPassword = undefined
        return response.json(user)
    })
}

export const login = (request, response) => {
    User.findOne({
        email: request.body.email
    }, (error, user) => {
        if (error) throw error
        if (!user) {
            return response.status(401).json({ message: 'Authentication failed. No user found' })
        } else if (user) {
            if (!user.comparePassword(request.body.password, user.hashPassword)) {
                return response.status(401).json({ message: 'Authentication failed. Wrong password' })
            } else {
                response.status(200).json({ token: user.email, username: user.username, _id: user.id }, 'security-api')
            }
        }
    })
}