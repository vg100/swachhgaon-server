import { validationResult } from 'express-validator';
import * as Jwt from 'jsonwebtoken';
import { getEnvironmentVariables } from '../environments/env';

export class GlobalMiddleWare {
    static checkError(req, res, next) {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            next(new Error(error.array()[0].msg));
        } else {
            next();
        }
    }

    static async authenticate(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader : null;

        try {
            Jwt.verify(token, getEnvironmentVariables().jwt_secret, ((err, decoded) => {
                if (err) {
                    next(err)
                } else if (!decoded) {
                    req.errorStatus = 401;
                    next(new Error('User Not Authorised'))
                } else {
                    req.user = decoded;
                    next();
                }
            }))
        } catch (e) {
            req.errorStatus = 401;
            next(e);
        }
    }  

    
}

export const authorizeRoles = (roles:any=[]) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return (req, res, next) => {
        try {
            const authHeader = req.headers["authorization"] || req.headers["Authorization"];
            const token = authHeader ? authHeader : null;
            Jwt.verify(token, getEnvironmentVariables().jwt_secret, ((err, decoded) => {
                if(err){
                    next(err)
                }
                if (!decoded.role) return  next(new Error('Error: Role missing'))
                if(roles.indexOf(decoded.role) === -1) return  next(new Error('Error: User not authorized'))
                req.user = decoded;
                next();
            }))
        } catch (e) {
            req.errorStatus = 401;
            next(e);
        }
    }
}
