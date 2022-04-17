import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Query} from '@nestjs/common';
import { ArticleService } from './article.service';
import {ArticleInfoDto} from "~/modules/article/article.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import {LoginDto} from "~/modules/user/user.dto";

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

  @Get(':id')
  findArticleById(@Param('id') id: string) {
    return this.articleService.findArticleById(id);
  }

  @Get()
  async findArticleByPage(@Query('pageNum') pageNum:number,@Query('pageSize')pageSize:number) {
    return this.articleService.findArticleByPage(pageNum,pageSize);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  deletePost(@Param('id') id: string) {
    return this.articleService.deleteArticleById(id);
  }

  @Post('delete')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async deletePosts(@Body()ids:string[]) {
    return this.articleService.deleteArticles(ids)
  }


  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async update(@Param('id') id:string, @Body() articleInfoDto: ArticleInfoDto) {
    return this.articleService.updateArticleById(id,articleInfoDto)
  }

}
