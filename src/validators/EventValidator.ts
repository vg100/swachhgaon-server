import { body, query, param } from 'express-validator';
import Event from '../models/Event';

export class EventValidators {
    static ceateEvent() {
        return [body('event', 'Event Name is Required'),
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

    static updateEvent() {
        return [param('id').custom((id, { req }) => {
            return Event.findOne({ _id: id }).then((event) => {
                if (event) {
                    req.event = event;
                    return true;
                } else {
                    throw new Error('Event Does Not Exist');
                }
            })
        })]
    }

    static finalsubmit() {
        return [param('id').custom((id, { req }) => {
            return Event.findOne({ _id: id }).then((event) => {
                if (!event) throw new Error('Event Does Not Exist');
                if (event.no_of_participant !== event.participants.length) throw new Error('Please add more participant before final submit');
                if (req.files.length < 1) throw new Error('Add atleast one image');
                req.event = event;
                return true;
            })
        })]
    }

    static deleteFile() {
        return [param('id').custom((id, { req }) => {
            return Event.findOne({ _id: id }).then((event) => {
                if (event) {
                    req.event = event
                    return true;
                } else {
                    throw new Error('Event Does Not Exist');
                }
            })
        })]
    }

    static removeEvent() {
        return [param('id').custom((id, { req }) => {
            return Event.findOne({ _id: id }).then((event) => {
                if (event) {
                    req.event = event
                    return true;
                } else {
                    throw new Error('Event Does Not Exist');
                }
            })
        })]
    }


}


//https://www.youtube.com/watch?v=dNlUDb77Bfc