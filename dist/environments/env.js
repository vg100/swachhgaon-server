"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentVariables = void 0;
const prod_env_1 = require("./prod.env");
const dev_env_1 = require("./dev.env");
function getEnvironmentVariables() {
    const isProduction = true;
    if (isProduction) {
        console.log("prod env..");
        return prod_env_1.ProdEnvironment;
    }
    else {
        console.log("Dev env..");
        return dev_env_1.DevEnvironment;
    }
}
exports.getEnvironmentVariables = getEnvironmentVariables;
