const userModel = require("../models/user.model");

const getUsers = async(req,res)=>{
try{
    const users = await userModel.find();
    return res.status(200).json(users);
}catch(err){
    return res.status(500).json(err);
}
}


module.exports.getUsers = getUsers;