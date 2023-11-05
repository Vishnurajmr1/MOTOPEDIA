import { Controller } from '~/application/ports/controllers/controller';
import { RequestModel } from '~/application/ports/requests/request-model';
import { ResponseHandler } from '~/application/ports/responses/response-handler';
import { User } from '~/domain/models/user/user';
import { FindAllUsersUseCase } from '~/domain/use-cases/user/find-all-users-use-case';

type FindAllUsersRequestModel = RequestModel<
    void,
    void,
    {
        order?: 'desc' | 'asc';
        limit?: number;
        skip?: number;
    }
>;

export class FindAllUsersController implements Controller<User[] | never> {
    constructor(
        private readonly findAllUsersUseCase: FindAllUsersUseCase,
        private readonly findAllUsersPresenter: ResponseHandler<User[]>,
    ) {}
    async handleRequest(requestModel?: FindAllUsersRequestModel) {
        let query: FindAllUsersRequestModel['query'];

        if (requestModel && requestModel.query) {
            query = requestModel.query;
        }

        const users = await this.findAllUsersUseCase.findAll(query);
        return this.findAllUsersPresenter.response(users);
    }
}
