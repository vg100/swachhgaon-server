import * as express from 'express';
import {getEnvironmentVariables} from './environments/env';
import * as mongoose from 'mongoose';
import * as cloudinary from 'cloudinary';
import UserRouter from './routers/UserRouter';
import bodyParser = require('body-parser');
import * as cors from 'cors';
import EventRouter from './routers/EventRouter';

export class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
        // this.enableCors();
       
    }

    setConfigurations() {
        this.connectMongoDb();
        this.configureBodyParser();
        // this.cloudinaryConfig()
    }

    connectMongoDb() {
        const databaseUrl = getEnvironmentVariables().db_url;
        mongoose.set('strictQuery', false);
        mongoose.connect(databaseUrl).then(() => {
            console.log('connected to database');
        });
    }

    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json())
        this.app.use(express.json());
        this.app.use(express.urlencoded({
         extended: true,
         })
        );
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
        this.app.use('/src/uploads', express.static('src/uploads'));
        this.app.use('/api/user', UserRouter);
        this.app.use('/api/event',EventRouter)
       
    }

    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                status_code: 404
            });
        })
    }

    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something Went Wrong. Please Try Again',
                status_code: errorStatus
            })
        })
    }
}
