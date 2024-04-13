import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import { Subject } from '../entities/subject.entity';

export const databaseConfigHandler = (
	configService: ConfigService,
): TypeOrmModuleOptions => ({
	type: 'postgres',
	host: configService.get('DB_HOST'),
	port: configService.get('DB_PORT'),
	username: configService.get('DB_USERNAME'),
	password: configService.get('DB_PASSWORD'),
	database: configService.get('DB_NAME'),
	synchronize: true,
	entities: [Student, Subject],
});
