import { createUser, userByUsername } from "../db/user";
import { comparePassword, createJWT } from "../middleware/auth";

export const sign = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.status(201).json({ message: "User Created", data: user });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const login = async (req, res, next) => {
  const body = req.body;
  const username = body.username
  const password = body.password
  try {
      const user = await userByUsername(username)
        if(!user){
            res.status(401).json({message:'wrong username'})
            return
        }
      
      if(!comparePassword(password,user.password)) {
        res.status(401).json({messsage:'wrong password'})
        return
      }
     
      const token = createJWT(user)
      res.status(200).json({token})
    
  } catch (error) {
    console.error(error)
    next(error)
  }
};
