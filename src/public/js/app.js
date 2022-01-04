const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;
let roomName;

const addMessage = (message) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = room.querySelector("input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`당신: ${value}`);
  });
  input.value = "";
};
const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = roomName;
  const msgForm = room.querySelector("#msg");
  const nickForm = room.querySelector("#nickname");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nickForm.addEventListener("submit", handleNicknameSubmit);
};

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  roomName = input.value;
  socket.emit("enter_room", input.value, showRoom);
  input.value = "";
};

const handleNicknameSubmit = () => {
  event.preventDefault();
};

//eventListeners
form.addEventListener("submit", handleRoomSubmit);
socket.on("welcomeDrink", () => {
  addMessage("🍹 Someone Joined! ");
});
socket.on("byeDrink", () => {
  addMessage("👋 Someone has left ");
});
socket.on("new_message", addMessage);
