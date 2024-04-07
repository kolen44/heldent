import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export async function handlerSendGPTCalendar(props) {
	const id = toast.loading('Нейросеть генерирует ответ...', {
		position: 'top-right',
	})
	try {
		const requestText = props
		console.log(requestText)
		if (requestText.length < 2) {
			return toast.warn('Введите сообщение !', {
				position: 'bottom-left',
			})
		}

		console.log(requestText)
		const url = 'api/Calendar'
		let postBody = {
			text: requestText,
			system:
				'Твоя профессиональный человек который отправляет в ответ текст в поставленном формате JSON',
		}
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(postBody),
		})
		let responseText = res
		toast.update(id, {
			render: 'Ответ сгенерирован !',
			type: 'success',
			isLoading: false,
			autoClose: 5000,
		})
		return responseText
	} catch (error) {
		toast.update(id, {
			render: 'На сервере ошибка !',
			type: 'error',
			isLoading: false,
			autoClose: 5000,
		})
		console.log(error)
	}
}
