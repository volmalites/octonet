<template>
  <div>
    <div v-show="chatComponent">
      <div id="chat-box-containter" v-show="toggleChat">
        <h2>There {{(this.adminOnline !== 1) ? 'are' : 'is'}} {{this.adminOnline}} representative{{(this.adminOnline !== 1) ? 's' : ''}} available to talk to</h2>
        <div id="message-box">
          
        </div>
        <div class="message-send">
          <textarea name="message" ref="msg" id="msg" rows="3"></textarea><br>
          <button id="send" @click="sendMessage()">Send</button>
          <button id="send" @click="toggleChatBox()">Close Chat</button>
        </div>
      </div>
      <div class="toggle-chat" v-show="!toggleChat" @click="toggleChatBox()">
        <span id="up"><vue-fontawesome class="icon" icon="chevron-up" size="1" color="black"></vue-fontawesome></span>
        <vue-fontawesome class="icon" icon="comments-o" size="2" color="black"></vue-fontawesome>
        <span>Chat with us</span>
      </div>
    </div>
    <div v-show="!chatComponent">
      <div class="toggle-chat" @click="toContactPage()">
        <span>No one online to chat to.</span><br><span>Click here for more info on chat operation hours</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBox',
  data () {
    return {
      toggleChat: false,
      chatComponent: true,
      sessionId: this.$session.id(),
      socketId: this.$socket.client.id,
      adminOnline: 0
    }
  },
  sockets: {
    connect () {
      this.socketId = this.$socket.client.id;

      this.$socket.client.emit('webClientSocket', {sessionId: this.sessionId, socketId: this.socketId}, (result) => {
        this.chatComponent = result;
      });

      this.isConnected = true
    },
    disconnect () {
      this.isConnected = false
    },
    messageChannel (data) {
      this.socketMessage = data
    }
  },
  methods: {
    toContactPage() {
      this.$router.push('contact');
    },
    toggleChatBox() {
      this.toggleChat = !this.toggleChat;
      if (this.toggleChat === true) {
        setTimeout(() => {
          this.$refs.msg.focus();
        });
      }
    },
    insertMsg(msgNew) {
      let date = new Date(msgNew.date);
      let msg;

      if (msgNew.sender === 0) {
        msg = `
          <div class="message-to">${msgNew.msg}</div>
          <span class="msg-desc-to"><span class="msg-date">${date.toString()}</span></span>
        `;
      } else {
        msg = `
          <div class="message-from">${msgNew.msg}</div>
          <span class="msg-desc-from"><span class="msg-date">${date.toString()}</span></span>
        `;
      }
      let div = document.createElement('div');
      div.className = 'message-wrapper';

      div.innerHTML = msg;
      let box = document.getElementById('message-box');

      box.insertBefore(div, box.firstChild);
    },
    sendMessage() {
      this.$socket.client.emit('messageFromWeb', {from: 0, to: 0, sessionId: this.sessionId, msg: this.$refs.msg.value, date: new Date()}, (result) => {
        let date = new Date(result.date);
        let msg = `
          <div class="message-to">${result.msg}</div>
          <span class="msg-desc-to"><span class="msg-date">${date.toString()}</span></span>
        `;
        let div = document.createElement('div');
        div.className = 'message-wrapper';

        div.innerHTML = msg;
        let box = document.getElementById('message-box');

        box.insertBefore(div, box.firstChild);
      });

      this.$refs.msg.value = '';
      this.$refs.msg.focus();
    }
  },
  beforeCreate () {
    if (!this.$session.exists()) {
      this.$session.start();
    }
  },
  mounted() {
    this.$socket.client.on("connect_error", (err) => {
      console.log(err);
    });

    this.$socket.client.on('updateAdminRoster', result => {
      this.adminOnline = result;
      if (this.adminOnline < 1) {
        this.chatComponent = false;
        this.toggleChat = false;
      } else if (this.adminOnline > 0) {
        this.chatComponent = true;
      }
    });

    this.$socket.client.emit('adminRoster', true, result => {
      this.adminOnline = result;
      if (result < 1) {
        this.chatComponent = false;
        this.toggleChat = false;
      }
    });

    this.$socket.client.on('messageFromOcto', data => {
      this.insertMsg(data);
    });

    this.$socket.client.emit('getMessages webClientSocket', this.sessionId, result => {
      result.forEach(element => {
        this.insertMsg(element);
      });
    });
  }
}
</script>

<style>
  .toggle-chat {
    box-shadow: 0 0 3px 1px black;
    padding: 5px 50px;
    color: black;
    background-color: white;
    position: fixed;
    left: 50%;
    z-index: 100;
    top: 100%;
    transform: translate(-50%, -100%);
    transition: all ease-in-out 1s;
  }

  .toggle-chat:hover {
    cursor: pointer;
    padding-bottom: 15px;
  }

  #up {
    display: table;
    margin: 0 auto;
  }

  #send {
    display: table;
    width: 100px;
    height: 40px;
    margin: 20px auto;
  }

  #send:hover {
    cursor: pointer;
  }

  .msg-desc-to {
    font-weight: bold;
    padding-top: 15px;
    float: left;
  }

  .msg-desc-from {
    font-weight: bold;
    padding-top: 15px;
    float: right;
  }

  .message-send {
    margin-top: 30px;
  }

  #msg {
    font-weight: bold;
    font-size: larger;
    width: calc(100% - 40px);
    background-color: rgba(0, 0, 0, 0.2);
    padding: 20px;
  }

  #chat-box-containter {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    color: black;
    min-width: 400px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 2px solid black;
    border-radius: 10px;
    padding: 40px;
  }

  #chat {
    display: inline-block;
    position: relative;
    text-align: left;
    min-height: 200px;
  }

  #message-box {
    padding: 0 50px;
    overflow-y: scroll;
    max-height: 400px;
  }

  .message-from {
    font-weight: bold;
    font-size: larger;
    margin: 40px 0 0 20%;
    padding: 20px;
    position: relative;
    background: rgb(0, 255, 234);
    border-radius: .4em;
    max-width: 1200px;
    min-height: 50px;
    box-shadow: 0 0 10px 2px black;
  }

  .message-from:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 26px solid transparent;
    border-left-color: rgb(0, 255, 234);
    border-right: 0;
    margin-top: -20px;
    margin-right: -20px;
  }

  .message-to {
    font-weight: bold;
    font-size: larger;
    margin: 40px 20% 0 0;
    padding: 20px;
    position: relative;
    background: rgb(0, 255, 234);
    border-radius: .4em;
    max-width: 1200px;
    min-height: 50px;
    box-shadow: 0 0 10px 2px black;
  }

  .message-to:after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 26px solid transparent;
    border-right-color: rgb(0, 255, 234);
    border-left: 0;
    margin-top: -20px;
    margin-left: -20px;
  }

  tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }

  tr {
    border-bottom: 1px solid #dddddd;
  }

  tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  tr:hover {
    font-weight: bold;
    color: #009879;
  }

  th, td {
    padding: 12px 15px;
  }

  #read-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  #read-table thead tr {
    background-color: black;
    color: #ffffff;
    text-align: left;
  }

  #read-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  #read-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  #read-table tbody tr:hover,  #read-table tbody tr:focus {
    font-weight: bold;
    color: green;
    cursor: pointer;
    background-color: white;
  }

  #read-table th,
  #read-table td {
    padding: 12px 15px;
  }
</style>