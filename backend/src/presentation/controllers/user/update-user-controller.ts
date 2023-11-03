import { RequestValidationError } from 'application/errors/request-validation-error';
import { Controller } from 'application/ports/controllers/controller';
import { RequestModel } from 'application/ports/requests/request-model';
import { ResponseHandler } from 'application/ports/responses/response-handler';
import { ResponseModel } from 'application/ports/responses/response-model';
import { genericStringSanitizerSingleton } from 'common/adapters/generic/generic_string_adapter';
import { objectKeyExists } from 'common/helpers/objects/object-key-exists';
import { removeObjectEmptyKeys } from 'common/helpers/objects/remove-object-empty-keys';
import { UpdateUserRequestModelParams, UserRequestPartialFields } from 'domain/models/user/user-request-partial-fields';
import { UpdateUserUseCase } from 'domain/use-cases/user/update-user-use-case';

type RequestType = RequestModel<UserRequestPartialFields, UpdateUserRequestModelParams>;

type ResponseType = Promise<ResponseModel<void | never>>;

export class UpdateUserController implements Controller<void | never> {
    constructor(
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly presenter: ResponseHandler<void>,
    ) {}
    async handleRequest(requestModel: RequestType) {
        if (
            !objectKeyExists(requestModel, 'body') ||
            !objectKeyExists(requestModel, 'params') ||
            !objectKeyExists(requestModel.params, 'id')
        ) {
            throw new RequestValidationError('Invalid Request');
        }

        const { id } = requestModel.params;
        const { body } = requestModel;

        const sanitizedBody = {
            email: this.sanitize(body.email),
            firt_name: this.sanitize(body.first_name),
            last_name: this.sanitize(body.last_name),
            password: this.sanitize(body.password),
            confirmPassword: this.sanitize(body.confirmPassword),
        };

        await this.updateUserUseCase.update(id, removeObjectEmptyKeys(sanitizedBody));
        return await this.presenter.response();
    }
    private sanitize(value: any): string | undefined {
        if (!value) {
            return;
        }

        return genericStringSanitizerSingleton.sanitize(value);
    }
}
