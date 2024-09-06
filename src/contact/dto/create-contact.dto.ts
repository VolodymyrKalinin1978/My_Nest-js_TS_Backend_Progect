import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly phone: string;
}
