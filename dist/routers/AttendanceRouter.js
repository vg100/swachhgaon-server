"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AttendanceController_1 = require("../controllers/AttendanceController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const AttendanceValidator_1 = require("../validators/AttendanceValidator");
class AttendanceRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        // this.router.get('/',GlobalMiddleWare.authenticate,AttendanceController.getAllUser);
    }
    postRoutes() {
        this.router.post('/add/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, AttendanceValidator_1.AttendanceValidators.addAttendance(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AttendanceController_1.AttendanceController.add);
    }
    patchRoutes() {
    }
    deleteRoutes() {
    }
}
exports.default = new AttendanceRouter().router;
