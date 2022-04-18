//    posts/posts.entity.ts
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
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

  @CreateDateColumn({type: 'timestamp',name:'create_at'})
  createAt: Date

  @UpdateDateColumn({type: 'timestamp',name:'update_at'})
  updateAt: Date
}
