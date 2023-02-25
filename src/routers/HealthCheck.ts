import {Router} from 'express';
import {UserController} from '../controllers/UserController';
import {GlobalMiddleWare} from '../middlewares/GlobalMiddleWare';
import { UserValidators } from '../validators/UserValidators';


class HealthCheck {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
    }

    getRoutes() {
        this.router.get('/', UserController.healthCheck);
    }
}

export default new HealthCheck().router;
