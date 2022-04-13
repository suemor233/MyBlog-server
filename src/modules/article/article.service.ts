import {Injectable} from '@nestjs/common';

import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "~/modules/user/entities/user.entity";
import {Repository} from "typeorm";
import {ArticleEntity} from "~/modules/article/entities/article.entity";
import {CategoriesEntity} from "~/modules/article/entities/category.entity";
import {ArticleInfoDto} from "~/modules/article/article.dto";

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

        if (createArticleDto.category) {
            const categoriesEntity = new CategoriesEntity()
            categoriesEntity.name = createArticleDto.category
            await this.categoriesEntityRepository.save(categoriesEntity)

            const articleEntity = new ArticleEntity()
            Object.assign(articleEntity,createArticleDto)
            articleEntity.categories_ = categoriesEntity
            articleEntity.tags = articleEntity.tags.toString()
            return await this.articleEntityRepository.save(articleEntity)
        }else {
            return await this.articleEntityRepository.save(createArticleDto)
        }
    }

}
