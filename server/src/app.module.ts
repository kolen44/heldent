import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { databaseConfigHandler } from './database/config/database.config';
import { StudentModule } from './student/student.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: databaseConfigHandler,
			inject: [ConfigService],
		}),

		AuthModule,
		StudentModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
