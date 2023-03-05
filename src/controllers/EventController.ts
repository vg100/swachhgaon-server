import { header } from "express-validator";
import Event from "../models/Event";
const XLSX = require('xlsx');
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
    const isUser=req.user.role==="USER"?{user_id:req.user.user_id}:{}
    try {
        const events: any = await Event.find(isUser).populate('attendances')
        res.json(events);
    } catch (e) {
        next(e);
    }
  }

  static async getEventExcelDownload(req, res, next) {
    try {
        const events: any = await Event.find()
        const workSheet = XLSX.utils.json_to_sheet(events);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
        XLSX.writeFile(workBook, "./temp/sample.xlsx");
        res.json(events);
    } catch (e) {
        next(e);
    }

  }

  static async updateEvent(req, res, next) {
    const event=req?.event?._id
    try {
        const files=[]
        req.files.forEach((file)=>{
          files.push(file.path)
        })
       await Event.findOneAndUpdate({_id: event}, {
        ...req.body,
        type_of_training:req.body.training_type,
        no_of_participant:req.body.no_participant,
        no_of_males:req.body.male,
        no_of_females:req.body.female,
        files:[...req?.event.files,...files]
    },
        {new: true});
        res.json({ message: 'updated successfully' });
    } catch (e) {
        next(e);
    }
  }

  static async deleteFile(req, res, next) {
    const event=req?.event
    const index= req?.params.index
    try {
        event.files.splice(index, 1)
        event.save()
        res.json({ message: 'removed successfully' });
    } catch (e) {
        next(e);
    }
  }



}