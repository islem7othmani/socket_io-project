const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser"); 
const http = require("http");
const {Server} = require("socket.io")
const server = http.createServer(app)



// connect to database
mongoose.connect("mongodb://0.0.0.0:27017/chatapplication")
mongoose.connection.on("connected", () => {
  console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
  console.log("Mongodb failed", err);
});

//middleware routs
const authRoutes = require("./roots/auth.routs");
const userRoutes = require("./roots/user.routes");
const messageRoutes = require("./roots/message.route");

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//routs
app.use("/authentification" , authRoutes);
app.use("/account", userRoutes);
app.use("/chat", messageRoutes);

//socket io connection
const io =new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"]
  }
})
io.on('connection',(socket)=>{
  console.log(socket.id);

      socket.on("join room",(room)=>{
        socket.join(room);
        console.log("user joined room :"+room)
       })

       socket.on("send message",(data)=>{
        console.log(data);
        
        socket.broadcast.emit("receive",data)
        socket.emit("receive",data)
       
       })
      

      
  })


//connect to server
server.listen(8000,()=>{
    console.log("server connected");
})