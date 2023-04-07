"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceValidators = void 0;
const express_validator_1 = require("express-validator");
const Event_1 = require("../models/Event");
class AttendanceValidators {
    static addAttendance() {
        return [
            (0, express_validator_1.param)('id').custom((id, { req }) => {
                return Event_1.default.findOne({ _id: id }).then((event) => {
                    if (event) {
                        if (event.no_of_participant !== event.participants.length) {
                            req.event = event;
                            return true;
                        }
                        else {
                            throw new Error('Participants exceed the limit');
                        }
                    }
                    else {
                        throw new Error('Event Does Not Exist');
                    }
                });
            }),
            (0, express_validator_1.body)('name', 'Name is Required').notEmpty().withMessage("Name is Required"),
            (0, express_validator_1.body)('village', 'Village is Required').notEmpty().withMessage("Village is Required"),
            (0, express_validator_1.body)('phone_no', 'Phone Number is Required').notEmpty().withMessage("Phone Number is Required"),
            (0, express_validator_1.body)('gender', 'Gender is Required').notEmpty().withMessage("Gender is Required"),
        ];
    }
}
exports.AttendanceValidators = AttendanceValidators;
