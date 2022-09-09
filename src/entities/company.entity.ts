import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Addresses } from "./address.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity("Company")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  isActive: boolean;

  @Column()
  isOpen: boolean;

  @OneToOne(() => Addresses, {
    eager: true,
  })
  @JoinColumn()
  address: Addresses;

  @OneToMany(() => Product, (products) => products.company)
  products: Product[];

  @ManyToOne(()=>User, (user)=> user.companies)
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
