import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private user: typeof User) {}

  create_user(user: UserDTO) {
    return this.user.create({
      nome: user.nome,
      email: user.email,
      senha: user.senha,
    });
  }

  find_all() {
    return this.user.findAll();
  }

  find_one(email: string) {
    return this.user.findOne({ where: { email } });
  }
}
