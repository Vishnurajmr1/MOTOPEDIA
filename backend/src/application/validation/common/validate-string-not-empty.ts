import { RequestValidationError } from "~/application/errors/request-validation-error";
import { ValidationComposite } from "~/application/ports/validation/validation-composite";

export class ValidationStringNotEmpty extends ValidationComposite<string>{
    async validate(string: string): Promise<void> | never {
        if(typeof string !='string' ||!string){
            throw new RequestValidationError('Expected a string with a value');
        }
    }
}