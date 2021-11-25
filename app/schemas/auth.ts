import { IsString, Matches } from 'class-validator';

export class Auth {
  @IsString()
  @Matches(/^[a-z0-9]+(?!.*(?:\+{2,}|-{2,}|\.{2,}))(?:[.+-]?[a-z0-9])*@wolox\.com$/gim, {
    message: 'email or password are invalid'
  })
  email: string;

  @Matches(/^[a-zA-Z0-9áéíóú]\S{7,}$/g, { message: 'email or password are invalid' })
  password: string;
}
