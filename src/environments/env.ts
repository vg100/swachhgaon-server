import {ProdEnvironment} from './prod.env';
import {DevEnvironment} from './dev.env';

export interface Environment {
    db_url: string,
    jwt_secret: string,
    path: string
}

export function getEnvironmentVariables() {

    const isProduction=false;
    if (isProduction) {
        console.log("prod env..");
        return ProdEnvironment;
    } else {
        console.log("Dev env..");
        return DevEnvironment;
    }
}
