const messages = require("../models/message.model");
//const userModel = require("../models/user.model");

const CreateMessage = async (req, res) => {
  try {
    const newMessage = new messages({
      from: req.body.from,
      to: req.body.to,
      text: req.body.text,
    });
    const message = await newMessage.save();
    return res.status(201).json(message);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getMessage = async (req, res) => {
    try {
        
    
        const messages = await messages.find({
         
          to : req.body.to
         
        }).sort({ updatedAt: 1 });
    
        
        res.json(messages);}
         catch (err) {
    return res.status(500).json(err);
  }
};


  

module.exports.CreateMessage = CreateMessage;
module.exports.getMessage = getMessage;

