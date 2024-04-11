import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export async function handlerSendGPTCalendar(props) {
	const id = toast.loading('Нейросеть генерирует ответ...', {
		position: 'top-right',
	})
	try {
		const url = 'api/Calendar'
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(props),
		})
		toast.update(id, {
			render: 'Ответ сгенерирован !',
			type: 'success',
			isLoading: false,
			autoClose: 5000,
		})
		const responseParsed = await res.json()
		return responseParsed
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
