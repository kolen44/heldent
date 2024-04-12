import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';

@Injectable()
export class TokenService {
	constructor(private readonly jwtService: JwtService) {}

	async sign(payload: Record<string, unknown>) {
		return await this.jwtService.signAsync(payload);
	}

	async decode(token: string) {
		try {
			return await this.jwtService.decode(token);
		} catch {
			console.error('An error occurred while decoding the token:', error);
			return null;
		}
	}
}
