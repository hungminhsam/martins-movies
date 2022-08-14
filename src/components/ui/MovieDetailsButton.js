/* eslint-disable react/prop-types */
// when clicked, this component will load the movie details from the api
// if there is an imdb_id in the data, it will redirect user the the imdb website
import { useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { Button, Snackbar, Alert } from '@mui/material'
import apiConfig from '../../config/apiConfig'
import appConfig from '../../config/appConfig'
import { fetchFromTheMovieDbAPI } from '../../helpers/theMovieDbAPI'
const { API_KEY, DEFAULT_LANG, BASE_URL, API_VERSION, MOVIE_DETAILS_PATH } = apiConfig
const { IMDB_BASE_URL, IMDB_MOVIE_DETAILS_PATH } = appConfig

function gotoImdbSite(id) {
	window.open(`${IMDB_BASE_URL}/${IMDB_MOVIE_DETAILS_PATH}/${id}`, '_blank')
}

export function MovieDetailsButton({ id }) {
	const [imdbId, setImdbId] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState(null)

	const handleClick = async () => {
		if (imdbId) {
			gotoImdbSite(imdbId)
		} else {
			setIsLoading(true)
			try {
				// fetch the movie details from the api
				const movieDetailsUrl = `${BASE_URL}/${API_VERSION}/${MOVIE_DETAILS_PATH}/${id}?api_key=${API_KEY}&language=${DEFAULT_LANG}`
				const data = await fetchFromTheMovieDbAPI(movieDetailsUrl)

				if (data.imdb_id) {
					setImdbId(data.imdb_id)
					gotoImdbSite(data.imdb_id)
				}
			} catch (error) {
				// if error, show message on snackbar
				setMessage({ text: error.message, severity: 'error' })
			}
			setIsLoading(false)
		}
	}

	const handleCloseMessage = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setMessage(null)
	}

	return (
		<>
			{isLoading ? (
				<LoadingButton loading variant="contained">
					Loading
				</LoadingButton>
			) : (
				<Button variant="contained" size="small" onClick={handleClick}>
					Learn More
				</Button>
			)}
			{message && (
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					open={Boolean(message)}
					autoHideDuration={6000}
					onClose={handleCloseMessage}>
					<Alert onClose={handleCloseMessage} severity={message.severity} sx={{ width: '100%' }}>
						{message.text}
					</Alert>
				</Snackbar>
			)}
		</>
	)
}
