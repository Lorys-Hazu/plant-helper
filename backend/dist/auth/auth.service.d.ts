import { DatabaseService } from 'src/database/database.service';
export declare class AuthService {
    private readonly db;
    constructor(db: DatabaseService);
    hashPassword(password: string): Promise<string>;
    validateUser(email: string, pass: string): Promise<any>;
}
