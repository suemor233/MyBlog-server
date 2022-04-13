import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { CategoriesEntity } from "~/modules/category/entities/category.entity";


@Entity("article")
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id:string; // 标记为主列，值自动生成

  @Column({ length: 30})
  title:string

  @Column("text")
  content:string

  @Column({ length: 100})
  cover:string

  @Column({ length: 100})
  tags:string

  @ManyToOne(type => CategoriesEntity, category => category.articles)
  category: CategoriesEntity;

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  create_at: Date

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  update_at: Date
}
