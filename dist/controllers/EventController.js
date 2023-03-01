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
class EventController {
    static addNewEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = [];
            req.files.forEach((file) => {
                files.push(file.path);
            });
            const data = Object.assign(Object.assign({}, req.body), { type_of_training: req.body.training_type, no_of_participant: req.body.no_participant, no_of_males: req.body.male, no_of_females: req.body.female, user_id: req.user.user_id, files: files });
            let user = yield new Event_1.default(data).save();
            res.send(user);
        });
    }
    static getAllEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUser = req.user.role === "USER" ? { user_id: req.user.user_id } : {};
            try {
                const events = yield Event_1.default.find(isUser).populate('attendances');
                res.json(events);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.EventController = EventController;
