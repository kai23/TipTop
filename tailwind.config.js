const defaultConfig = require('tailwindcss/defaultConfig')
const formsPlugin = require('@tailwindcss/forms')

/** @type {import('tailwindcss/types').Config} */
const config = {
	content: ['index.html', 'src/**/*.tsx'],
	theme: {
		fontFamily: {
			sans: ['Inter', 'Poppins', ...defaultConfig.theme.fontFamily.sans]
		},
		colors: {
			"green": {
				500: "#3E5D59",
				600: "#38534F",
				700: "#2A413E",
				800: "#1A2724",
			},
			"gray": "#ADB1B8",
			"slate": "#9098B4",
			"black": "#000000",
			"white": "#FFFFFF",
		}
	},
	experimental: { optimizeUniversalDefaults: true },
	plugins: [formsPlugin]
}
module.exports = config
