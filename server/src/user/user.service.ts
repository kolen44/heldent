import { TokenService } from '@app/token';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'database/entities/student.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(Student) private userRepository: Repository<Student>,
		private tokenService: TokenService,
	) {}

	async create(createUserDto: CreateUserDto) {
		const existUser = await this.userRepository.findOne({
			where: {
				email: createUserDto.email,
			},
		});
		if (existUser) {
			throw new BadRequestException(
				'Данный пользователь уже зарегистрирован',
			);
		}
		const user = await this.userRepository.save({
			email: createUserDto?.email,
			// FIXME
			// subjects: createUserDto.subjects,
			password: createUserDto.password,
		});
		return { user };
	}

	async findOne(id: number) {
		const user = await this.userRepository.findOne({
			where: {
				id,
			},
		});

		return { user };
	}

	async findAll({ data }) {
		const check = this.tokenService.checkByToken(data);
		if (check) {
			return 'proverka yes';
		}
	}
}
