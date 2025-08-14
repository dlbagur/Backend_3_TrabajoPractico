import { usersService } from "../services/index.js"

const getAllUsers = async(req,res)=>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
}

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})
}

const deleteAllUsers = async (req, res) => {
  try {
    const outcome = await usersService.deleteAll();
    return res.json({ status: "success", deletedCount: outcome.deletedCount });
  } catch (err) {
    logger.error(`[Users][DELETE /] ${err.message}`);
    return res.status(500).json({ status: "error", error: err.message });
  }
};

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteAllUsers
}