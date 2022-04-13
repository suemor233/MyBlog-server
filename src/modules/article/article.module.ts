import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArticleEntity} from "~/modules/article/entities/article.entity";
import {CategoriesEntity} from "~/modules/article/entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity,CategoriesEntity])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
