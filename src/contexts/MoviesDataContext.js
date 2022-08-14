/* eslint-disable react/prop-types */
import { createContext } from 'react'
import useMoviesData from '../hooks/useMoviesData'

const MoviesDataContext = createContext()
function MoviesDataContextProvider({ children }) {
	const data = useMoviesData()

	return <MoviesDataContext.Provider value={data}>{children}</MoviesDataContext.Provider>
}

export { MoviesDataContext, MoviesDataContextProvider }
