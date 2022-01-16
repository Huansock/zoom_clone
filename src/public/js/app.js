const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;
let roomName;
let myName;

myName = "";
const addMessage = (message) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`${myName}: ${value}`);
  });
  input.value = "";
};
const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = roomName;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
};

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  const nickForm = form.querySelector("#nickname");
  roomName = input.value;
  myName = nickForm.value;
  socket.emit("enter_room", input.value, nickForm.value, showRoom);
  input.value = "";
};

//eventListeners
form.addEventListener("submit", handleRoomSubmit);
socket.on("welcomeDrink", (user) => {
  addMessage(`🍹 ${user} Joined!`);
});
socket.on("byeDrink", (Gone) => {
  addMessage(`👋 ${Gone} has left`);
});
socket.on("new_message", addMessage);
socket.on("roomChange", console.log);
