import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { CategoriesEntity } from "~/modules/category/entities/category.entity";


@Entity("article")
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id:string; // 标记为主列，值自动生成

  @Column({ length: 30})
  title:string

  @Column("text")
  content:string

  @Column({ length: 100,default:'https://suemor.oss-cn-beijing.aliyuncs.com/img/88426823_p0_master1200.jpeg'})
  cover:string

  @Column({ length: 100})
  tags:string

  @ManyToOne(type => CategoriesEntity, category => category.articles)
  category: CategoriesEntity;

  @Column({default:false})
  state: boolean;

  @CreateDateColumn({type: 'timestamp',name:'create_at'})
  createAt: Date

  @UpdateDateColumn({type: 'timestamp',name:'update_at'})
  updateAt: Date
}
