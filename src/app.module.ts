import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { ArticleModule } from './modules/article/article.module';

@Module({
  imports: [UserModule, ArticleModule],
  controllers: [AppController]
})
export class AppModule {}
