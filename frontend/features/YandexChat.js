import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export async function yandexGPTChat(props) {
	const id = toast.loading('Нейросеть генерирует ответ...', {
		position: 'top-right',
	})
	try {
		const url = 'api/Chat'
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
		console.log(res)
		return res
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
