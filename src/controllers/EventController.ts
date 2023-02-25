import { header } from "express-validator";
import Event from "../models/Event";

export class EventController {

    static async addNewEvents(req, res, next) {
        const files=[]
        req.files.forEach((file)=>{
          files.push(file.path)
        })
        const data={
            ...req.body,
            type_of_training:req.body.training_type,
            no_of_participant:req.body.no_participant,
            no_of_males:req.body.male,
            no_of_females:req.body.female,
            user_id:req.user.user_id,
            files:files
        }
        let user = await new Event(data).save();
        res.send(user);
       
 }

 static async getAllEvents(req, res, next) {

    try {
        const events: any = await Event.find({user_id:req.user.user_id})
        res.json(events);
    } catch (e) {
        next(e);
    }
}
}