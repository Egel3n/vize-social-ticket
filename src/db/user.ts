import client from './dbClient'


export const allUsers = async () =>  {const data = await client.user.findMany(); console.log(data)}

