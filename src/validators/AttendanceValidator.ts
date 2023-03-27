import {body, param} from 'express-validator';
import Event from '../models/Event';
export class AttendanceValidators {
    static addAttendance() {
        return [
            param('id').custom((id, {req}) => {
                return Event.findOne({_id: id}).then((event) => {
                    if (event) {
                        if( event.no_of_participant !== event.participants.length){
                            req.event = event;
                            return true;
                        }else{
                            throw  new Error('Participant are full now');
                        }
                    } else {
                        throw  new Error('Event Does Not Exist');
                    }
                })
            }),
            body('name', 'Name is Required').isString(),
            body('village', 'Village is Required').isString(),
            body('phone_no', 'Phone Number is Required').isNumeric(),
            body('gender', 'Phone Number is Required').isString(),
        ]
    }

}