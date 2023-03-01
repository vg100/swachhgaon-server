import * as mongoose from 'mongoose';
export declare enum Roles {
    USER = "USER",
    ADMIN = "ADMIN"
}
declare const _default: mongoose.Model<{
    name: string;
    role: string;
    created_at: Date;
    email: string;
    password: string;
    passwordView: string;
    gender: string;
    updated_at: Date;
    phone_no?: number;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    role: string;
    created_at: Date;
    email: string;
    password: string;
    passwordView: string;
    gender: string;
    updated_at: Date;
    phone_no?: number;
}>>;
export default _default;
