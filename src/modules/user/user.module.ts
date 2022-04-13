import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "~/modules/user/entities/user.entity";
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from "~/modules/user/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'suemorFw', // 密钥
      signOptions: { expiresIn: '8h' }, // token 过期时效
    }),
  ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy]
})
export class UserModule {}
