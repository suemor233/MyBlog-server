import {ConflictException, Injectable} from '@nestjs/common';

import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CategoriesEntity} from "~/modules/category/entities/category.entity";
import {CategoryDto} from "~/modules/category/category.dto";

@Injectable()
export class CategoryService {
  @InjectRepository(CategoriesEntity)
  private readonly categoriesEntityRepository: Repository<CategoriesEntity>
  async create(categoryDto: CategoryDto) {
    const category = await this.categoriesEntityRepository.findOne({where:{name:categoryDto.name}})
    if (category){
      throw new ConflictException('分类已经存在')
    }

    return this.categoriesEntityRepository.save(categoryDto)
  }

  async getAllCategories() {
    return this.categoriesEntityRepository.find()
  }

  async deleteCategoryById(id: string) {
    return this.categoriesEntityRepository.delete({id})
  }

  async updateCategoryById(id: string, categoryDto: CategoryDto) {
    const category = await this.categoriesEntityRepository.findOne({where:{id}})
    console.log(category)
    if (!category){
      throw new ConflictException('分类不存在')
    }

    category.name = categoryDto.name

    return this.categoriesEntityRepository.save(category)
  }

  async findArticleByName(name: string) {
    const category = await this.categoriesEntityRepository.findOne({where:{name}})
    if (!category){
      throw new ConflictException('分类不存在')
    }
    return category
  }
}
