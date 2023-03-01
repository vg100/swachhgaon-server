"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    eventname: { type: String },
    type_of_training: { type: String },
    location: { type: String },
    files: { type: Array },
    startDate: { type: Date },
    endDate: { type: Date },
    no_of_participant: { type: Number },
    no_of_males: { type: Number },
    no_of_females: { type: Number },
    attendances: [{ type: mongoose.Types.ObjectId, ref: 'attendances' }],
    report: { type: String },
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
});
exports.default = (0, mongoose_1.model)('event', eventSchema);
