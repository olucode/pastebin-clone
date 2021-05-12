import { User } from '../../users/users.entity';

export class LoginResponse extends User {
  token: string;

  constructor(partial: Partial<LoginResponse>) {
    super();
    Object.assign(this, partial);
  }
}
