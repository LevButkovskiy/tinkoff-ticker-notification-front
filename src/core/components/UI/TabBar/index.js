import {Typography} from "antd"
import {PAGES} from "../../../constants/pages"
import styles from "./TabBar.module.css"

export default function TabBar({currentPage, setCurrentPage}) {
	const TABS = Object.entries(PAGES).filter(([key, value]) => value.tabbar)

	const handleClick = (key) => () => setCurrentPage(key)

	return (
		<div className={styles.tabbar}>
			{TABS.map(([key, tab]) => (
				<div key={key} className={styles.tab} style={{width: 100 / TABS?.length + "%"}} onClick={handleClick(key)}>
					<div>{key === currentPage ? tab.iconActive : tab.icon}</div>
					<Typography.Text type='secondary'>{tab.title}</Typography.Text>
				</div>
			))}
		</div>
	)
}
