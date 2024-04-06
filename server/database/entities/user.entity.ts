import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Attendance } from './attendance.entity';
import { Grade } from './grade.entity';
import { Subject } from './subject.entity';

@Entity()
export class User {
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

	@OneToMany(() => Grade, (grade) => grade.user)
	grades: Grade[];

	@OneToMany(() => Attendance, (attendance) => attendance.user)
	attendances: Attendance[];

	@ManyToMany(() => Subject, (subject) => subject.users)
	@JoinTable()
	subjects: Subject[];
}
