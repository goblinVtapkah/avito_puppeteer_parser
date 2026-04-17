import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')

	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-Id'],
		credentials: true,
	})

	const config = new DocumentBuilder()
		.setTitle('Avito parser API')
		.setDescription('API documentation')
		.setVersion('1.0')
		.build()

	useContainer(app.select(AppModule), { fallbackOnErrors: true })

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
		}),
	)
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('docs', app, document)

	console.log(`Server is running on port ${process.env.BACKEND_PORT || 4000}`)
	await app.listen(parseInt(process.env.BACKEND_PORT || '4000'), '0.0.0.0')
}
bootstrap()
