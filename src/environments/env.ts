import {ProdEnvironment} from './prod.env';
import {DevEnvironment} from './dev.env';

export interface Environment {
    db_url: string,
    jwt_secret: string,
    path: string
}

export function getEnvironmentVariables() {

    const isProduction=true;
    if (isProduction) {
        return ProdEnvironment;
    } else {
        console.log("Dev env..");
        return DevEnvironment;
    }
}
