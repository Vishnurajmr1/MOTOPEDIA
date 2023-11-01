import { Express,Request,Response,NextFunction } from "express";
import express from 'express';
import { DefaultApplicationError } from "application/errors/default-application-error";

export const setUpAsyncErrors=(app:any):void=>{
    app.use((error:Error,req:Request,res:Response,next:NextFunction)=>{
        if(!error){
            return next();
        }
        if(process.env.DEBUG==='1'){
            console.error(error); 
        }
        if(!(error instanceof DefaultApplicationError)){
            return res.status(500).json({
                error:error.name,
                message:'Something went wrong',
                statusCode:500,
                messages:['Something went wrong']
            })
        }
        return res.status(error.statusCode).json({
            error: error.name,
            message: error.message,
            statusCode: error.statusCode,
            messages: error.messages,
          });
    })
}