import { Injectable } from '@nestjs/common';
import { UserDto } from "~/modules/user/user.dto";
import { encryptPassword, makeSalt } from "~/utils/validator/cryptogram.util";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "~/modules/user/entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ){}

  register(userDto: UserDto) {
    const { password } = userDto;
    const salt = makeSalt(); // 制作密码盐
    const hashPassword = encryptPassword(password, salt);  // 加密密码
    const userEntity=  new UserEntity()
    Object.assign(userEntity,JSON.parse(JSON.stringify(userDto)))
    userEntity.password = hashPassword
    userEntity.salt = salt
    return this.userRepository.save(userEntity)

  }
}
