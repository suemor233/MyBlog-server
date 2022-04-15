//    posts/posts.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {Exclude} from "class-transformer";


@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id:string;

  @Column({ length:20 })
  username: string;

  @Column({ length: 30})
  @Exclude()
  password: string;

  @Column("text",{nullable:true})
  introduce:string;

  @Column({ length: 100,default:''})
  avatar: string;

  @Column({ length: 100,default:''})
  github: string;

  @Column({ length: 100,default:''})
  email: string;

  @Column({ length: 100,default:''})
  twitter: string;

  @Column({ length: 100})
  @Exclude()
  salt: string;

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  create_at: Date

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  update_at: Date
}
