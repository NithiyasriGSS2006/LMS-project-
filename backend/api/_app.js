import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from '../configs/mongodb.js'
import { clerkWebhooks } from '../controllers/webhooks.js'

const app = express()
await connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('API working'))
app.post('/clerk', clerkWebhooks)

export default app
