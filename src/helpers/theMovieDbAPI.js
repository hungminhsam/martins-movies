export async function fetchFromTheMovieDbAPI(url) {
	const response = await fetch(url)
	const data = await response.json()
	if (!response.ok) {
		// see the API Documentation
		// https://developers.themoviedb.org
		throw new Error(data.status_message)
	}

	return data
}

// index start with 1, not 0
export function toPageNoAndOffset(index, pageSize) {
	// from the index
	// we can determine the pageNo and the offset
	let pageNo, offset
	const remainder = index % pageSize
	if (remainder === 0) {
		pageNo = index / pageSize
		offset = pageSize
	} else {
		pageNo = Math.ceil(index / pageSize)
		offset = remainder
	}

	return [pageNo, offset]
}
