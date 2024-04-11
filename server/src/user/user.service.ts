import { GenerateTextDto } from '@ai-chat/ai-chat/dto/generate-text.dto';
import { Chat } from '@ai-chat/ai-chat/entities/chat/chat.entity';
import { YandexChatRole } from '@ai-chat/ai-chat/types/yandex.type';
import { TokenService } from '@app/token';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'database/entities/student.entity';
import { Repository } from 'typeorm';
import { AiChatService } from '../../libs/ai-chat/src/ai-chat.service';
import { CalendarUserDto } from './dto/calendar-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(Student) private userRepository: Repository<Student>,
		private readonly tokenService: TokenService,
		private readonly aiChatService: AiChatService,
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

	async AIChecker(text: string) {
		const chat = new Chat({
			role: YandexChatRole.USER,
			text,
		});
		const generateTextDto = new GenerateTextDto(chat);
		console.log(generateTextDto);
		return generateTextDto;
	}

	// 	async findAll({ data }) {
	// 		const check = this.tokenService.checkByToken(data);
	// 		if (check) {
	// 			return 'proverka yes';
	// 		}
	// 	}

	async createCalendar(data: CalendarUserDto) {
		const chat = new Chat([
			{
				role: YandexChatRole.SYSTEM,
				text: `Отдай ответ в формате json в следующем формате. [{'data':'дата сегодня','plan':'план на сегодня'},{'data':'завтра','plan':'План на завтра'},  и так для следующих дней]. Кроме json ничего НЕ возвращай`,
			},
			{
				role: YandexChatRole.USER,
				text: `Привет! Я обучаюсь университете на программе по ${data.subject}. Моя цель - ${data.goal},учитывая это можешь подсказать мне план на неделю, чтобы улучшить мои знания в этой области? Сегодня ${data.date}, и я хотел бы план на 5 дней. Помимо этого, буду благодарен за прикрепление ссылок на статьи, видео или любые материалы, которые помогут мне углубить знания в ${data.subject}. Верни, пожалуйста, только план в формате JSON.`,
			},
		]);

		// TODO возможно потом уберу GenerateTextDto, вместо него будет просто Chat
		const generateTextDto = new GenerateTextDto(chat);

		const chatWithAnswer =
			await this.aiChatService.generate(generateTextDto);

		let text = chatWithAnswer.getLastMessage().text;
		if (text.includes('```json')) {
			text = text.replace('```json', '').replace('```', '');
		}

		try {
			return JSON.stringify(text);
		} catch (err) {
			console.log('err', err);
			return text;
		}
	}
}
