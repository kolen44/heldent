import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '../../../.env') });

const options = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	entities: ['database/entities/*.entity.ts'],
	factories: ['database/factories/**/*.ts'],
	seeds: ['database/seeds/**/*.seed.ts'],
	migrationsTableName: 'migrations',
	migrationsRun: false,
	synchronize: false,
	logging: true,
};

export default options;
