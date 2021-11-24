import { IsString, Matches } from 'class-validator';

export class User {
  @IsString()
  @Matches(/^[a-zA-ZáâäãéêëíîïóôöõúûüūñçčšžÁÂÄÃĆÉÊËÍÎÏÓÔÖÕÚÛÜŪÑßÇ' .]+$/i, {
    message: 'firstName field can only contain alphabetic characters'
  })
  firstName: string;

  @IsString()
  @Matches(/^[a-zA-ZáâäãéêëíîïóôöõúûüūñçčšžÁÂÄÃĆÉÊËÍÎÏÓÔÖÕÚÛÜŪÑßÇ' .]+$/i, {
    message: 'lastName field can only contain alphabetic characters'
  })
  lastName: string;

  @IsString()
  @Matches(/^[a-z0-9]+(?!.*(?:\+{2,}|-{2,}|\.{2,}))(?:[.+-]?[a-z0-9])*@wolox\.com$/gim, {
    message: 'email field is invalid.'
  })
  email: string;

  @Matches(/^[a-zA-Z0-9áéíóú]\S{7,}$/g, { message: 'password field is not valid.' })
  password: string;
}
