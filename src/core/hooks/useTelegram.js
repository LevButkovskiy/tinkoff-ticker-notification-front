import {useEffect} from "react"

const tg = window?.Telegram?.WebApp

export default function useTelegram() {
	useEffect(() => {
		if (!tg) return
		tg.ready()
		tg.setBackgroundColor(tg.themeParams.secondary_bg_color)
		tg.setHeaderColor(tg.themeParams.secondary_bg_color)
	}, [])

	return [process.env.NODE_ENV === "development" ? {id: 190423552} : window?.Telegram?.WebApp?.initDataUnsafe?.user]
}
