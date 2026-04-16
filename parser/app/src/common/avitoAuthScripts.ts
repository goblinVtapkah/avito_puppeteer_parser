import { Page } from 'puppeteer'
import { clickElement, getElementOrNull, input, typeToElement } from './utils'

const confirmTelephone = async (page: Page): Promise<void> => {
	// если просит код авторизации с телефона
	if (await getElementOrNull(page, '[data-marker="phone-confirm/code-input/input"]')) {
		// первый вход вводим код
		const messageCode = await input(`Введите в браузере ссылку http://localhost:3456/{code},
			где {code} это пришедший код с авито на телефон или выполните
			curl -X GET http://localhost:3456/{code}`)

		// находим поле ввода кода подтверждения, вводим
		await typeToElement(page, '[data-marker="phone-confirm/code-input/input"]', messageCode)

		// находим кнопку отправки кликаем
		await clickElement(page, '[data-marker="phone-confirm/confirm"]')
		
		// ожидаем кнопку профиля, проверяем на авторизованность
		await getElementOrNull(page, '[data-marker="header/menu-profile"]')
	}
}

export const loginAvito = async (page: Page): Promise<void> => {
	// ожидаем кнопку профиля, проверяем на авторизованность
	if (!await getElementOrNull(page, '[data-marker="header/menu-profile"]')) {
		// находим кнопку открывающую попап с формой входа, получаем параметры его позиции и размеры, эмулируем движение и клик мыши
		await clickElement(page, '[data-marker="header/login-button"]')

		// находим поле ввода логина, получаем параметры его позиции и размеры, эмулируем движение и клик мыши и ввод текста
		await typeToElement(page, '[data-marker="login-form/login/input"]', process.env.AVITO_PHONE_NUMBER!)

		// находим поле ввода пароля, получаем параметры его позиции и размеры, эмулируем движение и клик мыши и ввод текста
		await typeToElement(page, '[data-marker="login-form/password/input"]', process.env.AVITO_PASSWORD!)

		// находим кнопку входа, получаем параметры его позиции и размеры, эмулируем движение и клик мыши
		await clickElement(page, '[data-marker="login-form/submit"]')

		// подтверждение кода с телефона
		await confirmTelephone(page)
	}
}