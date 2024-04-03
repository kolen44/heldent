import GreenButton from '../../../widgets/GreenButton/GreenButton'
import Input from '../../../widgets/Input/Input'

export default function Form() {
	return (
		<div>
			<div className='py-8 px-12 md:px-28 bg-[#30284A] backdrop-blur-3xl  bg-[#30284A]/50 min-w-5/6 flex flex-col justify-center rounded-lg shadow-2xl shadow-slate-950 gap-5'>
				<div className='flex justify-center '>
					<h2 className='text-2xl'>
						Введите данные для получения <br></br> рекомендации
					</h2>
				</div>
				<div className='pt-7 text-[#FFF] flex flex-col md:flex-row items-start md:justify-between text-xl gap-3'>
					<Input text={'ФИО'} />
					<Input text={'Факультет'} />
					<Input text={'Курс'} />
				</div>

				<div className='flex justify-center mt-5'>
					<GreenButton text={'Получить'} />
				</div>
			</div>
		</div>
	)
}
