import { useEffect, useState } from 'react'
import localforage from 'localforage'
import apiConfig from '../config/apiConfig'
import { fetchFromTheMovieDbAPI, toPageNoAndOffset } from '../helpers/theMovieDbAPI'

const { DEFAULT_FETCH_URL, GENRES_URL } = apiConfig

function useMoviesData() {
	const [isReady, setIsReady] = useState(false)
	const [isFetchingFromAPI, setIsFetchingFromAPI] = useState(false)
	const [fetchingError, setFetchingError] = useState(null)
	const [localStorageError, setLocalStorageError] = useState(null)

	// { genre_id: genre_name}
	const [genres, setGenres] = useState(null)

	// list of movies marked as watched
	// must be synced with local storage at all time
	// { movie_id: true}
	const [watched, setWatched] = useState({})

	// store the current fetch url
	const [fetchUrl, setFetchUrl] = useState(DEFAULT_FETCH_URL)

	// the total number of pages and the total number of movies returned by the api for this query
	// moviesPerPage is the length of each page return by the api (except the last page)
	// {pages: 0, movies: 0, moviesPerPage: 0}
	const [totalCounts, setTotalCounts] = useState(null)

	// store the movies fetched from the API
	// { "1": [...], "2": [...], "50": [...]}
	const [fetchedMovies, setFetchedMovies] = useState(null)

	// when first starting the app
	// load "watched movies" from local storage
	// fetch the genres data from the api
	useEffect(() => {
		// load the watched movies from local storage
		;(async function () {
			try {
				const storedValue = await localforage.getItem('watched')
				if (storedValue) {
					setWatched(storedValue)
				}
				setLocalStorageError(null)
			} catch (error) {
				setLocalStorageError(error.message)
			}
		})()

		// fetch the genres
		;(async function () {
			try {
				const data = await fetchFromTheMovieDbAPI(GENRES_URL)
				setFetchingError(null)
				const g = {}
				data.genres.forEach(el => {
					g[el.id] = el.name
				})
				setGenres(g)
			} catch (error) {
				setFetchingError(error.message)

				// TODO
				// when fail to load genres data from the api
				// - need to implement a retry strategy
				// - or load a saved version from the local storage
			}
		})()
	}, [])

	// Fetch the Movies using DEFAULT_FETCH_URL when starting the first time and every time the fetchUrl is changed
	// only fetch the first page (page 1)
	useEffect(() => {
		;(async function () {
			try {
				setIsFetchingFromAPI(true)
				const data = await fetchFromTheMovieDbAPI(`${fetchUrl}&page=1`)

				// after fetching the first page of a query from the API
				// we get the back in the data
				// - the total number of pages
				// - the total number of movies
				// - and a page of movies
				setTotalCounts({
					pages: data.total_pages,
					movies: data.total_results,
					moviesPerPage: data.results.length
				})
				setFetchedMovies({ 1: data.results })
				setFetchingError(null)
			} catch (error) {
				setFetchingError(error.message)
			}
			setIsFetchingFromAPI(false)
		})()
	}, [fetchUrl])

	// save the watched list to local storage whenever it changes
	useEffect(() => {
		;(async function () {
			try {
				await localforage.setItem('watched', watched)
				setLocalStorageError(null)
			} catch (error) {
				setLocalStorageError(error.message)
			}
		})()
	}, [watched])

	// set the isReady to true, indicating the app is ready
	useEffect(() => {
		if (fetchedMovies && totalCounts) {
			setIsReady(true)
		}
	}, [totalCounts, fetchedMovies])

	const toggleMovieWatchedStatus = id => {
		setWatched(prev => {
			if (id in prev) {
				delete prev[id]
				return { ...prev }
			}
			return { ...prev, [id]: true }
		})
	}

	const updateFetchUrl = newUrl => {
		// when the fetchUrl is updated
		// the app will not be ready until the first page is loaded
		setIsReady(false)
		setFetchUrl(newUrl)
	}

	// fetch a specific page froom the api
	const fetchPage = async pageNo => {
		if (typeof pageNo !== 'number') return
		try {
			const data = await fetchFromTheMovieDbAPI(`${fetchUrl}&page=${pageNo}`)
			setFetchedMovies(prev => ({ ...prev, [pageNo]: data.results }))
			setFetchingError(null)
		} catch (error) {
			setFetchingError(error.message)
		}
	}

	// TODO
	// the fetchPage may fail, we need to handle that
	// even if fetchPage succeeded, the state update is async
	// so the page may not be available
	// If require more fetching from the api, must make sure to wait for the fetch
	// This function must return valid data or throw error
	//
	// movie index start from 1
	const getMovieAtIndex = async index => {
		if (!isReady) {
			throw new Error('Movie data is not ready')
		}

		// from the index
		// we can determine the pageNo and the offset
		const [pageNo, offset] = toPageNoAndOffset(index, totalCounts.moviesPerPage)
		if (!fetchedMovies[pageNo]) {
			// go and fetch the page
			// after the page has been fetched
			// the fetchedMovies state will be updated
			// which then will set the isReady to true
			setIsReady(false)
			await fetchPage(pageNo)

			// cannot fetch the required data
			// caller must catch this error and retry
			throw new Error('More data is being loaded from the api')
		}
		return fetchedMovies[pageNo][offset - 1]
	}

	// return the movies in the specified range
	// start: (between 1 and totalCounts.movies)
	// len: number of items to return
	const getRange = async (start, len) => {
		// TODO
		// prefetch pages surrounding the current page

		// return the movies, fetch data from the api if needed
		const results = []
		for (let i = 0; i < len; i++) {
			const item = await getMovieAtIndex(start + i)
			if (item) {
				results.push(item)
			}
		}
		return results
	}

	return {
		isReady,
		isFetchingFromAPI,
		fetchingError,
		localStorageError,
		totalCounts,
		genres,
		watched,
		fetchUrl,
		toggleMovieWatchedStatus,
		updateFetchUrl,
		getRange
	}
}

export default useMoviesData
