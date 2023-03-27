export declare class EventController {
    static addNewEvents(req: any, res: any, next: any): Promise<void>;
    static getAllEvents(req: any, res: any, next: any): Promise<void>;
    static updateEvent(req: any, res: any, next: any): Promise<void>;
    static deleteFile(req: any, res: any, next: any): Promise<void>;
    static importEvent(req: any, res: any, next: any): Promise<void>;
    static exportEvent(req: any, res: any, next: any): Promise<void>;
    static finalSubmit(req: any, res: any, next: any): Promise<void>;
    static exportParticipantList(req: any, res: any, next: any): Promise<void>;
}
