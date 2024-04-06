import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';
import { Subject } from './subject.entity';

@Entity()
export class Grade {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	date: Date;

	@Column()
	grade: number;

	@ManyToOne(() => Subject, (subject) => subject.grades)
	subject: Subject;

	@ManyToOne(() => Student, (student) => student.grades)
	student: Student;
}
