import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';

import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ArticleEntity} from "~/modules/article/entities/article.entity";
import {ArticleInfoDto} from "~/modules/article/article.dto";
import {CategoriesEntity} from "~/modules/category/entities/category.entity";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleEntityRepository: Repository<ArticleEntity>,
        @InjectRepository(CategoriesEntity)
        private readonly categoriesEntityRepository: Repository<CategoriesEntity>,
    ) {
    }

    async create(createArticleDto: ArticleInfoDto) {
        let category = await this.categoriesEntityRepository.findOne({where: {name: createArticleDto.category}})
        if (createArticleDto.category === '默认分类' && !category) {
            const categoriesEntity = new CategoriesEntity()
            categoriesEntity.name = '默认分类'
            category = await this.categoriesEntityRepository.save(categoriesEntity)
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
        console.log(id,articleInfoDto)
        const article = await this.findArticleById(id)
        const categories = await this.categoriesEntityRepository.find()

        if (articleInfoDto.category){
            let categoryFlag = false

            categories.map(item =>{
                if (item.name === articleInfoDto.category){
                    article.category = item
                    categoryFlag = true
                    return
                }
            })
            if (!categoryFlag){
                throw new NotFoundException('分类不存在')
            }

        }

        article.title = articleInfoDto.title
        article.content = articleInfoDto.content
        article.cover = articleInfoDto.cover
        article.tags = articleInfoDto.tags.toString()
        article.state = articleInfoDto.state

       return  await this.articleEntityRepository.save(article)
    }

    async findArticleByPage(pageNum: number, pageSize: number) {
        if (pageNum && pageSize){
            let qb = this.articleEntityRepository.createQueryBuilder('article')
            qb = qb.skip(pageSize * (pageNum - 1)).take(pageSize)
            const article = await qb.leftJoinAndSelect('article.category','category').getMany()
            return {
                article,
                'total':article.length,
                'pageNum':pageNum,
                'pageSize':pageSize,
            }
        }else {
            return await this.articleEntityRepository.find({relations: ["category"] })
        }

    }

  async  deleteArticles(ids: string[]) {
      await ids.forEach(id =>{
             this.articleEntityRepository.delete({id})
        })
    }
}
