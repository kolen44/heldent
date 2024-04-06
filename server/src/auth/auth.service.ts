import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'database/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		private jwtService: JwtService,
	) {}

	async validateUser({ email, password }: LoginAuthDto) {
		const existUser = await this.userRepository.findOne({
			where: {
				email,
				password,
			},
		});
		if (existUser) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...userData } = existUser;
			return this.jwtService.sign(userData);
		} else {
			throw new UnauthorizedException(
				'Пользователь с такими данными не найден. Внимательно проверьте почту и пароль!',
			);
		}
	}
}
