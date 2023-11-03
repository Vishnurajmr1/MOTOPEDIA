import { ResponseHandler } from 'application/ports/responses/response-handler';
import { ResponseModel } from 'application/ports/responses/response-model';

export class GenericDeletedResponse implements ResponseHandler<void>{
    async response(): Promise<ResponseModel<void>> {
        const responseDate = {
            statusCode: 204,
            body: undefined,
        };
        return responseDate;
    }
}
