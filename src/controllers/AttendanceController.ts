import User from '../models/User';
import {Utils} from '../utils/Utils';
import * as Jwt from 'jsonwebtoken';
import {getEnvironmentVariables} from '../environments/env';
import Attendance from '../models/Attendance';

export class AttendanceController {
    static async add(req, res, next) {
        const event=req.event
        console.log(event)
     
       try {
        const attendance = new Attendance({
           ...req.body,
            created_at: new Date(),
            updated_at: new Date()
        });
        event.attendances.push(attendance)
        await Promise.all([attendance.save(), event.save()]);
        res.send({message:"attendance marked successfully"})
    } catch (e) {
        next(e);
    
    }
       
    }
    
}
