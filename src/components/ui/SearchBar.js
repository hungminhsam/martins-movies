/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import { MoviesDataContext } from '../../contexts/MoviesDataContext'
import apiConfig from '../../config/apiConfig'

const { API_KEY, DEFAULT_LANG, BASE_URL, API_VERSION, SEARCH_KEYWORD_PATH } = apiConfig

export default function SearchBar({ onClose }) {
	const { updateFetchUrl } = useContext(MoviesDataContext)

	const [keyword, setKeyword] = useState('')

	const onEnter = event => {
		if (event.key === 'Enter' && keyword.trim().length > 0) {
			// build the search url and update the MoviesDataContext
			const url = `${BASE_URL}/${API_VERSION}/${SEARCH_KEYWORD_PATH}?api_key=${API_KEY}&language=${DEFAULT_LANG}&query=${keyword}`
			updateFetchUrl(url)
		}
	}

	return (
		<FormControl
			sx={{
				m: 0,
				width: 1,
				zIndex: 100,
				position: 'absolute',
				left: 0,
				bgcolor: 'background.default',
				height: '70px',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center'
			}}>
			<InputBase
				sx={{ width: 1, paddingLeft: '30px', paddingRight: '15px' }}
				placeholder="Type and hit enter..."
				value={keyword}
				onChange={event => setKeyword(event.target.value)}
				onKeyDown={onEnter}
				endAdornment={
					<InputAdornment position="end">
						<IconButton onClick={onClose}>
							<CloseIcon />
						</IconButton>
					</InputAdornment>
				}
				inputProps={{
					'aria-label': 'keyword search'
				}}
			/>
		</FormControl>
	)
}
