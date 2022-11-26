import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import cors from 'cors'
import express from "express"
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'

import { handleErrorStatus } from "./controllers/utils"
import { authRouter } from './routes/auth'
import { usersRouter } from './routes/users'

const app = express()

const frontendPath = process.env.ROOT_FRONTEND_FOLDER_ABSOLUTE_PATH

const corsOptions = {
	origin: process.env.CLIENT_DOMAIN,
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(`${frontendPath}/public`))

// support parsing of application/json type post data
app.use(bodyParser.json())
app.use(cookieParser())

// adds logs
app.use(morgan('combined'))

// adds more information to request header
app.use(helmet())

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
	)
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next()
})

export const apiV1Base = '/api/v1'

app.use(`${apiV1Base}/users`, usersRouter)
app.use(`${apiV1Base}/auth`, authRouter)

const port = process.env.PORT || 5000

export const dbUser = process.env.MONGO_DB_USER
export const dbPassword = process.env.MONGO_DB_PASSWORD
export const dbCluster = process.env.MONGO_DB_CLUSTER
export const dbTable = process.env.MONGO_DB_TABLE

mongoose
	.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbTable}`)
	.then(() => {
		app.listen(port)
	}).catch((err) => {
		handleErrorStatus(err, null)
	})

export default app
