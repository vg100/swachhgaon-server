import {Router} from 'express';
import { AttendanceController } from '../controllers/AttendanceController';
import {UserController} from '../controllers/UserController';
import {GlobalMiddleWare} from '../middlewares/GlobalMiddleWare';
import { AttendanceValidators } from '../validators/AttendanceValidator';
import { UserValidators } from '../validators/UserValidators';


class AttendanceRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
    
    }

    postRoutes() {
        this.router.post('/add/:id',GlobalMiddleWare.authenticate, AttendanceValidators.addAttendance(),GlobalMiddleWare.checkError,AttendanceController.add);
    }

    patchRoutes() {
    }


        deleteRoutes() {
          
        }
    
}

export default new AttendanceRouter().router;
