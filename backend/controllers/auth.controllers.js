const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel=require("../models/user.model");

const register=async(req,res)=>{
     try{
         const userentered = await userModel.findOne({email : req.body.email}) ;
         if(userentered){
            return res.json({msg:"email already exists", status: false});
         };
         const salt = await bcrypt.genSalt(10);
         const passwordhashed  = await bcrypt.hash(req.body.password , salt);
         const newUser = new userModel({
            username : req.body.username,
            email:req.body.email,
            password:passwordhashed,
            profilepic:req.body.profilepic,
         });
         const savedUser = await newUser.save();
         return res.status(201).json(savedUser);

     }catch(err){
      console.log(err);
              return res.status(500).json(err);
     };
};

const login =async(req,res)=>{
   try{
      const checkmail = await userModel.findOne({email : req.body.email});
      if(!checkmail){
      return res.json({msg:"email adress not found" , status:false})
       };
           const testpw = bcrypt.compare(
               req.body.password , checkmail.password 
          );
            if(!testpw) return res.json({msg:"wrong email adress", status: false});

		const token = jwt.sign(
			{
				_id :checkmail._id , email :checkmail.email
			},"justanykeybchnjarbbih",{expiresIn :"2 days"}
		); return res.status(200).json({token: token , user: checkmail});
	}catch(err){
		return res.status(500).json(err);
	}
};






module.exports.register = register;
module.exports.login = login;
//module.exports.getauth=getauth;