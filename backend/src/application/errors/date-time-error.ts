import { DefaultApplicationError } from "./default-application-error";

export class DateTimeError extends DefaultApplicationError{
    statusCode=500;
    name='DateTimeError';
}