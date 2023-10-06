import {InfoCircleOutlined, InfoCircleTwoTone, NotificationOutlined, NotificationTwoTone} from "@ant-design/icons"
import Auth from "../components/pages/Auth"
import Notifications from "../components/pages/Notifications"

const EmptyPage = () => <div>Тут пока ничего</div>
export const PAGES = {
	auth: {
		Component: Auth,
		hidden: true,
	},
	notifications: {
		tabbar: true,
		title: "Уведомления",
		Component: Notifications,
		icon: <NotificationOutlined />,
		iconActive: <NotificationTwoTone />,
	},
	info: {
		tabbar: true,
		title: "О приложении",
		Component: EmptyPage,
		icon: <InfoCircleOutlined />,
		iconActive: <InfoCircleTwoTone />,
	},
}
