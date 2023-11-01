import { DefaultApplicationError } from "./default-application-error";

export class InternalServerError extends DefaultApplicationError{
    name="InternalServerError";
    statusCode=500;
}