import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { ArticleModule } from './modules/article/article.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [UserModule, ArticleModule,TypeOrmModule.forRoot()],
  controllers: [AppController]
})
export class AppModule {}
