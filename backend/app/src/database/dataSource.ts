import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import { typeOrmConfig } from './typeorm.config'

dotenv.config()

export const AppDataSource = new DataSource(typeOrmConfig())
