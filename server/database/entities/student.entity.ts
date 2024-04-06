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

	@OneToMany(() => Grade, (grade) => grade.student)
	grades: Grade[];

	@OneToMany(() => Attendance, (attendance) => attendance.student)
	attendance: Attendance[];

	@ManyToMany(() => Subject, (subject) => subject.students)
	@JoinTable()
	subjects: Subject[];
}
