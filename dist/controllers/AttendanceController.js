"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const Attendance_1 = require("../models/Attendance");
class AttendanceController {
    static add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = req.event;
            try {
                const attendance = new Attendance_1.default(Object.assign(Object.assign({}, req.body), { event_id: req.event._id, created_at: new Date(), updated_at: new Date() }));
                yield attendance.save();
                // event.attendances.push(attendance)
                // await Promise.all([attendance.save(), event.save()]);
                res.send({ message: "Participant Added successfully" });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.AttendanceController = AttendanceController;
