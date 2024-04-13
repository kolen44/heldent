import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class Subject {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', unique: true })
	email: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updateAt: Date;

	@ManyToMany(() => Student, (student) => student.subjects)
	students: Student[];
}
