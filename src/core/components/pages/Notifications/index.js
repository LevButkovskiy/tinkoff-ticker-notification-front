import {Collapse, Divider, List, Space} from "antd"
import {memo, useCallback, useEffect, useMemo, useState} from "react"
import useTelegram from "../../../hooks/useTelegram"
import apiRequest from "../../../utils/request"
import AddNotificationModal from "../../business/AddNotificationModal"
import NotificationListItem from "../../business/NotificationListItem"

function Notifications() {
	const [user] = useTelegram()

	const [notifications, setNotifications] = useState([])

	const requestNotifications = useCallback(() => {
		if (!user?.id) return
		apiRequest("/notifications", {chatId: user.id})
			.then((res) => setNotifications(res?.list))
			.catch((e) => console.error(e))
	}, [user?.id])

	useEffect(() => requestNotifications(), [requestNotifications])

	const collapseItems = useMemo(
		() => [
			{
				key: "active",
				label: "Активные",
				children: (
					<List
						dataSource={notifications.filter((e) => !e.fulfilled)}
						renderItem={(item) => <NotificationListItem item={item} update={requestNotifications} />}
					/>
				),
			},
			{
				key: "archive",
				label: "Завершенные",
				children: (
					<List
						dataSource={notifications.filter((e) => e.fulfilled)}
						renderItem={(item) => <NotificationListItem item={item} update={requestNotifications} />}
					/>
				),
			},
		],
		[notifications, requestNotifications],
	)

	return (
		<>
			<Divider orientation='left'>
				<Space>
					Уведомления <AddNotificationModal update={requestNotifications} />
				</Space>
			</Divider>
			<Collapse ghost expandIconPosition='end' defaultActiveKey={["active"]} items={collapseItems} />
		</>
	)
}

export default memo(Notifications)
