import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subject.entity';
import { User } from './user.entity';

@Entity()
export class Grade {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	date: Date;

	@Column()
	grade: number;

	@ManyToOne(() => Subject, (subject) => subject.grades)
	subject: User;

	@ManyToOne(() => User, (user) => user.grades)
	user: User;
}
