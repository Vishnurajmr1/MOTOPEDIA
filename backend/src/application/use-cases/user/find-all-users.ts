import { FindAllUsersRepository } from 'application/ports/repositories/user/find-all-users-repository';
import { ValidationComposite } from 'application/ports/validation/validation-composite';
import { User } from 'domain/models/user/user';
import { FindAllUsersRequestModel, FindAllUsersUseCase } from 'domain/use-cases/user/find-all-users-use-case';

export class FindAllUsers implements FindAllUsersUseCase {
    constructor(
        private readonly findAllUsersRepository: FindAllUsersRepository,
        private readonly validation: ValidationComposite<FindAllUsersRequestModel>,
    ) {}
    async findAll(request?: FindAllUsersRequestModel): Promise<User[]> | never {
        let order: 'desc' | 'asc' = 'desc';
        let limit = 100;
        let skip = 0;

        if (request) {
            if (request.order) order = request.order;
            if (request.limit) limit = request.limit;
            if (request.skip) skip = request.skip;
        }

        await this.validation.validate({ order, limit, skip });
        const users = await this.findAllUsersRepository.find(order, limit, skip);
        return users;
    }
}
