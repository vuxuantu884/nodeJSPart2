const socket = io();
socket.on("connect", () => {
  console.log("Connected to server");
  socket.emit("createMessage", {
    from: "TU",
    text: "This is create message",
  });
});
socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("newMessage", (message) => {
  console.log(message);
});
