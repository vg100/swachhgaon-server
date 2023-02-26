import {body, param} from 'express-validator';
import Event from '../models/Event';



export class AttendanceValidators {
    static addAttendance() {
        return [
            param('id').custom((id, {req}) => {
                return Event.findOne({_id: id}).then((event) => {
                    if (event) {
                        req.event = event;
                        return true;
                    } else {
                        throw  new Error('Event Does Not Exist');
                    }
                })
            }),
            body('name', 'Name is Required').isString(),
            body('age', 'Age is Required').isNumeric(),
            body('phone_no', 'Phone Number is Required').isNumeric(),
        ]
    }

}