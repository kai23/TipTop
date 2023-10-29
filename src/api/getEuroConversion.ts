
export default async function convertDollarsToEuros() {
	const response = await fetch(
		"https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR"
	);
	const data = await response.json();
	return data.rates.EUR;
}
