import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { ArticleModule } from './modules/article/article.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [UserModule, ArticleModule,TypeOrmModule.forRoot(), CategoryModule],
  controllers: [AppController]
})
export class AppModule {}
