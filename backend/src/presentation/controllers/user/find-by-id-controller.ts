import { RequestValidationError } from 'application/errors/request-validation-error';
import { Controller } from 'application/ports/controllers/controller';
import { RequestModel } from 'application/ports/requests/request-model';
import { ResponseHandler } from 'application/ports/responses/response-handler';
import { User } from 'domain/models/user/user';
import { FindUserByIdUseCase } from 'domain/use-cases/user/find-user-by-id-use-case';

export class FindUserByIdController implements Controller<User | never> {
    constructor(
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
        private readonly presenter: ResponseHandler<User>,
    ) {}
    async handleRequest(requestModel: RequestModel<void, { id: string }>) {
        if (!requestModel || !requestModel.params || !requestModel.params.id) {
            throw new RequestValidationError('Missing params');
        }
        const { id } = requestModel.params;
        const user = await this.findUserByIdUseCase.findById(id);
        return await this.presenter.response(user);
    }
}
