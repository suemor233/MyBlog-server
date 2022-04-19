import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoriesEntity} from "~/modules/category/entities/category.entity";
import {ArticleEntity} from "~/modules/article/entities/article.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity,ArticleEntity])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
