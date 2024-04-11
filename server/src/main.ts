import * as dotenv from 'dotenv';
import { join } from 'path';
dotenv.config({ path: join(__dirname, '../../.env') });

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.SERVER_PORT || 3000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableShutdownHooks();
	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('api');
	await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
