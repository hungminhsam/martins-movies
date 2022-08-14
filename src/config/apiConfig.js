const API_KEY = process.env.REACT_APP_API_KEY
const DEFAULT_LANG = 'en-US'
const BASE_URL = 'https://api.themoviedb.org'
const API_VERSION = 3
const GENRES_PATH = 'genre/movie/list'
const GENRES_URL = `${BASE_URL}/${API_VERSION}/${GENRES_PATH}?api_key=${API_KEY}&language=${DEFAULT_LANG}`
const NOW_PLAYING_PATH = 'movie/now_playing'
const DEFAULT_FETCH_URL = `${BASE_URL}/${API_VERSION}/${NOW_PLAYING_PATH}?api_key=${API_KEY}&language=${DEFAULT_LANG}`
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
const DEFAUTL_POSTER_SIZE = 'w500'
const MOVIE_DETAILS_PATH = 'movie'
const SEARCH_KEYWORD_PATH = 'search/movie'

const apiConfig = {
	API_KEY,
	DEFAULT_LANG,
	BASE_URL,
	API_VERSION,
	NOW_PLAYING_PATH,
	GENRES_PATH,
	GENRES_URL,
	DEFAULT_FETCH_URL,
	IMAGE_BASE_URL,
	DEFAUTL_POSTER_SIZE,
	MOVIE_DETAILS_PATH,
	SEARCH_KEYWORD_PATH
}

export default apiConfig
