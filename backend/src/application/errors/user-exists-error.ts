import { DefaultApplicationError } from "./default-application-error";

export class UserExistError extends DefaultApplicationError{
    statusCode=409;
    name='UserExistsError';
}