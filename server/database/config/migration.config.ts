import * as dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '../../../.env') });

import { Attendance } from 'database/entities/attendance.entity';
import { Grade } from 'database/entities/grade.entity';
import { Subject } from 'database/entities/subject.entity';
import { User } from 'database/entities/user.entity';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const options: DataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,

	entities: [User, Subject, Grade, Attendance],
	migrations: [join(__dirname, '../migrations/*.ts')],
	migrationsTableName: 'migrations',
	synchronize: true,
	logging: true,
};

const dataSource = new DataSource(options);

export default dataSource;
