import { DefaultApplicationError } from "~/application/errors/default-application-error";
import { Controller } from "~/application/ports/controllers/controller";
import { NextFunction,Request,Response, request } from "express";

export const expressRouteAdapter=<T>(controller:Controller<T>)=>{
    return async (request:Request,response:Response,next:NextFunction)=>{
        return Promise.resolve(
            controller.handleRequest({
                query:request.query,
                params:request.params,
                body:request.body,
                headers:request.headers
            })
        )
        .then((controllerResponse)=>{
            response.status(controllerResponse.statusCode)
            .json(controllerResponse.body);
            return next();
        })
        .catch((error:DefaultApplicationError)=>{
            return next(error);
        })
    }
}