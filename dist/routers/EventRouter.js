"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EventController_1 = require("../controllers/EventController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const EventValidator_1 = require("../validators/EventValidator");
class EventRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, EventController_1.EventController.getAllEvents);
    }
    postRoutes() {
        this.router.post('/add', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, EventValidator_1.EventValidators.ceateEvent(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, new Utils_1.Utils().multer.array('file'), EventController_1.EventController.addNewEvents);
    }
    patchRoutes() {
    }
    deleteRoutes() {
    }
}
exports.default = new EventRouter().router;
