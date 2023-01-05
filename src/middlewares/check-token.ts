import { Response, Request, NextFunction } from "express";
import { verify } from 'jsonwebtoken'

export const checkToken = (request: any, response: Response, next: NextFunction) => {
    if (request.headers && request.headers.authorization && request.headers.authorization.split(' ')[0] === 'JWT') {
        verify(request.headers.authorization.split(' ')[1], 'security-api', (error: any, decode: any) => {
            if (error) request.user = undefined
            console.log(decode)
            request.user = decode
            next()
        })
    } else {
        request.user = undefined
        next()
    }
}