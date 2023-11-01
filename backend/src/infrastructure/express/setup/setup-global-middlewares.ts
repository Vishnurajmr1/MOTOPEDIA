import { Application,json } from "express";
import helmet from 'helmet';

export const setupGlobalMiddlewares=(app:any):void=>{
    app.use(helmet());
    app.use(json());
}