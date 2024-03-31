import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column({ type: "varchar", nullable: true })
    subjects?: Record<string, number>

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date
}
