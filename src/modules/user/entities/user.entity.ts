//    posts/posts.entity.ts
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {SocialEntity} from "./social.entity";


@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id:number; // 标记为主列，值自动生成

  @Column({ length:20 })
  username: string;

  @Column({ length: 30})
  password: string;

  @Column("text")
  introduce:string;

  @Column()
  avatar: string;

  @OneToOne(type => SocialEntity)
  @JoinColumn()
  social_: string;

  @Column()
  salt: string;

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  create_at: Date

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  update_at: Date
}
