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
exports.EventController = void 0;
const Event_1 = require("../models/Event");
const Attendance_1 = require("../models/Attendance");
const fs = require('fs');
const XLSX = require('xlsx');
class EventController {
    static addNewEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const usr = req.user;
            const role = usr.role;
            const userId = req.params.userId;
            var data;
            if (role === 'USER') {
                data = Object.assign(Object.assign({}, req.body), { no_of_participant: req.body.no_participant, user_id: req.user.user_id });
            }
            else {
                data = Object.assign(Object.assign({}, req.body), { no_of_participant: req.body.no_participant, user_id: userId });
            }
            let user = yield new Event_1.default(data).save();
            res.json({ message: 'Event created successfully' });
        });
    }
    static getAllEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var events;
                if (req.user.role === "ADMIN") {
                    events = yield Event_1.default.find({ user_id: req.query.userId }).populate('participants');
                }
                if (req.user.role === "USER") {
                    events = yield Event_1.default.find({ user_id: req.user.user_id }).populate('participants');
                }
                res.json(events);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static updateEvent(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const event = (_a = req === null || req === void 0 ? void 0 : req.event) === null || _a === void 0 ? void 0 : _a._id;
            try {
                const files = [];
                req.files.forEach((file) => {
                    files.push(file.path);
                });
                yield Event_1.default.findOneAndUpdate({ _id: event }, Object.assign(Object.assign({}, req.body), { type_of_training: req.body.training_type, no_of_participant: req.body.no_participant, no_of_males: req.body.male, no_of_females: req.body.female, files: [...req === null || req === void 0 ? void 0 : req.event.files, ...files] }), { new: true });
                res.json({ message: 'Updated successfully' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteEvent(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const event = req === null || req === void 0 ? void 0 : req.event;
            try {
                (_a = event === null || event === void 0 ? void 0 : event.files) === null || _a === void 0 ? void 0 : _a.forEach((path) => {
                    fs.unlinkSync(path);
                });
                yield event.remove();
                res.json({ message: 'Removed successfully' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = req === null || req === void 0 ? void 0 : req.event;
            const index = req === null || req === void 0 ? void 0 : req.params.index;
            try {
                const pathname = event.files[req === null || req === void 0 ? void 0 : req.params.index];
                fs.access(pathname, error => {
                    if (!error) {
                        fs.unlinkSync(pathname);
                    }
                    else {
                        console.error('Error occured:', error);
                    }
                });
                event.files.splice(index, 1);
                event.save();
                res.json({ message: 'Removed successfully' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static importEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wb = XLSX.readFile(req.files[0].path);
                const sheets = wb.SheetNames;
                if (sheets.length > 0) {
                    const data = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    const movies = data.map(row => ({
                        user_id: row['User Id'],
                        eventname: row['Event Name'],
                        type_of_training: row['Training Type'],
                        location: row['Location'],
                        startDate: row['Start Date'],
                        endDate: row['End Date'],
                        no_of_participant: row['Participant'],
                        no_of_males: row['Male'],
                        no_of_females: row['Female'],
                        report: row["Report"]
                    }));
                    yield Event_1.default.insertMany(movies);
                }
                res.send({
                    massage: "Done"
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static exportEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var events;
                if (req.user.role === "ADMIN") {
                    console.log('admin');
                    events = yield Event_1.default.find({ user_id: req.query.userId });
                }
                if (req.user.role === "USER") {
                    console.log('user');
                    events = yield Event_1.default.find({ user_id: req.user.user_id });
                }
                // const events: any = await Event.find()
                const data = events.map(event => {
                    return [event.eventname, event.district, event.block, event.gp, event.venue, event.no_of_participant
                    ];
                });
                const workBook = XLSX.utils.book_new();
                const workSheetData = [
                    ["Event Name", "District", "Block", "GP", "Venue", "Participant"],
                    ...data
                ];
                //  const workSheet = XLSX.utils.json_to_sheet(events);
                const workSheet = XLSX.utils.aoa_to_sheet(workSheetData, { origin: "A1" });
                XLSX.utils.book_append_sheet(workBook, workSheet, 'Event');
                const buffer = XLSX.write(workBook, { bookType: 'csv', type: 'buffer' });
                res.attachment('event_list.csv');
                res.send(buffer);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static finalSubmit(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log((_a = req === null || req === void 0 ? void 0 : req.event) === null || _a === void 0 ? void 0 : _a._id);
            const event = (_b = req === null || req === void 0 ? void 0 : req.event) === null || _b === void 0 ? void 0 : _b._id;
            try {
                const files = [];
                req.files.forEach((file) => {
                    files.push(file.path);
                });
                yield Event_1.default.findOneAndUpdate({ _id: event }, {
                    isDone: req.body.isDone,
                    files: [...req === null || req === void 0 ? void 0 : req.event.files, ...files]
                }, { new: true });
                res.json({ message: 'Submit successfully' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static exportParticipantList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const participants = yield Attendance_1.default.find({ event_id: req.query.id });
                const data = participants.map(participants => {
                    return [participants.name, participants.village, participants.deignation, participants.phone_no, participants.gender,
                    ];
                });
                const workBook = XLSX.utils.book_new();
                const workSheetData = [
                    ["Name", "Village", "Deignation", "Phone no", "Gender"],
                    ...data
                ];
                //  const workSheet = XLSX.utils.json_to_sheet(events);
                const workSheet = XLSX.utils.aoa_to_sheet(workSheetData, { origin: "A1" });
                XLSX.utils.book_append_sheet(workBook, workSheet, 'Event');
                const buffer = XLSX.write(workBook, { bookType: 'csv', type: 'buffer' });
                res.attachment('participant_list.csv');
                res.send(buffer);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.EventController = EventController;
