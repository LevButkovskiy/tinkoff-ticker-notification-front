import {useEffect, useState} from "react"

const tg = window?.Telegram?.WebApp
export default function useTelegram() {
	const [user, setUser] = useState(window?.Telegram?.WebApp?.initDataUnsafe?.user)

	useEffect(() => {
		if (!tg) return
		tg.ready()
		tg.setBackgroundColor(tg.themeParams.secondary_bg_color)
		tg.setHeaderColor(tg.themeParams.secondary_bg_color)
	}, [])

	return [user]
}
