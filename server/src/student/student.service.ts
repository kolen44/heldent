import { Chat } from '@ai-chat/ai-chat/entities/chat/chat.entity';
import { YandexChatRole } from '@ai-chat/ai-chat/types/yandex.type';
import { BadRequestException, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { CalendarStudentDto } from 'src/student/dto/calendar-student.dto';
import { AiChatService } from '../../libs/ai-chat/src/ai-chat.service';
import { AskAssistantDto } from './dto/ask-assistant.dto';

@Injectable()
export class StudentService {
	constructor(private aiChatService: AiChatService) {}

	private getMessageAboutContext() {
		const dataAboutUniversity = readFileSync(
			'../data-about-university.txt',
			'utf8',
		);

		return {
			role: YandexChatRole.SYSTEM,
			text: 'Вот данные для контекста:' + '\n' + dataAboutUniversity,
		};
	}

	private getAssistantChat(question: string) {
		return new Chat([
			this.getMessageAboutContext(),
			{
				role: YandexChatRole.SYSTEM,
				text: 'Представь себя в роли ассистента для студентов вуза. Говори на одной волне со студентами, будто ты и есть один из них. Отвечай на вопросы студентов, основываясь на информации о вузе. Если есть возможность, расскажи о мастер-классах или курсах, если это уместно.',
			},
			{ role: YandexChatRole.USER, text: question },
		]);
	}

	private getProgrammerChat(question: string) {
		return new Chat([
			this.getMessageAboutContext(),
			{
				role: YandexChatRole.SYSTEM,
				text: 'Привет! Представь себя как опытный программист, готовый помочь студентам в изучении их предмета. Твоя цель - отвечать на вопросы студентов, касающиеся программирования и языка C++, а также предоставлять ресурсы для дальнейшего изучения. Помимо ответов на вопросы, можешь предложить студенту ресурсы для самостоятельного изучения, например, курсы, учебники или онлайн-платформы. При необходимости уточни, есть ли вузовские ресурсы, которые могут быть полезны для студентов. Если вопрос не связан с программированием, можешь предложить студенту обратиться к другому человеку или преподавателю, который сможет ему помочь в этом вопросе. Постарайся использовать точные термины и детально вводить студента в курс дела, чтобы он получил максимально полезную информацию.',
			},
			{ role: YandexChatRole.USER, text: question },
		]);
	}

	private getPsychologistChat(question: string) {
		return new Chat([
			this.getMessageAboutContext(),
			{
				role: YandexChatRole.SYSTEM,
				text: 'Привет! Представь себя как психолог для студентов вуза. Твоя задача — говорить на одной волне со студентами, чтобы они чувствовали себя комфортно. Если вопрос не относится к психологической области, направь студента к другому преподавателю или специалисту. Основывай свои ответы на данных о вузе для более точной помощи студентам. Постарайся быть понятным и поддерживать доверительную атмосферу, чтобы студент мог свободно общаться и получить нужную помощь.',
			},
			{ role: YandexChatRole.USER, text: question },
		]);
	}

	public async askAssistant(askAssistantDto: AskAssistantDto) {
		const { question, role } = askAssistantDto;
		let chat: Chat;

		switch (role) {
			case 'assistant':
				chat = this.getAssistantChat(question);
				break;

			case 'programmer':
				chat = this.getProgrammerChat(question);
				break;

			case 'psychologist':
				chat = this.getPsychologistChat(question);
				break;

			default:
				throw new BadRequestException('Unknown role');
		}

		await this.aiChatService.generate(chat);

		return chat.getLastMessage();
	}

	async createCalendar(data: CalendarStudentDto) {
		const chat = new Chat([
			{
				role: YandexChatRole.SYSTEM,
				text: `Отдай ответ в формате json в следующем формате. [{'data':'дата сегодня','plan':'план на сегодня'},{'data':'завтра','plan':'План на завтра'},  и так для следующих дней]. Кроме json ничего НЕ возвращай`,
			},
			{
				role: YandexChatRole.USER,
				text: `Привет! Я обучаюсь университете на программе по ${data.subject}. Моя цель - ${data.goal},учитывая это можешь подсказать мне план на неделю, чтобы улучшить мои знания в этой области? Сегодня ${data.date}, и я хотел бы план на 5 дней. Помимо этого, буду благодарен за прикрепление ссылок на статьи, видео или любые материалы, которые помогут мне углубить знания в ${data.subject}.`,
			},
		]);

		const recursionGetterAnswer = async () => {
			const chatWithAnswer = await this.aiChatService.generate(chat);
			let text = chatWithAnswer.getLastMessage().text;
			try {
				if (text.includes('```json'))
					text = text.replace('```json', '').replace('```', '');
				return JSON.parse(text);
			} catch (err) {
				console.log('Ошибка парсинга\nТекст:', text, '\n\nError', err);
				return await recursionGetterAnswer();
			}
		};

		return await recursionGetterAnswer();
	}
}
