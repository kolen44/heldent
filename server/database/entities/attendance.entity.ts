import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';
import { Subject } from './subject.entity';

@Entity()
export class Attendance {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	date: Date;

	@Column()
	attendance: boolean;

	@ManyToOne(() => Subject, (subject) => subject.attendances)
	subject: Subject;

	@ManyToOne(() => Student, (student) => student.attendance)
	student: Student;
}
