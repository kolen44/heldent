import { TokenModule } from '@app/token';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../database/entities/student.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [PassportModule, TokenModule, TypeOrmModule.forFeature([Student])],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
