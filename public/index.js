const socket = io();
let userName;

userName = prompt("Cual es tu usuario?");
if (userName) {
    alert(`Bienvenido al chat ${userName}`);
    socket.emit("new-user", userName);
} else {
    prompt("Cual es tu usuario?");
};

const chatInput = document.getElementById("chat-input")

chatInput.addEventListener("keyup", (ev) => {
    if (ev.key === "Enter") {
        const inputMessage = chatInput.value;


        if (inputMessage.trim().length > 0) {
            console.log("index")
            console.log(userName)
            socket.emit("chat-message", { user: userName, message: inputMessage })
            chatInput.value = ""
        }
    }
})


const messagesPanel = document.getElementById("messages-panel");
socket.on("messages", (data) => {
    console.log(data)
    let messages = "";

    data.forEach(m => {
        messages += `<b>${m.userName}:<b>${m.message}<br>`

    });
    messagesPanel.innerHTML = messages;

})


socket.on("new-user", (userName) => { alert(` ${userName} se une al chat`) })