interface BlocProperties {
	title: string
	children: React.ReactNode
	onClick?: () => void
}

export default function Bloc({ title, children, onClick }: BlocProperties) {
	return (
		<div role="button" tabIndex={0} onKeyDown={onClick} className='w-full rounded-lg bg-green-600' onClick={onClick}>
			<div className='flex flex-col items-center gap-3 px-10 py-4'>
				<h5 className='text-gray'>{title}</h5>
				{children}
			</div>
		</div>
	)
}
