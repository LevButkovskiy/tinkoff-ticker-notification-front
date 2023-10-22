import {CheckCircleOutlined, DeleteOutlined, PlusCircleOutlined} from "@ant-design/icons"
import {Avatar, Button, List} from "antd"
import dayjs from "dayjs"
import useTelegram from "../../hooks/useTelegram"
import apiRequest from "../../utils/request"

export default function NotificationListItem({item, update = () => {}}) {
	const [user] = useTelegram()

	const handleDelete = (id) => (event) => {
		apiRequest("/notifications", {chatId: user?.id, notificationId: id}, {method: "DELETE"})
			.then(update)
			.catch((e) => console.error(e))
	}

	return (
		<List.Item actions={!item.fulfilled ? [<Button size='small' danger onClick={handleDelete(item._id)} icon={<DeleteOutlined />} />] : ["Выполнено"]}>
			<List.Item.Meta
				avatar={
					item.figi ? (
						<Avatar size='small' src={`https://raw.githubusercontent.com/Mixolap/bondana_images/main/stocks/${item.figi}.png`} />
					) : (
						<Avatar size='small'>{item.ticker[0]}</Avatar>
					)
				}
				title={`${item.ticker} - ${item.value}`}
				description={
					<>
						{item.fulfilled ? <CheckCircleOutlined /> : <PlusCircleOutlined />} {dayjs(item.fulfilled || item.createdAt).format("DD.MM.YYYY HH:mm")}
					</>
				}
			/>
		</List.Item>
	)
}
