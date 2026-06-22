import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  create_user(user: UserDTO) {
    return this.userService.create_user(user);
  }

  @MessagePattern({ cmd: 'find_all_users' })
  find_all() {
    return this.userService.find_all();
  }

  @MessagePattern({ cmd: 'find_one_user' })
  find_one(email: string) {
    return this.userService.find_one(email);
  }
}
