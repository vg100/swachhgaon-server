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
                        req.event = event;
                        return true;
                    }
                    else {
                        throw new Error('Event Does Not Exist');
                    }
                });
            }),
            (0, express_validator_1.body)('name', 'Name is Required').isString(),
            (0, express_validator_1.body)('age', 'Age is Required').isNumeric(),
            (0, express_validator_1.body)('phone_no', 'Phone Number is Required').isNumeric(),
            (0, express_validator_1.body)('gender', 'Phone Number is Required').isString(),
        ];
    }
}
exports.AttendanceValidators = AttendanceValidators;
