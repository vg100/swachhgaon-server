import {ProdEnvironment} from './prod.env';
import {DevEnvironment} from './dev.env';

export interface Environment {
    db_url: string,
    jwt_secret: string,
    uploadPath: string
}

export function getEnvironmentVariables() {
    if (process.env.NODE_ENV === 'production') {
        console.log("Producttion env..");
        return ProdEnvironment;
    } else {
        console.log("Dev env..");
        return DevEnvironment;
    }
}
