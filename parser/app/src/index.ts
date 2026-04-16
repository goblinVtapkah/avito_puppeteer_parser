import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { retry } from './common/utils'
import fs from 'fs'
import { loginAvito } from './common/avitoAuthScripts'
import { getMessageHistory, getTargetChat, newMessageListen } from './common/avitoChatsScripts'
import { RefactorUser, TargetChat } from './types/chat.types'

declare global {
	interface Window {
		__staticRouterHydrationData: {
			loaderData: {
				'main-or-catalog': {
					buyerLocationProps: {
						user: {
							name: string
							hashedId: string
						}
					}
				}
			}
		}
	}
}

(async () => {

	if (
		!process.env.AVITO_PHONE_NUMBER ||
		!process.env.AVITO_PASSWORD
	) {
		throw new Error("Missing required environment variables")
	}

	puppeteer.use(StealthPlugin())

	// Запускаем эмуляцию браузера
	const browser = await puppeteer.launch({
		executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
 	 	headless: true,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--disable-gpu',
			'--no-zygote',
			'--single-process',
		]
	})

	// создаём вкладку, устанавливаем дефолтный таймаут на 100000 мс
	const page = await browser.newPage()
	page.setDefaultTimeout(100000)

	// вытаскиваем сохранённые куки и устанавливаем
	const context = page.browserContext()
	try {
		const cookies = JSON.parse(fs.readFileSync('./storage/cookies.json', 'utf8'))
		await context.setCookie(...cookies)
	} catch {}
	
	// переходим на страницу авито(делаем 3 ретрая)
	const pageResponse = await retry(async () => {
		await page.goto('https://www.avito.ru', {
			waitUntil: 'load',
		})
	}, 3)

	// Если получилось зайти на страницу
	if (pageResponse) {
		// Проходим вход в личный кабинет Авито
		await loginAvito(page)

		// Получаем имя профиля
		const profile: RefactorUser = await page.evaluate(() => {
			return {
				name: window.__staticRouterHydrationData.loaderData['main-or-catalog'].buyerLocationProps.user.name,
				id: window.__staticRouterHydrationData.loaderData['main-or-catalog'].buyerLocationProps.user.hashedId,
			}
		})

		// получаем отслеживаемый чат
		let targetChat: TargetChat | null = await getTargetChat(page)

		if (!targetChat) throw new Error('Не найден чат')
		
		// переходим на страницу чата
		const chatResponse = await retry(async () => {
			await page.goto(`https://www.avito.ru/profile/messenger/channel/${targetChat.id}`, {
				waitUntil: 'load',
			})
		}, 3)

		if (!chatResponse) throw new Error('Не загрузился чат')
		
		// получаем всю историю сообщений
		const messages = await getMessageHistory(page, targetChat.id, profile, targetChat.profile)

		// включаем прослушку на новые сообщения
		newMessageListen(page, targetChat, profile, messages)
	}

	// сохраняем куки
	const newCookies = await context.cookies()
	fs.writeFileSync(
		'./storage/cookies.json',
		JSON.stringify(newCookies, null, 2),
		'utf8',
	)

})()