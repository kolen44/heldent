import * as dotenv from 'dotenv';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableShutdownHooks();
	dotenv.config();
	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('api');
	await app.listen(5000, () => console.log(`Server started on port 5000`));
}
bootstrap();
