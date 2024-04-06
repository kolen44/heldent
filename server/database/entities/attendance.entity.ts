import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subject.entity';
import { User } from './user.entity';

@Entity()
export class Attendance {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	date: Date;

	@Column()
	attendance: number;

	@ManyToOne(() => Subject, (subject) => subject.attendances)
	subject: Subject;

	@ManyToOne(() => User, (user) => user.attendances)
	user: User;
}
