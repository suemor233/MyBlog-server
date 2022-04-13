import {Injectable, ConflictException, NotFoundException} from "@nestjs/common";
import {LoginDto, UserDto, UserPatchDto} from "~/modules/user/user.dto";
import { encryptPassword, makeSalt } from "~/utils/validator/cryptogram.util";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "~/modules/user/entities/user.entity";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {
  }

  async register(userDto: UserDto) {
    const { username, password } = userDto;
    const hasUser = await this.userRepository.findOne({ where: {  } });

    if (hasUser) {
       throw new ConflictException("只能有一个主人");
    }

    const salt = makeSalt(); // 制作密码盐
    const hashPassword = encryptPassword(password, salt);  // 加密密码
    const userEntity = new UserEntity();
    Object.assign(userEntity, JSON.parse(JSON.stringify(userDto)));
    userEntity.password = hashPassword;
    userEntity.salt = salt;

    return this.userRepository.save(userEntity);
  }

  async login(loginDto: LoginDto) {
    const {username, password } = loginDto

    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('用户不存在')
    }
    const { password: dbPassword, salt } = user

    const currentHashPassword = encryptPassword(password, salt)

    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('密码错误')
    }

    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = this.jwtService.sign(payload);


    return {
      ...user,
      token
    }
  }

  async getUserInfo() {
    return this.userRepository.findOne({ where: {  } });
  }
}
