"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const env_1 = require("./environments/env");
const mongoose = require("mongoose");
const UserRouter_1 = require("./routers/UserRouter");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const EventRouter_1 = require("./routers/EventRouter");
const HealthCheck_1 = require("./routers/HealthCheck");
const AttendanceRouter_1 = require("./routers/AttendanceRouter");
class Server {
    constructor() {
        this.app = express();
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
        // this.enableCors();
    }
    setConfigurations() {
        console.log("Inside setConfig");
        this.connectMongoDb();
        this.configureBodyParser();
        this.conectLog();
        // this.cloudinaryConfig()
    }
    conectLog() {
        morgan.format('myFormat', '[:date[clf]] ":method :url" :status :res[content-length] - :response-time ms');
        this.app.use(morgan('tiny'));
    }
    connectMongoDb() {
        const databaseUrl = (0, env_1.getEnvironmentVariables)().db_url;
        mongoose.set('strictQuery', false);
        mongoose.connect(databaseUrl).then(() => {
            console.log('connected to database');
        });
    }
    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true,
        }));
    }
    //     cloudinaryConfig(){
    //  cloudinary.v2.config({
    //             cloud_name: "dolgighf6",
    //             api_key: "386896122555724",
    //             api_secret: "dP7hXraE8ORpPsIc5Q6Kder9G10"
    //           })
    //           console.log("cloudinary connected")
    //     }
    // enableCors(){
    //     this.app.use(cors( {
    //         allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
    //         credentials: true,
    //         methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    //         origin: '*',
    //         preflightContinue: false
    //     }));
    // }
    setRoutes() {
        this.app.use(`/api/dist/uploads`, express.static(`dist/uploads`));
        this.app.use('/api/user', UserRouter_1.default);
        this.app.use('/api/attendance', AttendanceRouter_1.default);
        this.app.use('/api/event', EventRouter_1.default);
        this.app.use('/api/health', HealthCheck_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                status_code: 404
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something Went Wrong. Please Try Again',
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;
