interface BlocProperties {
	title: string
	children: React.ReactNode
}

export default function Bloc({ title, children }: BlocProperties) {
	return (
		<div className='w-full rounded-lg bg-green-600'>
			<div className='flex flex-col items-center gap-3 px-10 py-4'>
				<h5 className='text-gray'>{title}</h5>
				{children}
			</div>
		</div>
	)
}
