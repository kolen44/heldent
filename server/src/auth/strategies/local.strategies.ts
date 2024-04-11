import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategies extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: 'email' });
	}
	// async validate(data) {
	// 	const user = await this.authService.validateUser(data);
	// 	return user;
	// }
}
