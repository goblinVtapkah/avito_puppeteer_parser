import { ElementHandle, Page, TimeoutError } from 'puppeteer'
import { setTimeout } from 'timers/promises'
import express from 'express'

// Запускаем сервер, чтобы отправить код по ендпоинту
export const input = (text: string): Promise<string> => new Promise((resolve) => {
	console.log(text)
	const app = express()
	app.use(express.json())

	const server = app.listen(3456)

	app.get('/:code', (req, res) => {
		const code = req.params.code
		res.send("ok")
		server.close(() => console.log("Server for input close."))
		resolve(code)
	})

})

// логика для ретраев
export const retry = async (func: () => Promise<void>, tryTimes: number): Promise<boolean> => {
	// Повторы
	for (let t = 0; t < tryTimes; t++) {
		try {
			await func()
			return true
		} catch (error) {
			// Обработка ошибок, поддерживается только для TimeoutError
			if (error instanceof TimeoutError) {
				console.error(error)
				continue
			} else {
				throw error
			}
		}
	}
	return false
}

// Обёртка, чтобы не кидал ошибку по таймауту
export const getElementOrNull = async (page: Page, selector: string): Promise<ElementHandle<Element> | null> => {
	try {
		return await page.waitForSelector(selector)
	} catch {
		return null
	}
}

// клик по кнопке с ожиданием элемента
export const clickElement = async (page: Page, selector: string, timeout: number = 100000): Promise<void> => {
	const element = await page.waitForSelector(selector, { timeout })
	await element!.click()
}


// ввод в инпут с ожиданием элемента
export const typeToElement = async (page: Page, selector: string, value: string, timeout: number = 100000): Promise<void> => {
	const element = await page.waitForSelector(selector, { timeout })
	await element!.type(value)
	await setTimeout(100)
}