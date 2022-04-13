//    posts/posts.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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

  @Column()
  github: string;

  @Column()
  email: string;

  @Column()
  twitter: string;

  @Column()
  salt: string;

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  create_at: Date

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  update_at: Date
}
