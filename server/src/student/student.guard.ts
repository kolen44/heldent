import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenService } from '../../libs/token/src/token.service';
import { Student } from './entities/student.entity';

// TODO перекинуть в auth/guards

@Injectable()
export class StudentGuard implements CanActivate {
	constructor(
		@InjectRepository(Student)
		private readonly studentRepository: Repository<Student>,
		private readonly tokenService: TokenService,
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = request.headers.authorization?.replace('Bearer ', '');

		const payload = await this.tokenService.decode(token);

		if (!payload || !payload.id || !payload.email) return false;

		const student = await this.studentRepository.findOne({
			where: { id: payload.id, email: payload.email },
		});

		if (!student) return false;

		request.student = student;

		return true;
	}
}
