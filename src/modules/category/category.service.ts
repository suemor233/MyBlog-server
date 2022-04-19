import {ConflictException, Injectable} from '@nestjs/common';

import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CategoriesEntity} from "~/modules/category/entities/category.entity";
import {CategoryDto} from "~/modules/category/category.dto";
import {ArticleEntity} from "~/modules/article/entities/article.entity";

@Injectable()
export class CategoryService {
    @InjectRepository(CategoriesEntity)
    private readonly categoriesEntityRepository: Repository<CategoriesEntity>
    @InjectRepository(ArticleEntity)
    private readonly articleEntityRepository: Repository<ArticleEntity>

    async create(categoryDto: CategoryDto) {
        const category = await this.categoriesEntityRepository.findOne({where: {name: categoryDto.name}})
        if (category) {
            throw new ConflictException('分类已经存在')
        }

        return this.categoriesEntityRepository.save(categoryDto)
    }

    async getAllCategories() {
        const categories = await this.categoriesEntityRepository.find()
        await Promise.all(categories.map(async category => {
            const article = await this.articleEntityRepository.find({where: {category}})
            // @ts-ignore
            category.count = article.length
        }))
        return categories
    }

    async deleteCategoryById(id: string) {
        const category = await this.categoriesEntityRepository.findOne({where: {id}})
        const article = await this.articleEntityRepository.find({where: {category}})
        if (article){
            throw new ConflictException('分类下有文章，不能删除')
        }

        return this.categoriesEntityRepository.delete({id})
    }

    async updateCategoryById(id: string, categoryDto: CategoryDto) {
        const category = await this.categoriesEntityRepository.findOne({where: {id}})
        console.log(category)
        if (!category) {
            throw new ConflictException('分类不存在')
        }

        category.name = categoryDto.name

        return this.categoriesEntityRepository.save(category)
    }

    async findArticleByName(name: string) {
        const category = await this.categoriesEntityRepository.findOne({where: {name}})
        if (!category) {
            throw new ConflictException('分类不存在')
        }
        return category
    }
}
