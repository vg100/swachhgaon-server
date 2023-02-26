import * as mongoose from 'mongoose';
import {model} from 'mongoose';

export enum Roles {
    USER = "USER",
    ADMIN = "ADMIN"
   }


const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    passwordView:{type: String, required: true},
    name: {type: String, required: true},
    gender: {type: String, required: true},
    role:{type: String, enum:Object.keys(Roles),default:Roles.USER},
    created_at: {type: Date, required: true, default: new Date()},
    updated_at: {type: Date, required: true, default: new Date()},
});
export default model('users', userSchema);
