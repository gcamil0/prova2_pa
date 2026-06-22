import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { UserDTO } from '../user/user.dto';

@ApiTags('user')
@Controller('user')
export class UserGatewayController {
  constructor(@Inject('USER_SERVICE') private userClient: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  async create_user(@Body() userDto: UserDTO) {
    const result = await firstValueFrom(
      this.userClient.send({ cmd: 'create_user' }, userDto),
    );

    if (result?.error) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários cadastrados' })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  async find_all() {
    return firstValueFrom(this.userClient.send({ cmd: 'find_all_users' }, {}));
  }
}
