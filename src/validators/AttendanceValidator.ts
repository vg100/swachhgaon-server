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
                            throw  new Error('Participants exceed the limit');
                        }
                    } else {
                        throw  new Error('Event Does Not Exist');
                    }
                })
            }),
            body('name', 'Name is Required').notEmpty().withMessage("Name is Required"),
            body('village', 'Village is Required').notEmpty().withMessage("Village is Required"),
            body('phone_no', 'Phone Number is Required').notEmpty().withMessage("Phone Number is Required"),
            body('gender', 'Gender is Required').notEmpty().withMessage("Gender is Required"),
        ]
    }

}