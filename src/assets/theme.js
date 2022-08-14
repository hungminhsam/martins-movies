import { createTheme } from '@mui/material/styles'

const mmPurple = '#9352b3'
const mmGreen = '#11cb5f'
const mmRed = '#a11f3c'
const mmYellow = '#ffc741'
const mmLight = '#edf5f7'
const mmDark = '#3e4555'

export default createTheme({
	palette: {
		common: {
			purple: `${mmPurple}`,
			green: `${mmGreen},`,
			red: `${mmRed}`,
			yellow: `${mmYellow}`,
			light: `${mmLight}`,
			dark: `${mmDark}`
		},
		primary: {
			main: `${mmPurple}`
		},
		secondary: {
			main: `${mmGreen}`
		},
		background: {
			light: `${mmLight}`,
			dark: `${mmDark}`
		},
		text: {
			light: `${mmLight}`,
			dark: `${mmDark}`
		}
	},
	typography: {}
})
