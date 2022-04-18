import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor, UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import {LoginDto, UserDto, UserPatchDto} from "~/modules/user/user.dto";
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("用户")
@Controller(['user'])
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() userDto: UserDto) {
    return this.userService.register(userDto)
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() userDto: LoginDto) {
    return await this.userService.login(userDto)
  }

  @ApiOperation({ summary: '判断用户是否有token' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('check_logged')
  checkLogined() {
    return;
  }

  @Get()
  @ApiOperation({ summary: '获取主人信息' })
  @UseInterceptors(ClassSerializerInterceptor)
  async getMasterInfo() {
    return await this.userService.getUserInfo()
  }
}
