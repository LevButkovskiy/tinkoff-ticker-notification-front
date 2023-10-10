import {ConfigProvider, Layout, theme} from "antd"
import locale from "antd/lib/locale/ru_RU"
import SPARender from "./core/components/SPARender"
import useTelegram from "./core/hooks/useTelegram"
import "./styles.css"

function App() {
	const {defaultAlgorithm, darkAlgorithm} = theme

	const [_, options] = useTelegram()

	return (
		<ConfigProvider
			locale={locale}
			theme={{
				algorithm: options.theme === "dark" ? darkAlgorithm : defaultAlgorithm,
			}}
		>
			<div className='app'>
				<Layout style={{height: "100vh"}}>
					<SPARender />
				</Layout>
			</div>
		</ConfigProvider>
	)
}

export default App
