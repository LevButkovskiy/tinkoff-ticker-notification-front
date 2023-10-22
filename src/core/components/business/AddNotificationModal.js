import {Button, Form, Input, Modal, Select, message} from "antd"
import {useEffect, useState} from "react"

import {PlusOutlined} from "@ant-design/icons"
import useTelegram from "../../hooks/useTelegram"
import apiRequest from "../../utils/request"

export default function AddNotificationModal({update}) {
	const [messageApi, contextHolder] = message.useMessage()

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
		values.value = values.value.replace(",", ".")
		if (isNaN(values.value)) return messageApi.error("Введено не число")
		setLoading(true)
		try {
			await apiRequest(
				"/notifications",
				{chatId: user.id},
				{
					method: "POST",
					body: {...values, value: +values.value},
				},
			)
			messageApi.open({type: "success", content: "Уведомление добавлено", duration: 0.5})
			setOpen(false)
			update()
			form.resetFields()
		} catch (e) {
			messageApi.error(e.message)
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

	const ticker_options = instruments.map((t) => ({label: `${t.countryOfRisk} ${t.ticker}`, value: t.figi}))

	const filterOption = (input, {label, value}) => (label ?? "").toLowerCase().includes(input.toLowerCase())
	return (
		<>
			{contextHolder}
			<Button icon={<PlusOutlined />} onClick={handleClick} size='small' />
			<Modal loading={loading} open={open} title='Добавление уведомления' cancelText='Отмена' okText='Добавить' onOk={onOk} onCancel={onCancel}>
				<Form form={form}>
					<Form.Item label='Тикер' name='figi' rules={[{required: true, message: "Выберите тикер"}]}>
						<Select options={ticker_options} placeholder='Выберите тикер' showSearch filterOption={filterOption} />
					</Form.Item>
					<Form.Item
						label='Цена'
						name='value'
						validateFirst
						rules={[
							{required: true, message: "Введите цену"},
							() => ({
								validator(_, value) {
									value = +value?.replace(",", ".")
									if (isNaN(value)) return Promise.reject("Нужно ввести число")
									return Promise.resolve()
								},
							}),
						]}
					>
						<Input placeholder='Введите цену' style={{width: "100%"}} inputMode='decimal' min={0} />
					</Form.Item>
					<Form.Item label='Комментарий' name='comment'>
						<Input placeholder='Комментарий' />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}
