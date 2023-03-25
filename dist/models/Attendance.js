"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const attendanceSchema = new mongoose.Schema({
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    event_id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    village: { type: String, required: true },
    deignation: { type: String, required: true },
    phone_no: { type: Number, required: true },
    gender: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)('attendances', attendanceSchema);
