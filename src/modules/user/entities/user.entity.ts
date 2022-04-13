//    posts/posts.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {Exclude} from "class-transformer";


@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id:number; // 标记为主列，值自动生成

  @Column({ length:20 })
  username: string;

  @Column({ length: 30})
  @Exclude()
  password: string;

  @Column("text")
  introduce:string;

  @Column({ length: 100})
  avatar: string;

  @Column({ length: 100})
  github: string;

  @Column({ length: 100})
  email: string;

  @Column({ length: 100})
  twitter: string;

  @Column({ length: 100})
  @Exclude()
  salt: string;

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  create_at: Date

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  update_at: Date
}
