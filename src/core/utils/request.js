const BASE_URL = process.env.REACT_APP_API_URL

export default async function apiRequest(path, query = {}, options = {}) {
	try {
		const {method = "GET"} = options

		const queryParams = new URLSearchParams(query).toString()
		const url = `${BASE_URL}${path}?${queryParams}`
		const res = await fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
		})
		return res.json()
	} catch (error) {
		console.error(error)
		throw Error(error)
	}
}