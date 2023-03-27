import * as mongoose from 'mongoose';
import {model} from 'mongoose';


const attendanceSchema = new mongoose.Schema({
    created_at: {type: Date, required: true},
    updated_at: {type: Date, required: true},
    event_id:{type: mongoose.Types.ObjectId, required: true},
    name: {type: String, required: true},
    village:{type: String, required: true},
    deignation:{type: String, required: true},
    phone_no:{type: Number, required: true},
    gender:{type: String, required: true},
});


export default model('participants', attendanceSchema);