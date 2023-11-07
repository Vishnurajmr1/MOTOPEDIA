import User from '../schemas/users';
import { BcryptAdapter } from '~/common/adapters/security/bcrypt-adpater';
const bcryptAdapter = new BcryptAdapter();

export async function seed(): Promise<void> {
    //Deletes All existing entries
    await User.deleteMany({});

    const adminPassword = bcryptAdapter.hash('admin');

    await User.create([{
        first_name: 'admin',
        last_name: 'admin',
        email: 'admin@gmail.com',
        password_hash: adminPassword,
    }]);
}
