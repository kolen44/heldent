import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '10d' },
		}),
	],
	providers: [TokenService],
	exports: [TokenService],
})
export class TokenModule {}
