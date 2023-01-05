import { Request } from "express";

class UsernameLengthError extends Error {
    constructor() {
        super('Username length has to be longer than 7 characters')
    }
}

class PasswordLengthError extends Error {
    constructor() {
        super('Password length has to be longer than 7 characters')
    }
}

type UserProps = {
    username: string
    password: string
    email: string
}

class User {

    username: string
    password: string
    email: string

    constructor(private userInformations: UserProps) {
        const { username, password, email } = userInformations
        if (username.length < 8) throw new UsernameLengthError()
        if (password.length < 8) throw new PasswordLengthError()
        this.username = userInformations.username
        this.password = userInformations.password
        this.email = userInformations.email
    }

    get username(): string {
        return this.username
    }
}

class RegisterUserController {
    async handle(request: Request, response: Response) {
        const { username, password, email } = request.body
        const newUser = new User(request.body)
        newUser.hashPassword = bcrypt.hashSync(request.body.password, 10)
        newUser.save((error, user) => {
            if (error) return response.status(400).send({ message: error })
            user.hashPassword = undefined
            return response.json(user)
        })

    }
}