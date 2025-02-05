import {Router} from 'express'


const router = Router()


router.get('/user', (req,res)=>{
    console.log(req.user)
    res.status(200).send()
})


export default router 