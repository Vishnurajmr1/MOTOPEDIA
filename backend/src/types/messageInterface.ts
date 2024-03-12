interface FileSchema {
    key: string;
    name: string;
    url?: string;
}
export interface IaddMessage{
    sender?:string;
    content?:string;
    attachments?:any[]
    chat?:string;
}