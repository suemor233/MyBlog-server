import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

import { IsAllowedUrl } from '~/utils/validator/isAllowedUrl'

class UserOptionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '我是练习时长两年半的个人练习生' })
  readonly introduce?: string

  @ApiProperty({ required: false, example: 'example@example.com' })
  @IsEmail()
  @IsOptional()
  readonly email?: string

  @ApiProperty({ required: false ,example: 'http://example.com' })
  @IsAllowedUrl()
  @IsOptional()
  readonly avatar?: string

  @ApiProperty({ required: false ,example: 'http://example.com' })
  @IsAllowedUrl()
  @IsOptional()
  readonly github?: string


  @ApiProperty({ required: false ,example: 'http://example.com' })
  @IsAllowedUrl()
  @IsOptional()
  readonly twitter?: string

  readonly salt?: string
}

export class UserDto extends UserOptionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: '用户名？' })
  readonly username: string

  @IsString()
  @ApiProperty()
  @IsNotEmpty({ message: '密码？' })
  password: string
}

export class LoginDto {
  @ApiProperty({ required: true })
  @IsString({ message: '用户名？' })
  readonly username: string

  @ApiProperty({ required: true })
  @IsString({ message: '密码？' })
  readonly password: string
}

export class UserPatchDto extends UserOptionDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly username: string

  @IsString()
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  readonly password: string
}
