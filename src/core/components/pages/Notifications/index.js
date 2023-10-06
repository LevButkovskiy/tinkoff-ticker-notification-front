import {CheckCircleOutlined, DeleteOutlined, PlusCircleOutlined} from "@ant-design/icons"
import {Avatar, Button, Divider, List, Space} from "antd"
import dayjs from "dayjs"
import {memo, useCallback, useEffect, useState} from "react"
import useTelegram from "../../../hooks/useTelegram"
import apiRequest from "../../../utils/request"
import AddNotificationModal from "../../UI/business/AddNotificationModal"

function Notifications() {
	const [user] = useTelegram()

	const [notifications, setNotifications] = useState([])

	const requestNotifications = useCallback(() => {
		if (!user?.id) return
		apiRequest("/notifications", {chatId: user.id})
			.then((res) => setNotifications(res?.list))
			.catch((e) => console.error(e))
	}, [user?.id])

	const handleDelete = (id) => (event) => {
		apiRequest("/notifications", {chatId: user?.id, notificationId: id}, {method: "DELETE"})
			.then(requestNotifications)
			.catch((e) => console.error(e))
	}

	useEffect(() => requestNotifications(), [requestNotifications])

	return (
		<>
			<Divider orientation='left'>
				<Space>
					Уведомления <AddNotificationModal />
				</Space>
			</Divider>
			<List
				dataSource={notifications}
				renderItem={(item) => (
					<List.Item
						actions={!item.fulfilled ? [<Button size='small' danger onClick={handleDelete(item._id)} icon={<DeleteOutlined />} />] : ["Выполнено"]}
					>
						<List.Item.Meta
							avatar={
								item.logoUrl || item.ticker === "SBER" ? (
									<Avatar
										size='small'
										src='https://static-sl.insales.ru/r/ignKT1j0mSQ/rs:fit:1920:1920:1/plain/files/1/1135/15860847/original/android-chrome-192x192.png@jpg'
									/>
								) : (
									<Avatar size='small'>{item.ticker[0]}</Avatar>
								)
							}
							title={`${item.ticker} - ${item.value}`}
							description={
								<>
									{item.fulfilled ? <CheckCircleOutlined /> : <PlusCircleOutlined />}{" "}
									{dayjs(item.fulfilled || item.createdAt).format("DD.MM.YYYY HH:mm")}
								</>
							}
						/>
					</List.Item>
				)}
			/>
		</>
	)
}

export default memo(Notifications)
