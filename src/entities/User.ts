import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  export enum UserRole {
    ADMIN = "admin",
    USER = "user",
  }
  
  export enum UserStatus {
    ACTIVE = "active",
    BLOCKED = "blocked",
  }
  
  @Entity("users")
  export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({ name: "full_name", nullable: false })
    fullName!: string;
  
    @Column({ type: "date", name: "birth_date", nullable: false })
    birthDate!: Date;
  
    @Column({ unique: true, nullable: false })
    email!: string;
  
    @Column({ nullable: false })
    password!: string;
  
    @Column({
      type: "enum",
      enum: UserRole,
      default: UserRole.USER,
    })
    role!: UserRole;
  
    @Column({
      type: "enum",
      enum: UserStatus,
      default: UserStatus.ACTIVE,
    })
    status!: UserStatus;
  
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
  }