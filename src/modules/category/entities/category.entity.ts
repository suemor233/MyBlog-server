import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ArticleEntity} from "~/modules/article/entities/article.entity";

@Entity("categories")
export class CategoriesEntity {
    @PrimaryGeneratedColumn()
    id:string; // 标记为主列，值自动生成

    @Column({ length: 100})
    name:string

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP",name:'create_at'})
    createAt: Date

    @OneToMany(type => ArticleEntity, article => article.category) // note: we will create author property in the Photo class below
    articles: ArticleEntity[];

}
