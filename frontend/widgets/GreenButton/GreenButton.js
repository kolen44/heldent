'use client'
import styles from '../../styles/widgets/style.module.css'

export default function GreenButton({ text, hover = false }) {
	return (
		<div className={`bg-[#D2FF1D] h-fit w-fit py-3 px-10 duration-300 `}>
			<h3
				className='text-xl md:text-3xl text-black font-medium'
				id={styles.button}
			>
				{text}
				<span id={styles.refl}>{!hover && text}</span>
			</h3>
		</div>
	)
}
