import {body, query} from 'express-validator';
import Event from '../models/User';

export class EventValidators {
    static ceateEvent() {
        return [body('supervisor', 'Supervisor is Required'),
                body('type_of_training', 'type_of_training is Required'),
                body('location', 'Name is Required'),
                body('files', 'files is Required'),
                body('startDate', 'startDate is Required'),
                body('endDate', 'endDate is Required'),
                body('no_of_participant', 'no_of_participant is Required'),
                body('no_of_males', 'no_of_males is Required'),
                body('no_of_females', 'no_of_females is Required')
            ];
    }
   
}


