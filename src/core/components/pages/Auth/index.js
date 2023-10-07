import {Button, Form, Input, Typography} from "antd"
import {useEffect, useState} from "react"

export default function Auth() {
	const [form] = Form.useForm()
	const [showCodeForm, setShowCodeForm] = useState(false)

	const [timer, setTimer] = useState(60)

	useEffect(() => {
		if (!showCodeForm) return
		if (showCodeForm && timer === 0) {
			setShowCodeForm(false)
			setTimer(60)
			form.setFieldValue("code", "")
			return
		}
		const t = setTimeout(() => setTimer((prev) => prev - 1), 1000)
		return () => {
			clearTimeout(t)
		}
	}, [form, timer, showCodeForm])

	return (
		<>
			<Typography.Title level={3}>Войти с помощью Telegram</Typography.Title>
			<Form size='large' form={form} onFinish={() => setShowCodeForm(true)}>
				<Form.Item label='Логин' name='login' rules={[{required: true, message: "Введите логин"}]}>
					<Input placeholder='Ваш username' addonBefore='@' />
				</Form.Item>
				{showCodeForm && (
					<Form.Item label='Код' name='code' rules={[{required: true, message: "Введите код"}]} extra={`Код будет действовать ${timer}c`}>
						<Input placeholder='Код из сообщения' type='number' pattern='\d*' />
					</Form.Item>
				)}
				<Form.Item>
					<Button block type='primary' htmlType='sumbit'>
						Войти по коду
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}
