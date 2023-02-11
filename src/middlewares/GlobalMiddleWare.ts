import {validationResult} from 'express-validator';
import * as Jwt from 'jsonwebtoken';
import {getEnvironmentVariables} from '../environments/env';

export class GlobalMiddleWare {
    static checkError(req, res, next) {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            next(new Error(error.array()[0].msg));
        } else {
            next();
        }
    }

    static async authenticate(roles=[],req, res, next) {
        if (typeof roles === 'string') {
            roles = [roles];
        }
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.slice(7, authHeader.length) : null;
        try {
            Jwt.verify(token, getEnvironmentVariables().jwt_secret, ((err, decoded) => {
                if (err) {
                    next(err)
                } else if (roles.length && !roles.includes(req.user.role) ) {
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
