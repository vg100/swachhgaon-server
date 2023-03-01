import * as mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    created_at: Date;
    updated_at: Date;
    user_id: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    files: any[];
    attendances: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    }[];
    location?: string;
    report?: string;
    eventname?: string;
    type_of_training?: string;
    startDate?: Date;
    endDate?: Date;
    no_of_participant?: number;
    no_of_males?: number;
    no_of_females?: number;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    created_at: Date;
    updated_at: Date;
    user_id: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    files: any[];
    attendances: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    }[];
    location?: string;
    report?: string;
    eventname?: string;
    type_of_training?: string;
    startDate?: Date;
    endDate?: Date;
    no_of_participant?: number;
    no_of_males?: number;
    no_of_females?: number;
}>>;
export default _default;
