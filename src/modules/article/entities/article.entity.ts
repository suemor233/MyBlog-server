import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoriesEntity } from "./category.entity";


@Entity("article")
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id:number; // 标记为主列，值自动生成

  @Column({ length: 30})
  title:string

  @Column("text")
  content:string

  @Column({ length: 100})
  cover:string

  @Column({ length: 100})
  tags:string

  @OneToOne(type => CategoriesEntity)
  @JoinColumn()
  categories_: object;

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  create_at: Date

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  update_at: Date
}
