import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'

import { AppModule } from './app.module'
import { NestiaSwaggerComposer } from '@nestia/sdk'

async function setupSwagger(app: INestApplication) {
	const document = await NestiaSwaggerComposer.document(app, {
		info: {
			title: 'CRM API — Swagger UI',
			description: 'Документация методов с декораторами',
		},
		servers: [
			{
				url: 'http://localhost:4000/',
				description: 'Локальный сервер разработки',
			}
		],
		beautify: true,
	})
	SwaggerModule.setup('api/swagger', app, document as any)
}


async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')

	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-Id'],
		credentials: true,
	})

	useContainer(app.select(AppModule), { fallbackOnErrors: true })

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
	await setupSwagger(app)

	console.log(`Server is running on port ${process.env.BACKEND_PORT ?? 4000}`)
	await app.listen(process.env.BACKEND_PORT ?? 4000)

}
bootstrap()
