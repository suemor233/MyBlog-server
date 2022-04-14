import {ConflictException, Injectable} from '@nestjs/common';

import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ArticleEntity} from "~/modules/article/entities/article.entity";
import {ArticleInfoDto} from "~/modules/article/article.dto";
import {CategoriesEntity} from "~/modules/category/entities/category.entity";
import {CategoryService} from "~/modules/category/category.service";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleEntityRepository: Repository<ArticleEntity>,
        @InjectRepository(CategoriesEntity)
        private readonly categoriesEntityRepository: Repository<CategoriesEntity>,
        private readonly categoryService: CategoryService
    ) {
    }

    async create(createArticleDto: ArticleInfoDto) {
        let category = await this.categoriesEntityRepository.findOne({where: {name: createArticleDto.category}})
        if (createArticleDto.category === '默认分类' && !category) {
            const categoriesEntity = new CategoriesEntity()
            categoriesEntity.name = '默认分类'
            await this.categoriesEntityRepository.save(categoriesEntity)
            category = await this.categoriesEntityRepository.findOne({where: {name: createArticleDto.category}})
        }
        if (!category && createArticleDto.category !== '默认分类') {
            throw new ConflictException('分类不存在')
        }

        const articleEntity = new ArticleEntity()
        Object.assign(articleEntity, createArticleDto)
        articleEntity.category = category
        articleEntity.tags = articleEntity.tags.toString()

        return await this.articleEntityRepository.save(articleEntity)
    }

    async findArticleById(id: string) {
        const article = await this.articleEntityRepository.findOne({where: {id: id}, relations: ['category']})
        if (!article) {
            throw new ConflictException('文章不存在')
        }
        return article
    }

    async deleteArticleById(id: string) {
        await this.findArticleById(id)
        return this.articleEntityRepository.delete({id})
    }

    async updateArticleById(id: string, articleInfoDto: ArticleInfoDto) {
        const article = await this.findArticleById(id)
        const categories = await this.categoriesEntityRepository.find()

        categories.map(item =>{
            if (item.name === articleInfoDto.category){
                article.category = item
            }
        })

        article.title = articleInfoDto.title
        article.content = articleInfoDto.content
        article.cover = articleInfoDto.cover
        article.tags = articleInfoDto.tags.toString()

        await this.articleEntityRepository.save(article)
    }

    async findArticleByPage(pageNum: number, pageSize: number) {
        if (pageNum && pageSize){
            let qb = this.articleEntityRepository.createQueryBuilder()
            qb = qb.skip(pageSize * (pageNum - 1)).take(pageSize)
            const article = await qb.getMany()

            return {
                article,
                'total':article.length,
                'pageNum':pageNum,
                'pageSize':pageSize,
            }
        }else {
            return await this.articleEntityRepository.find()
        }

    }
}
