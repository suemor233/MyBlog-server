import {
  Controller,
  Get,
  Post,
  Body, Delete, UseGuards, Param, Put
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {CategoryDto} from "~/modules/category/category.dto";
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";

@ApiTags("category")
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建文章分类' })
  create(@Body() categoryDto: CategoryDto) {
    return this.categoryService.create(categoryDto);
  }

  @Get()
  @ApiOperation({ summary: '查询总共的分类' })
  getAllCategories() {
    return this.categoryService.getAllCategories()
  }

  @Get(':name')
  findCategoryByName(@Param('name') name: string) {
    return this.categoryService.findArticleByName(name);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改文章分类' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  updateCategory(@Param('id') id:string, @Body() categoryDto: CategoryDto) {
    return  this.categoryService.updateCategoryById(id, categoryDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '根据id删除分类' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategoryById(id);
  }
}
