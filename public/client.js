const socket = io();
let username = "";

function login() {
    username = document.getElementById('username').value;
    if (!username) return;
    document.getElementById('login').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    socket.emit('join', username);
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const msg = input.value;
    if (!msg) return;
    socket.emit('chat-message', msg);
    input.value = '';
}

socket.on('chat-message', data => {
    addMessage(`${data.name}: ${data.message}`);
});

socket.on('user-joined', name => {
    addMessage(`🟢 ${name} joined the chat`);
});

socket.on('user-left', name => {
    addMessage(`🔴 ${name} left the chat`);
});

function addMessage(msg) {
    const messages = document.getElementById('messages');
    const div = document.createElement('div');
    div.textContent = msg;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}
