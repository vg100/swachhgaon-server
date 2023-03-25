"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidators = void 0;
const express_validator_1 = require("express-validator");
const Event_1 = require("../models/Event");
class EventValidators {
    static ceateEvent() {
        return [(0, express_validator_1.body)('event', 'Event Name is Required'),
            (0, express_validator_1.body)('type_of_training', 'type_of_training is Required'),
            (0, express_validator_1.body)('location', 'Name is Required'),
            (0, express_validator_1.body)('files', 'files is Required'),
            (0, express_validator_1.body)('startDate', 'startDate is Required'),
            (0, express_validator_1.body)('endDate', 'endDate is Required'),
            (0, express_validator_1.body)('no_of_participant', 'no_of_participant is Required'),
            (0, express_validator_1.body)('no_of_males', 'no_of_males is Required'),
            (0, express_validator_1.body)('no_of_females', 'no_of_females is Required')
        ];
    }
    static updateEvent() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Event_1.default.findOne({ _id: id }).then((event) => {
                    if (event) {
                        req.event = event;
                        return true;
                    }
                    else {
                        throw new Error('Event Does Not Exist');
                    }
                });
            })];
    }
    static finalsubmit() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Event_1.default.findOne({ _id: id }).then((event) => {
                    if (event) {
                        req.event = event;
                        return true;
                    }
                    else {
                        throw new Error('Event Does Not Exist');
                    }
                });
            })];
    }
    static deleteFile() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Event_1.default.findOne({ _id: id }).then((event) => {
                    if (event) {
                        req.event = event;
                        return true;
                    }
                    else {
                        throw new Error('Event Does Not Exist');
                    }
                });
            })];
    }
}
exports.EventValidators = EventValidators;
