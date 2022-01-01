const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io")

const publicPath = path.join(__dirname, "/../public");
const post = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);

const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection",(socket)=> {
    console.log("A new use just connected")
    socket.on("disconnect", () => {
        console.log("User was disconnected");
      });
})


server.listen(post,()=> {
    console.log("Server is up on port:", post);
})
