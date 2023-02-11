import * as express from 'express';
import {getEnvironmentVariables} from './environments/env';
import * as mongoose from 'mongoose';
import UserRouter from './routers/UserRouter';
import bodyParser = require('body-parser');


export class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }

    setConfigurations() {
        this.connectMongoDb();
        this.configureBodyParser();
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
    }

    setRoutes() {
        this.app.use('/src/uploads', express.static('src/uploads'));
        this.app.use('/api/user', UserRouter);
       
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
