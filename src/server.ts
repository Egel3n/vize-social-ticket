import express from 'express'
import router from './router'

const app = express()

app.use('api', router) // protect this route 

export default app