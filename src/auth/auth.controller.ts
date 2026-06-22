import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Autentica o usuário e retorna um JWT' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso, retorna access_token' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  signIn(@Body() loginDto: LoginDTO) {
    return this.authService.signIn(loginDto.email, loginDto.senha);
  }
}
