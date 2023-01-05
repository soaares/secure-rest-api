import { Response, NextFunction } from 'express'

export const loginRequired = (request: any, response: Response, next: NextFunction) => {
    if (request.user) {
        next()
        return
    }
    return response.status(401).json({ message: 'Unauthorized user!' })
}