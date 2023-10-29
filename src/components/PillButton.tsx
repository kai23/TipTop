import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

interface PillButtonProperties {
	label: string
	selected: boolean
	onClick: React.MouseEventHandler<HTMLButtonElement>
	className?: string
}

export default function PillButton({
	label,
	selected = false,
	onClick,
	className = ''
}: PillButtonProperties) {
	return (
		<button
			type='button'
			className={twMerge(
				cx(
					'flex-1 justify-between rounded-md bg-green-700 py-2 text-center',
					className,
					{
						'bg-green-800': selected
					}
				)
			)}
			onClick={onClick}
		>
			{label}
		</button>
	)
}
