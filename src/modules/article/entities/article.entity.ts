import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoriesEntity } from "./category.entity";


@Entity("article")
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id:number; // 标记为主列，值自动生成

  @Column({ length: 30})
  title:string

  @Column()
  cover:string

  @Column()
  tags:string

  @OneToOne(type => CategoriesEntity)
  @JoinColumn()
  categories_: string;

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  create_at: Date

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  update_at: Date
}
