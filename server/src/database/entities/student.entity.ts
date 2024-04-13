import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Subject } from './subject.entity';

@Entity()
export class Student {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column()
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updateAt: Date;

	@ManyToMany(() => Subject, (subject) => subject.students)
	@JoinTable()
	subjects: Subject[];
}
