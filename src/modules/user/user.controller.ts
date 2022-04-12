import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from "~/modules/user/user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags("用户")
@Controller(['master', 'user'])
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() userDto: UserDto) {
    return this.userService.register(userDto)
  }



}
