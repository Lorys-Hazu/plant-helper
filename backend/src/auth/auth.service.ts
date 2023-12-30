import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly db: DatabaseService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.db.user.findUnique({ where: { email } });
    if (user && bcrypt.compareSync(pass, user.password)) {
      return { ...user, password: undefined }; // Clean the password before return
    }
    return null;
  }
}
