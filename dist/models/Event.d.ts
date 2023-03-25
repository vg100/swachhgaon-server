import * as mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    created_at: Date;
    updated_at: Date;
    files: any[];
    isDone: boolean;
    participants: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    }[];
    attendances: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    }[];
    block?: string;
    report?: string;
    user_id?: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    eventname?: string;
    district?: string;
    gp?: string;
    venue?: string;
    startDate?: Date;
    endDate?: Date;
    no_of_participant?: number;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    created_at: Date;
    updated_at: Date;
    files: any[];
    isDone: boolean;
    participants: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    }[];
    attendances: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    }[];
    block?: string;
    report?: string;
    user_id?: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    eventname?: string;
    district?: string;
    gp?: string;
    venue?: string;
    startDate?: Date;
    endDate?: Date;
    no_of_participant?: number;
}>>;
export default _default;
