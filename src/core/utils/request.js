import createHttpError from "http-errors"

const BASE_URL = process.env.REACT_APP_NODE_ENV === "development" ? "http://localhost:3005" : process.env.REACT_APP_API_URL

export default async function apiRequest(path, query = {}, options = {}) {
	try {
		const {method = "GET", body} = options

		const queryParams = new URLSearchParams(query).toString()
		const url = `${BASE_URL}${path}?${queryParams}`
		const res = await fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			...(body ? {body: JSON.stringify(body)} : {}),
		})
		const json = await res.json()
		if (!res.ok) {
			throw createHttpError(res.status, res.statusText, json)
		}
		return json
	} catch (error) {
		console.error(error)
		throw Error(error)
	}
}
