import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Student } from 'database/entities/student.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Student) private userRepository: Repository<Student>,
		private jwtService: JwtService,
	) {}

	// TODO удалить
	// async validateUser({ email, password }: LoginAuthDto) {
	// 	const existUser = await this.userRepository.findOne({
	// 		where: {
	// 			email,
	// 			password,
	// 		},
	// 	});
	// 	if (existUser) {
	// 		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// 		const { password, ...userData } = existUser;
	// 		return this.jwtService.sign(userData);
	// 	} else {
	// 		throw new UnauthorizedException(
	// 			'Пользователь с такими данными не найден. Внимательно проверьте почту и пароль!',
	// 		);
	// 	}
	// }

	private generateToken(student: Student) {
		const token = this.jwtService.sign({ ...student, password: undefined });
		return { token };
	}

	public async login(loginUserDto: LoginUserDto) {
		const { email, password } = loginUserDto;

		const student = await this.userRepository.findOne({
			where: {
				email,
			},
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

		return this.generateToken(student);
	}

	public async register(registerUserDto: RegisterUserDto) {
		const { email, password } = registerUserDto;

		const student = await this.userRepository.findOne({
			where: { email },
		});

		if (student)
			throw new BadRequestException(
				'Пользователь с такой почтой уже существует.',
			);

		const hashedPassword = await bcrypt.hash(password, 10);

		const newStudent = await this.userRepository.save({
			email,
			password: hashedPassword,
		});

		return this.generateToken(newStudent);
	}
}
