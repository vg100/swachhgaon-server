
import Event from "../models/Event";
import Attendance from "../models/Attendance";
const XLSX = require('xlsx');
export class EventController {

    static async addNewEvents(req, res, next) {
        const usr:any=req.user
        const role=usr.role
        const userId=req.params.userId
        var data
if(role==='USER'){
 data={
    ...req.body,
    no_of_participant:req.body.no_participant,
    user_id:req.user.user_id,
}
}else{
  data={
    ...req.body,
    no_of_participant:req.body.no_participant,
    user_id:userId,
}
}
        let user = await new Event(data).save();
        res.json({ message: 'Event created successfully' });
       
 }
 static async getAllEvents(req, res, next) {

    try {

 var   events
if(req.user.role==="ADMIN"){
  events = await Event.find({user_id:req.query.userId}).populate('attendances')
}
if(req.user.role==="USER"){
  events = await Event.find({user_id:req.user.user_id}).populate('attendances')
}     

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

  static async importEvent(req, res, next) {
    try {
      const wb = XLSX.readFile(req.files[0].path); 
      const sheets = wb.SheetNames;
      if(sheets.length > 0) {
          const data = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
          const movies = data.map(row => ({
            user_id:row['User Id'],
            eventname: row['Event Name'],
            type_of_training: row['Training Type'],
            location:row['Location'],
            startDate: row['Start Date'],
            endDate: row['End Date'],
            no_of_participant:row['Participant'],
            no_of_males:row['Male'],
            no_of_females:row['Female'],
            report:row["Report"]
          }))
          await Event.insertMany(movies); 
         
      }
      res.send({
        massage:"Done"
      })
    } catch (e) {
        next(e);
    }
  }

  static async exportEvent(req, res, next) {
 
    try {
      
      const events: any = await Event.find()
      const data=events.map(event=>{
        return [event.eventname,event.district,event.block,event.gp,event.venue,event.no_of_participant
        ]
      })
      const workBook = XLSX.utils.book_new();
      const workSheetData=[
        ["Event Name","District","Block","GP","Venue","Participant"],
        ...data
      ]
      //  const workSheet = XLSX.utils.json_to_sheet(events);
   const workSheet= XLSX.utils.aoa_to_sheet(workSheetData,{ origin: "A1" });
     
      XLSX.utils.book_append_sheet(workBook,workSheet,'Event');
          const buffer = XLSX.write(workBook, { bookType: 'csv', type: 'buffer' }); 
    res.attachment('event_list.csv');
    res.send(buffer);
    } catch (e) {
        next(e);
    }
  }

  static async finalSubmit(req, res, next) {
    const event=req?.event?._id
    try {
        const files=[]
        req.files.forEach((file)=>{
          files.push(file.path)
        })
        
       await Event.findOneAndUpdate({_id:event}, {
        isDone:req.body.isDone,
        files:[...req?.event.files,...files]
    },
        {new: true});
        res.json({ message: 'submit successfully' });
    } catch (e) {
        next(e);
    }

  }


  static async exportParticipantList(req, res, next) {
    try {
      
      const participants: any = await Attendance.find({event_id:req.query.id})
      const data=participants.map(participants=>{
        return [participants.name,participants.village,participants.deignation,participants.phone_no,participants.gender,
        ]
      })
      const workBook = XLSX.utils.book_new();
      const workSheetData=[
        ["Name","Village","Deignation","Phone no","Gender"],
        ...data
      ]
      //  const workSheet = XLSX.utils.json_to_sheet(events);
   const workSheet= XLSX.utils.aoa_to_sheet(workSheetData,{ origin: "A1" });
     
      XLSX.utils.book_append_sheet(workBook,workSheet,'Event');
          const buffer = XLSX.write(workBook, { bookType: 'csv', type: 'buffer' }); 
    res.attachment('participant_list.csv');
    res.send(buffer);
    } catch (e) {
        next(e);
    }
  }




}