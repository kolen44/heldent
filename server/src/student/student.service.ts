import { Chat } from '@ai-chat/ai-chat/entities/chat/chat.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { CalendarStudentDto } from 'src/student/dto/calendar-student.dto';
import { AiChatService } from '../../libs/ai-chat/src/ai-chat.service';
import { AskAssistantDto } from './dto/ask-assistant.dto';

@Injectable()
export class StudentService {
	constructor(private aiChatService: AiChatService) {}

	private getMessageAboutContext(): string {
		const dataAboutUniversity = readFileSync(
			'../data/data-about-university.txt',
			'utf8',
		);

		return 'Вот данные для контекста:' + '\n' + dataAboutUniversity;
	}

	private getAssistantText() {
		return 'Представь себя в роли ассистента для студентов вуза. Говори на одной волне со студентами, будто ты и есть один из них. Отвечай на вопросы студентов, основываясь на информации о вузе. Если есть возможность, расскажи о мастер-классах или курсах, если это уместно.';
	}

	private getProgrammerText() {
		return 'Привет! Представь себя как опытный программист, готовый помочь студентам в изучении их предмета. Твоя цель - отвечать на вопросы студентов, касающиеся программирования и языка C++, а также предоставлять ресурсы для дальнейшего изучения. Помимо ответов на вопросы, можешь предложить студенту ресурсы для самостоятельного изучения, например, курсы, учебники или онлайн-платформы. При необходимости уточни, есть ли вузовские ресурсы, которые могут быть полезны для студентов. Если вопрос не связан с программированием, можешь предложить студенту обратиться к другому человеку или преподавателю, который сможет ему помочь в этом вопросе. Постарайся использовать точные термины и детально вводить студента в курс дела, чтобы он получил максимально полезную информацию.';
	}

	private getPsychologistText() {
		return 'Привет! Представь себя как психолог для студентов вуза. Твоя задача — говорить на одной волне со студентами, чтобы они чувствовали себя комфортно. Если вопрос не относится к психологической области, направь студента к другому преподавателю или специалисту. Основывай свои ответы на данных о вузе для более точной помощи студентам. Постарайся быть понятным и поддерживать доверительную атмосферу, чтобы студент мог свободно общаться и получить нужную помощь.';
	}

	public async askAssistant(askAssistantDto: AskAssistantDto) {
		const { question, role } = askAssistantDto;
		const chat = new Chat();

		chat.addMessageBehalfSystem(this.getMessageAboutContext());

		switch (role) {
			case 'assistant':
				chat.addMessageBehalfSystem(this.getAssistantText());
				break;

			case 'programmer':
				chat.addMessageBehalfSystem(this.getProgrammerText());
				break;

			case 'psychologist':
				chat.addMessageBehalfSystem(this.getPsychologistText());
				break;

			default:
				throw new BadRequestException('Unknown role');
		}

		chat.addMessageBehalfUser(question);

		await this.aiChatService.generate(chat);
		const response = await chat.getLastMessage();
		console.log(response);

		return JSON.stringify(response);
	}

	async createCalendar(data: CalendarStudentDto) {
		const chat = new Chat();

		chat.addMessageBehalfSystem(
			`Отдай ответ в формате json в следующем формате. [{'data':'дата сегодня','plan':'план на сегодня'},{'data':'завтра','plan':'План на завтра'},  и так для следующих дней].Учитывай что моего наставника зовут Виктор Барисов можешь использовать это в генерации ответа . Кроме json ничего НЕ возвращай`,
		);

		chat.addMessageBehalfUser(
			`Привет! Я обучаюсь в ITHub на программе по ${data.subject}. Моя цель - ${data.goal},учитывая это можешь подсказать мне план  чтобы улучшить мои знания в этой области? Сегодня ${data.date}, и я хотел бы план на 5 дней НУЖЕН ПЛАН НА 5 ДНЕЙ. Этот план обязан помочь мне в улучшении знаний в "в ${data.subject}.ОТВЕТ ВЕРНИ ТОЛЬКО В ФОРМАТЕ JSON!!!!!!!!!`,
		);

		const refactorTextByJson = (text: string) => {
			if (text.includes('```json')) {
				const startCalendar = text.indexOf('```json') + 7;
				const endCalendar = text.indexOf('```', startCalendar);
				return text.slice(startCalendar, endCalendar);
			}
			return text;
		};

		const recursionGetterAnswer = async () => {
			const chatWithAnswer = await this.aiChatService.generate(chat);
			const text = chatWithAnswer.getLastMessage().text;

			try {
				return JSON.stringify(refactorTextByJson(text));
			} catch (err) {
				console.log('Ошибка парсинга\nТекст:', text, '\n\nError', err);
				return await recursionGetterAnswer();
			}
		};

		return await recursionGetterAnswer();
	}
}
