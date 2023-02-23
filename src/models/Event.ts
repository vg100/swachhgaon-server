import * as mongoose from 'mongoose';
import {model} from 'mongoose';

const eventSchema = new mongoose.Schema({
    user_id: {type: mongoose.Types.ObjectId, required: true},
    supervisor: {type: String},
    type_of_training: {type: String},
    location:{type: String},
    files:{type:Array},
    startDate:{type: Date},
    endDate:{type: Date},
    no_of_participant: {type: Number},
    no_of_males:{type: Number},
    no_of_females:{type: Number},
    created_at: {type: Date, required: true, default: new Date()},
    updated_at: {type: Date, required: true, default: new Date()},
});
export default model('event', eventSchema);
