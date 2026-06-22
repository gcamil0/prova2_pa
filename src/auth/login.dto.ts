import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ example: 'maria@email.com' })
  email!: string;

  @ApiProperty({ example: 'minhaSenha123' })
  senha!: string;
}
