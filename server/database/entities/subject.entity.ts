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
import { User } from './user.entity';

@Entity()
export class Subject {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', unique: true })
	name: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updateAt: Date;

	@OneToMany(() => Grade, (grade) => grade.subject)
	grades: Grade[];

	@OneToMany(() => Attendance, (attendance) => attendance.subject)
	attendances: Attendance[];

	@ManyToMany(() => User, (user) => user.subjects)
	users: User[];
}
