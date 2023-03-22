import * as mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    name: string;
    created_at: Date;
    gender: string;
    phone_no: number;
    updated_at: Date;
    event_id: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    village: string;
    deignation: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    created_at: Date;
    gender: string;
    phone_no: number;
    updated_at: Date;
    event_id: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    village: string;
    deignation: string;
}>>;
export default _default;
