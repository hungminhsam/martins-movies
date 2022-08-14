/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box } from '@mui/material'
import apiConfig from '../../config/apiConfig'
import { MovieDetailsButton } from './MovieDetailsButton'
import defaultImage from '../../assets/poster-1.jpeg'

const { IMAGE_BASE_URL, DEFAUTL_POSTER_SIZE } = apiConfig
const imageUrl = `${IMAGE_BASE_URL}/${DEFAUTL_POSTER_SIZE}`

export default function MovieCard({
	id,
	title,
	overview,
	vote_average,
	genre_ids,
	poster_path,
	genres,
	isWatched,
	toggleMovieWatchedStatus
}) {
	return (
		<Card>
			<CardMedia
				component="img"
				alt="starwars"
				height="380"
				// eslint-disable-next-line camelcase
				image={poster_path ? `${imageUrl}/${poster_path}` : defaultImage}
			/>
			<Box sx={{ p: 2 }}>
				<CardContent>
					<Typography gutterBottom variant="h6" component="div">
						{title}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}>
						<Typography
							gutterBottom
							variant="body2"
							component="div"
							color="text.secondary"
							sx={{ fontSize: '0.6rem' }}>
							<Typography component="span" color="common.yellow" sx={{ fontSize: '0.6rem' }}>
								&#9733;
							</Typography>{' '}
							{vote_average}/10
						</Typography>
						<Typography
							gutterBottom
							variant="body2"
							component="div"
							color="text.secondary"
							sx={{ fontSize: '0.6rem' }}>
							{genres &&
								genre_ids
									.map(id => genres[id])
									.slice(0, 2)
									.join(', ')}
						</Typography>
					</Box>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{
							// TODO
							// truncate the text, display ellipse
							height: '160px',
							overflow: 'hidden',
							whiteSpace: 'normal',
							textOverflow: 'ellipsis'
						}}>
						{overview}
					</Typography>
				</CardContent>
				<CardActions
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}>
					<MovieDetailsButton id={id} />
					<IconButton size="small" onClick={() => toggleMovieWatchedStatus(id)}>
						{isWatched ? (
							<VisibilityIcon color="primary" />
						) : (
							<VisibilityIcon sx={{ color: 'common.light' }} />
						)}
					</IconButton>
				</CardActions>
			</Box>
		</Card>
	)
}
