import styles from '../../styles/widgets/style.module.css'

export default function GreenButton({ text }) {
	return (
		<div className='bg-[#D2FF1D] h-fit w-fit py-3 px-10'>
			<h3 className='text-xl md:text-3xl text-black ' id={styles.button}>
				{text}
				<span id={styles.refl}>{text}</span>
			</h3>
		</div>
	)
}
