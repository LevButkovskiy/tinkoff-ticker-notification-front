import {useState} from "react"
import {PAGES} from "../constants/pages"
import Layout from "./UI/Layout"
import TabBar from "./UI/TabBar"

export default function SPARender() {
	const [currentPage, setCurrentPage] = useState("notifications")
	const page = PAGES[currentPage]

	return (
		<>
			<Layout>{page ? <page.Component /> : "Page not found"}</Layout>
			{false && <TabBar currentPage={currentPage} setCurrentPage={setCurrentPage} />}
		</>
	)
}
