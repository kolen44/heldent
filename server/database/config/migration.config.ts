import { config } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Attendance } from '../entities/attendance.entity';
import { Grade } from '../entities/grade.entity';
import { Student } from '../entities/student.entity';
import { Subject } from '../entities/subject.entity';
config({ path: join(__dirname, '../../../.env') });

export const options: DataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,

	entities: [Student, Subject, Grade, Attendance],
	migrations: [join(__dirname, '../migrations/*.ts')],
	migrationsTableName: 'migrations',
	synchronize: true,
	logging: true,
};

console.log(options);

const dataSource = new DataSource(options);

export default dataSource;
