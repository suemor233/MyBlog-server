
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("social")
export class SocialEntity {
  @PrimaryGeneratedColumn()
  id:number; // 标记为主列，值自动生成

  @Column()
  github: string;

  @Column()
  email: string;

  @Column()
  twitter: string;


}
