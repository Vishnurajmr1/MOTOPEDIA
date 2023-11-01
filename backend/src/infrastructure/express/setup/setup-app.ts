import { Application } from "express";
export const setUpApp=(app:any):void=>{
    app.set('trust proxy',1);
}