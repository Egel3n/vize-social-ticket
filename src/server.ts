import express from 'express'
import router from './router'
import cors from 'cors'
import { protectRoute } from './middleware/auth'
import { login, sign } from './handler/user'


const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sign",sign)
app.post("/login",login)

app.use('/api', protectRoute ,router) // protect this route 

// app.post('login',)


export default app