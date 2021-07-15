import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IUser } from 'modules/database/interfaces/user';

export class UserValidator implements IUser {
  
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: true, type: 'integer' })
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 50 })
  public firstName: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ required: false, type: 'string', maxLength: 50 })
  public lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(150)
  @ApiProperty({ required: true, type: 'string', maxLength: 150 })
  public email: string;
  
}