import User from '../models/User';
import {Utils} from '../utils/Utils';
import * as Jwt from 'jsonwebtoken';
import {getEnvironmentVariables} from '../environments/env';

export class UserController {
    static async signUp(req, res, next) {
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        const role =req.body.role;
        try {
            const hash = await Utils.encryptPassword(password);
            const data = {
                email: email,
                password: hash,
                passwordView:password,
                name: name,
                role: role,
                gender: req.body.gender,
                created_at: new Date(),
                updated_at: new Date()
            };
            let user = await new User(data).save();
            res.send(user);
        } catch (e) {
            next(e);
        }
    }
    static async login(req, res, next) {
        const password = req.body.password;
        const user = req.user;
        try {
            await Utils.comparePassword({
                plainPassword: password,
                encryptedPassword: user.password
            });
            const token = Jwt.sign({email: user.email, user_id: user._id,role:user.role},
                getEnvironmentVariables().jwt_secret, {expiresIn: '120d'});
            const data = {token: token, user: user};
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
    static async getAllUser(req, res, next) {
    
        try {
            const users: any = await User.find()
            res.json(users);
        } catch (e) {
            next(e);
        }
    }

    static async healthCheck(req, res, next) {
    
        try {
            const resp = {
               status: 'UP',
               app: 'Swatchh Gaon' 
            }   
            res.json(resp);     
        } catch (e) {
            next(e);
        }
    }

    static async deleteUser(req, res, next) {
    const user=req.userId
    try {
        await user.remove();
        res.send({ message: 'Deleted successfully' });
    } catch (e) {
        next(e);
    
    }
}

static async updateUser(req,res,next){
    try {
        const hash = await Utils.encryptPassword(req?.body?.password);
        const newUser = await User.findOneAndUpdate({_id: req.userId._id}, {
            ...req.body,
            password: hash,
            passwordView:req?.body?.password,
        },
            {new: true});
            res.send({ message: 'updated successfully' });
    } catch (error) {
        next(error)
    }
}

}
