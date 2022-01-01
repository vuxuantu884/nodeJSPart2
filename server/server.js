const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "/../public");
const post = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);

const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A new use just connected");

  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to chat app!",
    createAt: new Date().getTime(),
  });
    socket.broadcast.emit("newMessage", {
        from: "Admin",
        text: "New User Joined",
        createAt: new Date().getTime(),
      });



  socket.on("createMessage", (message) => {
    console.log(message);

    // io.emit("newMessage", {...message, createAt: new Date().getTime()})
    // socket.broadcast.emit("newMessage", {...message, createAt: new Date().getTime()});

    socket.on("disconnect", () => {
      console.log("User was disconnected");
    });
  });
});

server.listen(post, () => {
  console.log("Server is up on port:", post);
});
