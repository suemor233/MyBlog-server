import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { ArticleService } from './article.service';
import {ArticleInfoDto} from "~/modules/article/article.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@Controller('article')
@ApiTags('文章')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  create(@Body() articleInfoDto: ArticleInfoDto) {
    return this.articleService.create(articleInfoDto);
  }

}
