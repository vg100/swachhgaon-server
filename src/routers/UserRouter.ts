import {Router} from 'express';
import {UserController} from '../controllers/UserController';
import {GlobalMiddleWare} from '../middlewares/GlobalMiddleWare';
import { UserValidators } from '../validators/UserValidators';


class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get('/',GlobalMiddleWare.authenticate,UserController.getAllUser);
    }

    postRoutes() {
        this.router.post('/signup',GlobalMiddleWare.authenticate,UserController.signUp);
        this.router.post('/login', UserValidators.login(), GlobalMiddleWare.checkError, UserController.login);
    }

    patchRoutes() {
    }

    deleteRoutes() {

    }
}

export default new UserRouter().router;
