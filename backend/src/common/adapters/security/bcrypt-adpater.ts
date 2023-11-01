import bcrypt from 'bcrypt';
import { PasswordHashing } from '~/application/ports/security/password-hashing';


export class BcryptAdapter implements PasswordHashing{
    private readonly saltRounds=10;

    async hash(password: string): Promise<string> {
        const passwordHash=await bcrypt.hash(password,this.saltRounds);
        return passwordHash;
    }

    async compare(password: string, hash: string): Promise<boolean> {
        const valid=bcrypt.compare(password,hash);
        return valid;
    }
}