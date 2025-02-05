import client from './dbClient'
import { hashPassword } from '../middleware/auth';

export const allUsers = async () =>  {const data = await client.user.findMany(); console.log(data)}

export const createUser = async (data) => {
    try{
        const user = await client.user.create({
        data:{
            name: data.name,
            lastName: data.lastname,
            password: await hashPassword(data.password),
            profilePicture: data.profilePictureURL,
            username: data.username
        }
    })    
    return user
    
    }catch(e){
        console.error(e)
        throw new Error(e)    
    }

}

export const getByUsername = async (username) => {

    try {
        const user = await client.user.findUnique({
            where:{
                username
            }
        })

        return user
        
    } catch (error) {
        console.error(error)
        throw Error(error)        
    }

} 