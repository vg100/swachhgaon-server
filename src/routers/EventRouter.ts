import {Router} from 'express';
import { EventController } from '../controllers/EventController';
import {UserController} from '../controllers/UserController';
import {authorizeRoles, GlobalMiddleWare} from '../middlewares/GlobalMiddleWare';
import { Roles } from '../models/User';
import { Utils } from '../utils/Utils';
import { EventValidators } from '../validators/EventValidator';
import { UserValidators } from '../validators/UserValidators';


class EventRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
       this.router.get('/', GlobalMiddleWare.authenticate, EventController.getAllEvents);
       this.router.get('/event-download', GlobalMiddleWare.authenticate, EventController.getAllEvents);
    }

    postRoutes() {

        this.router.post('/add',GlobalMiddleWare.authenticate, 
        EventValidators.ceateEvent(), 
        GlobalMiddleWare.checkError,
        new Utils().multer.array('file'),
       EventController.addNewEvents);
    }

    patchRoutes() {
    }

    deleteRoutes() {

    }
}

export default new EventRouter().router;
