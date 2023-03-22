import * as mongoose from 'mongoose';
import {model} from 'mongoose';

const eventSchema = new mongoose.Schema({
    user_id: {type: mongoose.Types.ObjectId,ref:"users"},
    eventname: {type: String},
    district:{type: String},
    block:{type: String},
    gp:{type: String},
    venue:{type: String},
    files:{type:Array},
    startDate:{type: Date},
    endDate:{type: Date},
    no_of_participant: {type: Number},
    isDone:{type: Boolean,default:false},
    participants:[{type: mongoose.Types.ObjectId, ref: 'participants'}],
    attendances:[{type: mongoose.Types.ObjectId, ref: 'attendances'}],
    report: {type: String},
    created_at: {type: Date, required: true, default: new Date()},
    updated_at: {type: Date, required: true, default: new Date()},
});
export default model('event', eventSchema);
