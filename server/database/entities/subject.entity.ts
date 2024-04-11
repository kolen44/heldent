import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Attendance } from './attendance.entity';
import { Grade } from './grade.entity';
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

	@OneToMany(() => Grade, (grade) => grade.subject, { cascade: true })
	grades: Grade[];

	@OneToMany(() => Attendance, (attendance) => attendance.subject, {
		cascade: true,
	})
	attendances: Attendance[];

	@ManyToMany(() => Student, (student) => student.subjects)
	students: Student[];
}
