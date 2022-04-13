import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArticleEntity} from "~/modules/article/entities/article.entity";
import {CategoriesEntity} from "~/modules/category/entities/category.entity";
import {CategoryService} from "~/modules/category/category.service";

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity,CategoriesEntity])],
  controllers: [ArticleController],
  providers: [ArticleService,CategoryService]
})
export class ArticleModule {}
