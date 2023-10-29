
import Bloc from 'components/Bloc'
import Input from 'components/Input'
import PillButton from 'components/PillButton'
import { useEffect, useState } from 'react'

const NYC_TAXES: TipTax[] = [
	{ name: '0%', value: 0 },
	{ name: '4%', value: 0.04 },
	{ name: '8%', value: 0.08 }
]
const TIPS: TipTax[] = [
	{ name: '0%', value: 0 },
	{ name: '10%', value: 0.1 },
	{ name: '15%', value: 0.15 },
	{ name: '17%', value: 0.17 },
	{ name: '20%', value: 0.2 }
]

interface TipTax {
	name: string
	value: number
}

interface ExchangeRateData {
	result: string
	provider: string
	documentation: string
	terms_of_use: string
	time_last_update_unix: number
	time_last_update_utc: string
	time_next_update_unix: number
	time_next_update_utc: string
	time_eol_unix: number
	base_code: string
	rates: Record<string, number>
}

function convertDollarToEuro(dollar: number, rate: number) {
	return (dollar * rate).toFixed(2).replace('.', ',')
}

export default function GalleryPage() {
	const [tax, setTax] = useState<TipTax>(NYC_TAXES[0])
	const [hasOtherTax, setHasOtherTax] = useState(false)
	const [otherTax, setOtherTax] = useState(0)
	const [tip, setTip] = useState<TipTax>(TIPS[0])
	const [otherTip, setOtherTip] = useState(0)
	const [hasOtherTip, setHasOtherTip] = useState(false)
	const [price, setPrice] = useState(0)
	const [rate, setRate] = useState(0.946_636)

	const finalTax = hasOtherTax ? otherTax / 100 : tax.value
	const finalTip = hasOtherTip ? otherTip / 100 : tip.value
	const finalPrice = (price + price * finalTax + price * finalTip)

	useEffect(() => {
		async function getRate() {
			const storedData = window.localStorage.getItem('exchangeRateData')
			const storedTime = window.localStorage.getItem('exchangeRateTime')
			const currentTime = Date.now()

			if (
				storedData &&
				storedTime &&
				currentTime - Number(storedTime) < 24 * 60 * 60 * 1000
			) {
				// Use stored data if it is less than 24 hours old
				setRate(JSON.parse(storedData) as number)
			} else {
				// Fetch new data if stored data is too old or doesn't exist
				const response = await fetch('https://open.er-api.com/v6/latest/USD')
				try {
					if (!response.ok) {
						throw new Error('Failed to fetch exchange rate')
					}
					const data = (await response.json()) as ExchangeRateData
					setRate(data.rates.EUR)
					window.localStorage.setItem(
						'exchangeRateData',
						JSON.stringify(data.rates.EUR)
					)
					window.localStorage.setItem('exchangeRateTime', String(currentTime))
				} catch (error) {
					console.error(error)
				}
			}
		}

		getRate()
	}, [])

	function onTaxChange(changedTax: TipTax) {
		if (hasOtherTax) {
			setHasOtherTax(false)
		}
		setTax(changedTax)
	}
	function onTipChange(changedTip: TipTax) {
		if (hasOtherTip) {
			setHasOtherTip(false)
		}
		setTip(changedTip)
	}

	return (
		<div className='container flex min-h-screen flex-col justify-between'>
			<div className='flex flex-col items-center justify-between gap-6 p-5 text-white'>
				<header className='poppins text-xl font-semibold text-white'>
					How to pay at NYC
				</header>
				{/* INPUT */}
				<Bloc title='Prix à payer'>
					<div className='flex flex-col items-center justify-center'>
						<div className='flex items-center'>
							<span className='text-3xl text-white'>$</span>
							<Input
								price={price === 0 ? '' : `${price}`}
								onPriceChange={setPrice}
							/>
						</div>
						<p>
							<span className='text-gray'>soit &nbsp;</span>
							<span className='text-white'>
								{convertDollarToEuro(price, rate)} €
							</span>
						</p>
					</div>
				</Bloc>

				{/* TAXES */}
				<Bloc title='Taxes'>
					<div className='flex w-full items-center justify-between gap-2'>
						{NYC_TAXES.map(t => (
							<PillButton
								key={t.name}
								label={t.name}
								selected={!hasOtherTax && t.name === tax.name}
								onClick={() => onTaxChange(t)}
							/>
						))}
						<PillButton
							label='autre'
							selected={hasOtherTax}
							onClick={() => setHasOtherTax(true)}
						/>
					</div>
					{hasOtherTax ? (
						<div className='relative mt-2 flex w-full rounded border border-white'>
							<input
								className='w-full border-0 bg-green-600 indent-4 text-white focus:outline-none border-transparent focus:border-transparent focus:ring-0'
								placeholder='50'
								value={otherTax === 0 ? '' : otherTax}
								onChange={event => setOtherTax(Number(event.target.value))}
								autoFocus
							/>
							<span className='absolute left-4 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white'>
								%
							</span>
						</div>
					) : undefined}
				</Bloc>

				{/* POURBOIRE */}
				<Bloc title='Pourboires'>
					<div className='flex w-full flex-wrap items-center justify-between gap-2'>
						{TIPS.map(t => (
							<PillButton
								key={t.name}
								label={t.name}
								selected={!hasOtherTip && t.name === tip.name}
								onClick={() => onTipChange(t)}
								className='basis-1/4'
							/>
						))}
						<PillButton
							label='autre'
							selected={hasOtherTip}
							onClick={() => setHasOtherTip(true)}
							className='basis-1/4'
						/>
					</div>
					{hasOtherTip ? (
						<div className='relative mt-2 flex w-full rounded border border-white'>
							<input
								className='w-full border-0 bg-green-600 indent-4 text-white focus:outline-none border-transparent focus:border-transparent focus:ring-0'
								placeholder='50'
								value={otherTip === 0 ? '' : otherTip}
								onChange={event => setOtherTip(Number(event.target.value))}
								autoFocus
							/>
							<span className='absolute left-4 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white'>
								%
							</span>
						</div>
					) : undefined}
				</Bloc>
			</div>
			<footer className='flex w-full flex-col items-center justify-center gap-4 bg-green-600 py-10'>
				<span className='text-gray'>Montant total</span>
				<div className='flex items-center'>
					<span className='text-3xl text-white'>$</span>
					<span className='text-6xl text-white'>
						{finalPrice
							.toFixed(2)
							.replace('.', ',')}
					</span>
				</div>
				<p>
					<span className='text-gray'>soit &nbsp;</span>
					<span className='text-white'>
						{convertDollarToEuro(finalPrice, rate)} €
					</span>
				</p>
			</footer>
		</div>
	)
}
