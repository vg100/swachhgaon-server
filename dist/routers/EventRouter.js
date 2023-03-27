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
        this.router.get('/export-event', EventController_1.EventController.exportEvent);
        this.router.get('/export-participant', EventController_1.EventController.exportParticipantList);
    }
    postRoutes() {
        this.router.post('/import-event', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, new Utils_1.Utils().multer.array('file'), EventController_1.EventController.importEvent);
        this.router.post('/add/:userId?', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, EventValidator_1.EventValidators.ceateEvent(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, EventController_1.EventController.addNewEvents);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, EventValidator_1.EventValidators.updateEvent(), new Utils_1.Utils().multer.array('file'), GlobalMiddleWare_1.GlobalMiddleWare.checkError, EventController_1.EventController.updateEvent);
        this.router.patch('/finalsubmit/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, EventValidator_1.EventValidators.finalsubmit(), new Utils_1.Utils().multer.array('file'), GlobalMiddleWare_1.GlobalMiddleWare.checkError, EventController_1.EventController.finalSubmit);
    }
    deleteRoutes() {
        this.router.delete('/remove/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, EventValidator_1.EventValidators.removeEvent(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, EventController_1.EventController.deleteEvent);
        this.router.delete('/deletefile/:id/:index', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, EventValidator_1.EventValidators.deleteFile(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, EventController_1.EventController.deleteFile);
    }
}
exports.default = new EventRouter().router;
