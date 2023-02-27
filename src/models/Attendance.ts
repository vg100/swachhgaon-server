import * as mongoose from 'mongoose';
import {model} from 'mongoose';


const attendanceSchema = new mongoose.Schema({
    created_at: {type: Date, required: true},
    updated_at: {type: Date, required: true},
    name: {type: String, required: true},
    age:{type: Number, required: true},
    phone_no:{type: Number, required: true},
    gender:{type: String, required: true},
});


export default model('attendances', attendanceSchema);