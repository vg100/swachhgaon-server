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
       this.router.get('/',GlobalMiddleWare.authenticate, EventController.getAllEvents);
       this.router.get('/export-event',EventController.exportEvent)
       this.router.get('/export-participant',EventController.exportParticipantList)
    }
    postRoutes() {
        this.router.post('/import-event',GlobalMiddleWare.authenticate,new Utils().multer.array('file'),EventController.importEvent)
        this.router.post('/add/:userId?',GlobalMiddleWare.authenticate,EventValidators.ceateEvent(),GlobalMiddleWare.checkError,EventController.addNewEvents);
    }
    patchRoutes() {
        this.router.patch('/update/:id',GlobalMiddleWare.authenticate,EventValidators.updateEvent(),new Utils().multer.array('file'),GlobalMiddleWare.checkError,EventController.updateEvent);
        this.router.patch('/finalsubmit/:id',GlobalMiddleWare.authenticate,EventValidators.finalsubmit(),new Utils().multer.array('file'),GlobalMiddleWare.checkError,EventController.finalSubmit);
    }
    deleteRoutes() {
        this.router.delete('/deletefile/:id/:index',GlobalMiddleWare.authenticate,EventValidators.deleteFile(),GlobalMiddleWare.checkError,EventController.deleteFile)
    }
}

export default new EventRouter().router;
