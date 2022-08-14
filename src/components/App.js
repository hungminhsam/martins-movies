import { ThemeProvider } from '@mui/material/styles'
import theme from '../assets/theme'
import Header from './layout/Header'
import Main from './layout/Main'
import Footer from './layout/Footer'
import ScrollTop from './ui/ScrollToTop'
import Fab from '@mui/material/Fab'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import CssBaseline from '@mui/material/CssBaseline'
import { MoviesDataContextProvider } from '../contexts/MoviesDataContext'

function App() {
	return (
		<ThemeProvider theme={theme}>
			<MoviesDataContextProvider>
				<CssBaseline />
				<Header />
				<Main />
				<Footer />
				<ScrollTop>
					<Fab size="large" aria-label="scroll back to top" color="primary">
						<KeyboardArrowUpIcon />
					</Fab>
				</ScrollTop>
			</MoviesDataContextProvider>
		</ThemeProvider>
	)
}

export default App
