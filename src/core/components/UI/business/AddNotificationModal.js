import {PlusOutlined} from "@ant-design/icons"
import {Button, Form, Input, Modal} from "antd"
import {useState} from "react"
import useTelegram from "../../../hooks/useTelegram"

export default function AddNotificationModal() {
	const [form] = Form.useForm()

	const [user] = useTelegram()

	const [open, setOpen] = useState(false)

	const onOk = async () => {
		try {
			const values = await form.validateFields()
			console.log(values)
		} catch (e) {
			console.error(e)
		}
	}

	const onCancel = () => setOpen(false)
	const handleClick = () => setOpen(true)

	return (
		<>
			{user.id == 190423552 && <Button icon={<PlusOutlined />} onClick={handleClick} size='small' />}
			<Modal open={open} title='Добавление уведомления' cancelText='Отмена' okText='Добавить' onOk={onOk} onCancel={onCancel}>
				<Form form={form}>
					<Form.Item label='Тикер' name='ticker' rules={[{required: true, message: "Введите тикер"}]}>
						<Input placeholder='Введите тикер' />
					</Form.Item>
					<Form.Item label='Значение' name='value'>
						<Input type='number' />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}
