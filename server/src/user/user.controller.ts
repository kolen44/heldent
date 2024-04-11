import {
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CalendarUserDto } from './dto/calendar-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post('create')
	@UsePipes(new ValidationPipe())
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Post('aichecker')
	@UsePipes(new ValidationPipe())
	AIChecker(@Body() data: { text: string }) {
		return this.userService.AIChecker(data.text);
	}

	@Post('find-all')
	@UsePipes(new ValidationPipe())
	findAll(@Body() data: { data: string }) {
		return this.userService.findAll(data);
	}

	@Post('find-all')
	@UsePipes(new ValidationPipe())
	getOne(@Body() data: { email: string }) {
		return this.userService.findAll({ data });
	}

	@Post('calendar')
	@UsePipes(new ValidationPipe())
	createCalendar(@Body() data: CalendarUserDto) {
		return this.userService.createCalendar(data);
	}
}
