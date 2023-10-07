import {PlusOutlined} from "@ant-design/icons"
import {Button, Form, Input, Modal, message} from "antd"
import {useState} from "react"
import useTelegram from "../../hooks/useTelegram"
import apiRequest from "../../utils/request"

export default function AddNotificationModal({update}) {
	const [form] = Form.useForm()

	const [user] = useTelegram()

	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const addNotificationRequest = async (values) => {
		setLoading(true)
		try {
			await apiRequest(
				"/notifications",
				{chatId: user.id},
				{
					method: "POST",
					body: values,
				},
			)
			message.success("Уведомление добавлено")
			setOpen(false)
			update()
			form.resetFields()
		} catch (e) {
			message.error(e.message)
		} finally {
			setLoading(false)
		}
	}

	const onOk = async () => {
		try {
			const values = await form.validateFields()
			addNotificationRequest(values)
		} catch (e) {}
	}

	const onCancel = () => setOpen(false)
	const handleClick = () => setOpen(true)

	return (
		<>
			<Button icon={<PlusOutlined />} onClick={handleClick} size='small' />
			<Modal loading={loading} open={open} title='Добавление уведомления' cancelText='Отмена' okText='Добавить' onOk={onOk} onCancel={onCancel}>
				<Form form={form}>
					<Form.Item label='Тикер' name='ticker' rules={[{required: true, message: "Введите тикер"}]}>
						<Input placeholder='Введите тикер' />
					</Form.Item>
					<Form.Item label='Цена' name='value' rules={[{required: true, message: "Введите цену"}]}>
						<Input type='number' placeholder='Введите цену' />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}
