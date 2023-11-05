import { Application } from "express";
export const setUpApp=(app:Application):void=>{
    app.set('trust proxy',1);
}