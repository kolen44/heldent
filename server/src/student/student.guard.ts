import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokenService } from '../../libs/token/src/token.service';

// TODO перекинуть в auth/guards

@Injectable()
export class StudentGuard implements CanActivate {
	constructor(private readonly tokenService: TokenService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = request.headers.authorization?.replace('Bearer ', '');

		const payload = await this.tokenService.decode(token);

		if (!payload) return false;

		console.log(payload);

		return !!token;
	}
}
