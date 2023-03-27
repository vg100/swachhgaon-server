"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const UserValidators_1 = require("../validators/UserValidators");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/', (0, GlobalMiddleWare_1.authorizeRoles)(["ADMIN", "USER"]), UserController_1.UserController.getAllUser);
    }
    postRoutes() {
        this.router.post('/signup', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, UserController_1.UserController.signUp);
        this.router.post('/login', UserValidators_1.UserValidators.login(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.login);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserValidators_1.UserValidators.editUser(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.updateUser);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, UserValidators_1.UserValidators.deleteUser(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.deleteUser);
    }
}
exports.default = new UserRouter().router;
