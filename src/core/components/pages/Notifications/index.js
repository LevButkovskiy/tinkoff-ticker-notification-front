import {Button, Divider, List} from "antd"
import {memo, useCallback, useEffect, useState} from "react"
import useTelegram from "../../../hooks/useTelegram"
import apiRequest from "../../../utils/request"

function Notifications() {
	const [user] = useTelegram()

	const [notifications, setNotifications] = useState([])

	const requestNotifications = useCallback(() => {
		apiRequest("/notifications", {chatId: user?.id})
			.then((res) => setNotifications(res?.list))
			.catch((e) => console.error(e))
	}, [user])

	const handleDelete = (id) => (event) => {
		apiRequest("/notifications", {chatId: user?.id, notificationId: id}, {method: "DELETE"})
			.then(requestNotifications)
			.catch((e) => console.error(e))
	}

	useEffect(() => requestNotifications(), [requestNotifications])

	return (
		<>
			<Divider orientation='left'>Уведомления</Divider>
			<List
				dataSource={notifications}
				renderItem={(item) => (
					<List.Item
						actions={
							!item.fulfilled
								? [
										<Button danger onClick={handleDelete(item._id)}>
											Удалить
										</Button>,
								  ]
								: ["Исполнено"]
						}
					>
						<List.Item.Meta title={item.ticker} description={`Когда цена ${item.operator === "$gte" ? "больше" : "меньше"} ${item.value}`} />
					</List.Item>
				)}
			/>
		</>
	)
}

export default memo(Notifications)
