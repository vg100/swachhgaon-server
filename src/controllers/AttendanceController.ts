import User from '../models/User';
import { Utils } from '../utils/Utils';
import * as Jwt from 'jsonwebtoken';
import { getEnvironmentVariables } from '../environments/env';
import Attendance from '../models/Attendance';

export class AttendanceController {
    static async add(req, res, next) {
        const event = req.event
        try {
    const attendance = new Attendance({
        ...req.body,
        event_id:req.event._id,
        created_at: new Date(),
        updated_at: new Date()
    });

    event.participants.push(attendance)
    await Promise.all([attendance.save(), event.save()]);
    res.send({ message: "Participant added successfully" })    
        } catch (e) {
            next(e);
        }
    }
}
