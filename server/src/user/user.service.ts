import { GenerateTextDto } from '@ai-chat/ai-chat/dto/generate-text.dto';
import { Chat } from '@ai-chat/ai-chat/entities/chat/chat.entity';
import { YandexChatRole } from '@ai-chat/ai-chat/types/yandex.type';
import { TokenService } from '@app/token';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
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

	async AIChecker(text) {
		const chat = new Chat({
			role: YandexChatRole.USER,
			text,
		});
		const generateTextDto = new GenerateTextDto(chat);
		console.log(generateTextDto);
		return generateTextDto;
	}

	async findAll({ data }) {
		const check = this.tokenService.checkByToken(data);
		if (check) {
			return 'proverka yes';
		}
	}

	async createCalendar(data) {
		const folder_id = 'b1got6mvjila3lv39i94';
		const yandexgpt_key = process.env.TOKEN_Yandex;

		try {
			const response = await axios.post(
				`https://llm.api.cloud.yandex.net/foundationModels/v1/completion`,

				{
					crossdomain: true,
					modelUri: `gpt://${folder_id}/yandexgpt/latest`,
					completionOptions: {
						stream: false,
						temperature: 0,
						maxTokens: '2000',
					},
					messages: [
						{
							role: 'system',
							text: `отдай ответ в формате json в следующем формате {["data":'дата сегодня',"plan":"план на сегодня"],["data":'завтра',"plan":"План на завтра"],  и так для следующих дней]} .Кроме json ничего не возвращай`,
						},
						{
							role: 'user',
							text: `Я учусь на ${data.curse} курсе по прикладной ${data.subject} . Учитывая эти данные составь мне расписание на неделю что бы улучшить мои знания в ${data.subject} . Учитывай что сегодня ${data.data} Дай план на 5 дней. Задачи постарайся подобрать для меня индивидуально и предоставить к примеру какие то книги которые я могу прочитать . Верни только план в формате json`,
						},
					],
				},
				{
					headers: {
						Authorization: `Api-Key ${yandexgpt_key}`,
						'x-folder-id': folder_id,
					},
				},
			);
			return response.data.result.alternatives[0]['message']['text'];
		} catch (err) {
			console.log(err);
		}
	}
}
