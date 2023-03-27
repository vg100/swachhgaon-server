"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
var Roles;
(function (Roles) {
    Roles["USER"] = "USER";
    Roles["ADMIN"] = "ADMIN";
})(Roles = exports.Roles || (exports.Roles = {}));
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordView: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    role: { type: String, enum: Object.keys(Roles), default: Roles.USER },
    phone_no: { type: Number },
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
});
exports.default = (0, mongoose_1.model)('users', userSchema);
