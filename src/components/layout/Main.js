import { useContext, useEffect, useState } from 'react'
import { Box, Container, Grid, styled, Typography } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import { MoviesDataContext } from '../../contexts/MoviesDataContext'
import MovieCard from '../ui/MovieCard'
import CircularLoading from '../ui/CircularLoading'
import appConfig from '../../config/appConfig'

const { ITEMS_PER_PAGE } = appConfig

const Loading = styled(Box)({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: '100'
})

export default function Main() {
	const { isReady, totalCounts, genres, watched, fetchUrl, toggleMovieWatchedStatus, getRange } =
		useContext(MoviesDataContext)

	const [page, setPage] = useState(1)
	const [movies, setMovies] = useState([])

	const handlePageChange = (event, value) => {
		setPage(value)
	}

	// load the movies of the selected page
	useEffect(() => {
		if (!isReady || !totalCounts || totalCounts.movies === 0) return
		;(async function () {
			try {
				// startIndex is between 1 and the total results returned by the api
				const startIndex = page * ITEMS_PER_PAGE - (ITEMS_PER_PAGE - 1)
				const m = await getRange(startIndex, ITEMS_PER_PAGE)
				setMovies(m)
			} catch (error) {
				// error throws by getRange is indicating that more data is being loaded from the api
			}
		})()
	}, [page, isReady, totalCounts, getRange])

	useEffect(() => {
		// reset the pagination when the fetchUrl changes
		setPage(1)
	}, [fetchUrl])

	return (
		<Box
			sx={{
				position: 'relative',
				width: '100%',
				bgcolor: 'background.light',
				padding: '100px 0',
				m: 0
			}}>
			{!isReady && (
				<Loading>
					<CircularLoading />
				</Loading>
			)}
			<Container>
				<Grid container spacing={4}>
					{
						// api return no results
						isReady && totalCounts && totalCounts.movies === 0 && (
							<Grid item xs={12} sx={{ textAlign: 'center' }}>
								<Typography variant="body">No results</Typography>
							</Grid>
						)
					}
					{isReady &&
						totalCounts &&
						totalCounts.movies !== 0 &&
						movies.length > 0 &&
						movies[0] &&
						movies.map(movie => (
							<Grid item xs={12} sm={6} md={4} key={movie.id}>
								<MovieCard
									{...movie}
									genres={genres}
									isWatched={watched[movie.id]}
									toggleMovieWatchedStatus={toggleMovieWatchedStatus}
								/>
							</Grid>
						))}
				</Grid>
				{
					<Box
						sx={{
							mt: '50px',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center'
						}}>
						<Pagination
							count={
								isReady && totalCounts && totalCounts.movies !== 0
									? Math.floor(totalCounts.movies / ITEMS_PER_PAGE)
									: 0
							}
							page={isReady && totalCounts && totalCounts.movies !== 0 ? page : 0}
							color="primary"
							onChange={handlePageChange}
						/>
					</Box>
				}
			</Container>
		</Box>
	)
}
