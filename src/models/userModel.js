import mongoose from 'mongoose';
import { compareSync } from 'bcrypt';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.method.comparePassword = (password, hashPassword) => {
    return compareSync(password, hashPassword)
}
