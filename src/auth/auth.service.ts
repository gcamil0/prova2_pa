import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private userClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, senha: string): Promise<any> {
    const user = await firstValueFrom(
      this.userClient.send({ cmd: 'find_one_user' }, email),
    );

    if (!user || user.senha !== senha) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, nome: user.nome };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
