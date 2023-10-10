import {Button, Form, Input, Modal, Select, message} from "antd"
import {useEffect, useState} from "react"

import {PlusOutlined} from "@ant-design/icons"
import useTelegram from "../../hooks/useTelegram"
import apiRequest from "../../utils/request"

export default function AddNotificationModal({update}) {
	const [form] = Form.useForm()

	const [user] = useTelegram()

	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const [instruments, setInstruments] = useState([])

	useEffect(() => {
		if (!open) return
		const requestInstruments = async () => {
			const res = await apiRequest("/instruments/tickers")
			setInstruments(res?.list)
		}
		requestInstruments()
	}, [open])

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

	const ticker_options = instruments.map((t) => ({label: t.ticker, value: t.ticker}))

	return (
		<>
			<Button icon={<PlusOutlined />} onClick={handleClick} size='small' />
			<Modal loading={loading} open={open} title='Добавление уведомления' cancelText='Отмена' okText='Добавить' onOk={onOk} onCancel={onCancel}>
				<Form form={form}>
					<Form.Item label='Тикер' name='ticker' rules={[{required: true, message: "Выберите тикер"}]}>
						<Select options={ticker_options} placeholder='Выберите тикер' showSearch />
					</Form.Item>
					<Form.Item
						label='Цена'
						name='value'
						rules={[
							{required: true, message: "Введите цену"},
							() => ({
								validator(_, value) {
									value = value?.replace(",", ".")
									if (isNaN(value)) return Promise.reject("Нужно ввести число")
									return Promise.resolve()
								},
							}),
						]}
					>
						<Input placeholder='Введите цену' style={{width: "100%"}} inputMode='decimal' min={0} />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}
