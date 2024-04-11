import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	// @Post('login')
	// @UseGuards(LocalGuard)
	// login(@Req() req: Request) {
	// 	return req.user;
	// }

	// @Get('status')
	// @UseGuards(JwtGuard)
	// status(@Req() req: Request) {
	// 	return req.user;
	// }

	@Post('login')
	public login(@Body() userLoginDto: LoginUserDto) {
		return this.authService.login(userLoginDto);
	}

	@Post('registration')
	public register(@Body() userRegisterDto: RegisterUserDto) {
		console.log(userRegisterDto);
		return this.authService.register(userRegisterDto);
	}
}
