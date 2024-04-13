import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenService } from '@token/token';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Student } from '../database/entities/student.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Student)
		private studentRepository: Repository<Student>,
		private tokenService: TokenService,
	) {}

	private async generateToken(student: Student) {
		const token = await this.tokenService.sign({
			...student,
			password: undefined,
		});
		return { token };
	}

	public async login(loginUserDto: LoginUserDto) {
		const { email, password } = loginUserDto;

		const student = await this.studentRepository.findOne({
			where: { email },
		});

		if (!student)
			throw new BadRequestException(
				'Пользователь с такими данными не найден. Внимательно проверьте почту и пароль!',
			);

		const isPasswordValid = await bcrypt.compare(
			password,
			student.password,
		);

		if (!isPasswordValid)
			throw new BadRequestException('Неверный логин или пароль');

		return await this.generateToken(student);
	}

	public async register(registerUserDto: RegisterUserDto) {
		const { email, password } = registerUserDto;

		const student = await this.studentRepository.findOne({
			where: { email },
		});

		if (student)
			throw new BadRequestException(
				'Пользователь с такой почтой уже существует.',
			);

		const hashedPassword = await bcrypt.hash(password, 10);

		const newStudent = await this.studentRepository.save({
			email,
			password: hashedPassword,
		});

		return await this.generateToken(newStudent);
	}
}
