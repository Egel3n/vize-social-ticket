import { createUser } from "../db/user"

export const sign = async (req,res,next) => {
    const body = req.body
    try{
        const user = await createUser(body)
        res.status(201).json({message:"User Created",data:user})
    }catch(e){
        console.error(e)
        next(e)
    }
}