import { NotFoundError } from '~/application/errors/not-found-error';
import { DeleteUserByIdRepository } from '~/application/ports/repositories/user/delete-user-by-id-repository';
import { FindUserByIdRepository } from '~/application/ports/repositories/user/find-user-by-id-repository';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { deleteUserByIdUseCase } from '~/domain/use-cases/user/delete-user-by-id-use-case';

export class deleteUserById implements deleteUserByIdUseCase {
    constructor(
        private readonly deleteUserByRepository: DeleteUserByIdRepository,
        private readonly findUserByIdRepository: FindUserByIdRepository,
        private readonly validation: ValidationComposite,
    ) {}
    async deleteById(id: string): Promise<number> {
        await this.validation.validate(id);
        const user = await this.findUserByIdRepository.findById(id);
        if (!user) {
            throw new NotFoundError('User does not exist');
        }

        const deletedRows = await this.deleteUserByRepository.deleteById(id);
        return deletedRows;
    }
}
