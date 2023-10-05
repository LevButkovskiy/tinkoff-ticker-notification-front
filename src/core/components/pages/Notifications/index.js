import {Button, Divider, List} from "antd"
import {useEffect, useState} from "react"
import useTelegram from "../../../hooks/useTelegram"
import apiRequest from "../../../utils/request"

export default function Notifications() {
	const [user] = useTelegram()

	const [notifications, setNotifications] = useState([])

	useEffect(() => {
		const requestNotifications = () => {
			apiRequest("/notifications", {chatId: user?.id || 190423552})
				.then((res) => setNotifications(res?.list))
				.catch((e) => console.error(e))
		}

		requestNotifications()
	}, [user])

	return (
		<>
			<Divider orientation='left'>Уведомления</Divider>
			<List
				dataSource={notifications}
				renderItem={(item) => (
					<List.Item actions={!item.fulfilled ? [<Button danger>Удалить</Button>] : ["Исполнено"]}>
						<List.Item.Meta title={item.ticker} description={`Когда цена ${item.operator === "$gte" ? "больше" : "меньше"} ${item.value}`} />
					</List.Item>
				)}
			/>
		</>
	)
}
