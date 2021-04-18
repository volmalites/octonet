<template>
  <div>
    <div id="userNav">
      <span class="left">{{user.full_names}}</span>
      <div id="tools" class="right">
        <button id="personal" @click="open($event)">Personal Information</button>
        <button id="messages" @click="open($event)">Messages <span v-if="this.countUnread > 0" id="count-unread">{{(this.countUnread > 0) ? this.countUnread : ''}}</span></button>
        <button id="manageUsers" @click="open($event)">Manage Users</button>
        <button id="manageTickets" @click="open($event)">Manage Tickets</button>
        <button id="issues" @click="open($event)">Reported Issues</button>
        <button id="clients" @click="open($event)">Clients</button>
        <button id="clients" @click="logOut()">Log Out</button>
      </div>
    </div>
    <section>
      <div v-show="tools.personal">
        Personal
      </div>
      <div v-show="tools.messages">
        <div class="card">
          <div class="card-header">
            Current Chat Activity
          </div>
          <div class="card-body">
            <table id="read-table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>Last Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody id="read">
                <tr v-for="(item, index) in messagesList.data" :key="index" @click="openChat(item.id)">
                  <td>{{item.from}}</td>
                  <td>{{item.msg}}</td>
                  <td>{{item.date}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-header">
            Chat History
          </div>
          <div class="card-body">
            <table id="read-table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>Last Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody id="unread">
                <tr v-for="(item, index) in messagesListOpened.data" :key="index" @click="openChat(item.id)">
                  <td>{{item.from}}</td>
                  <td>{{item.msg}}</td>
                  <td>{{item.date}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div v-show="tools.manageUsers">
        Manage Users
      </div>
      <div v-show="tools.manageTickets">
        Manage Tickets
      </div>
      <div v-show="tools.issues">
        Issues
      </div>
      <div v-show="tools.clients">
        Clients
      </div>
    </section>
    <div id="chat-box-containter" v-show="toggleChat">
      <div id="message-box">
        
      </div>
      <div class="message-send">
        <textarea name="message" ref="msg" id="msg" rows="3"></textarea><br>
        <button id="send" @click="sendMessage()">Send</button>
        <button id="send" @click="closeChatBox()">Close Chat</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UI',
    data () {
      return {
        user: {
          full_names: '',
          email: ''
        },
        tools: {
          personal: true,
          messages: false,
          manageUsers: false,
          manageTickets: false,
          issues: false,
          clients: false
        },
        identifier: {
          id: this.$session.get('id'),
          sessionId: this.$session.id()
        },
        messagesList: {
          data: []
        },
        messagesListOpened: {
          data: []
        },
        toggleChat: false,
        chatLog: '',
        activeChat: false,
        countUnread: 0
      }
    },
    methods: {
      logOut() {
        this.$socket.client.disconnect();
        this.$session.destroy();
        this.$router.push('/');
      },
      open(event) {
        Object.keys(this.tools).forEach(v => this.tools[v] = false);
        this.tools[event.currentTarget.id] = true;
      },
      closeChatBox() {
        this.toggleChat = false;
        this.activeChat = false;
      },
      openChat(index) {
        let box = document.getElementById('message-box');
        box.innerHTML = '';

        this.activeChat = this.chatLog[index - 1];
        const messages = JSON.parse(this.chatLog[index - 1].messages);
        let message;

        messages.forEach(element => {
          if (element.sender === this.identifier.id) {
            message = `
              <div class="message-to">${element.msg}</div>
              <span class="msg-desc-to"><span class="msg-date">${new Date(messages[messages.length - 1].date)}</span></span>
            `;
          } else {
            message = `
              <div class="message-from">${element.msg}</div>
              <span class="msg-desc-from"><span class="msg-date">${new Date(messages[messages.length - 1].date)}</span></span>
            `;
          }

          let div = document.createElement('div');
          div.className = 'message-wrapper';

          div.innerHTML = message;

          box.insertBefore(div, box.firstChild);
        });
        
        const listType = (this.chatLog[index - 1].opened === 0) ? 'messagesList' : 'messagesListOpened';

        if (listType === 'messagesList') {
          this.$socket.client.emit('msgOpenRead', this.chatLog[index - 1].id, result => {
            this.countUnread -= result;
            const chatIndex = this.messagesList.data.findIndex(obj => obj.id === (index));
            this.chatLog[index - 1].opened = 1;
            const changeToRead = this.messagesList.data.splice(chatIndex, 1);
            this.messagesListOpened.data.unshift(changeToRead[0]);
          });
        }

        this.toggleChat = true;
        setTimeout(() => {
          this.$refs.msg.focus();
        });
      },
      sendMessage() {
        const date = new Date().toString();
        const newMsg = this.$refs.msg.value;

        this.$socket.client.emit('messageToWeb', {from: this.identifier.id, to: this.activeChat.socket_id, msg: newMsg, date: date}, (result) => {
          const chatIndex = this.chatLog.findIndex(obj => obj.id === this.activeChat.id);
          const listType = (this.chatLog[chatIndex].opened === 0) ? 'messagesList' : 'messagesListOpened';
          const activeChatIndex = this[listType].data.findIndex(obj => obj.id === this.activeChat.id);
          
          this[listType].data[activeChatIndex].msg = newMsg;
          this[listType].data[activeChatIndex].date = date;

          this.insertMsg(result);
        });

        this.$refs.msg.value = '';
        this.$refs.msg.focus();
      },
      insertMsg(msgNew) {
        let date = new Date(msgNew.date);
        let msg;

        if (msgNew.sender === this.identifier.id) {
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
      }
    },
    sockets: {
      connect () {
        this.isConnected = true
      },
      disconnect () {
        this.isConnected = false
      },
      messageChannel (data) {
        this.socketMessage = data
      }
    },
    beforeMount () {
      if (this.$session.exists()) {
        this.$socket.client.emit('loadUser', this.identifier, result => {
          if (result) {
            this.user.full_names = result.full_names;
            this.user.email = result.email;
          } else {
            this.$router.push('user');
          }
        });
      } else {
        this.$router.push('user');
      }
    },
    mounted () {
      this.$socket.client.emit('updateSocket', {socketId: this.$socket.client.id, sessionId: this.identifier.sessionId}, result => {
        if (result) {
          console.log('Socket updated succesfully');
        }
      });
      
      this.$socket.client.on("connect_error", (err) => {
        console.log(err);
      });

      this.$socket.client.emit('getMessages', this.identifier, result => {
        this.chatLog = result;
        const messagesList = result.filter(msg => msg.opened === 0);
        const messagesListOpened = result.filter(msg => msg.opened !== 0);
        let total = [];

        messagesList.forEach(v => {
          let messages = JSON.parse(v.messages);
          total.push(messages.filter(msg => msg.read === false).length);
          this.messagesList.data.push({
            id: v.id,
            from: 'Website Client',
            msg: messages[messages.length - 1].msg,
            date: new Date(messages[messages.length - 1].date).toString()
          });
          this.countUnread = total.reduce((a, b) => a + b, 0);
        });

        messagesListOpened.forEach(v => {
          let messages = JSON.parse(v.messages);
          this.messagesListOpened.data.push({
            id: v.id,
            from: 'Website Client',
            msg: messages[messages.length - 1].msg,
            date: new Date(messages[messages.length - 1].date).toString()
          });
        });
      });

      this.$socket.client.on('log', msg => {
        console.log(msg);
      });

      this.$socket.client.on('incomingMessage', msg => {
        let thisMsg = {};

        if (msg.newMsg.receiver === 0) {
          const date = new Date(msg.newMsg.date).toString();
          
          if (this.messagesList.data.findIndex(obj => obj.id === msg.chatLog.id) >= 0) {
            thisMsg.index = this.messagesList.data.findIndex(obj => obj.id === msg.chatLog.id);
            thisMsg.list = 'messagesList';
          } else if (this.messagesListOpened.data.findIndex(obj => obj.id === msg.chatLog.id) >= 0) {
            thisMsg.index = this.messagesListOpened.data.findIndex(obj => obj.id === msg.chatLog.id);
            thisMsg.list = 'messagesListOpened';
          }
          
          thisMsg.chatLogIndex = this.chatLog.findIndex(obj => obj.id === msg.chatLog.id);

          if (thisMsg.index >= 0) {
            this[thisMsg.list].data[thisMsg.index].msg = msg.newMsg.msg;
            this[thisMsg.list].data[thisMsg.index].date = date;
            this.chatLog[thisMsg.chatLogIndex].messages = msg.chatLog.messages;

            if (this.activeChat.id === msg.newMsg.insertId) {
              this.insertMsg(msg.newMsg);
            } else if (thisMsg.list === 'messagesListOpened') {
              this.chatLog[thisMsg.chatLogIndex].opened = 0;
              const changeToUnread = this.messagesListOpened.data.splice(thisMsg.index, 1);
              this.messagesList.data.unshift(changeToUnread[0]);
            }
          } else {
            const from = (msg.chatLog.msg_to === 0 || msg.chatLog.msg_from === 0) ? 'Website Client' : msg.newMsg.insertId;
            this.messagesList.data.push({
              id: msg.newMsg.insertId,
              from: from,
              msg: msg.newMsg.msg,
              date: date
            });
            this.chatLog.push(msg.chatLog);
          }
          this.countUnread += 1;
        } else if (msg.newMsg.receiver === this.identifier.id) {
          this.insertMsg(msg.newMsg);
        }
      });
    }
  }
</script>

<style scoped>
#count-unread {
  background-color: green;
  padding: 5px;
  border-radius: 100%;
}

#userNav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 15px 10px;
  background-color: black;
}

button {
  font-size: 1.3em;
  min-height: 50px;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  background: black;
  transition: all ease-in-out 0.5s;
  font-weight: 700;
}

button:hover, button:focus {
  font-weight: 700;
  border-color: aqua;
  background-color: aqua;
  cursor: pointer;
  box-shadow: 0px 0px 3px 1px white;
  color: black;
}

.left {
  flex: 35%;
  font-size: 2.5em;
}

.right {
  flex: 65%;
}

.card {
  max-width: 1800px;
  margin: 0 auto;
}

.card-header {
  background-color: black;
  text-align: center;
  font-size: 2em;
  padding: 15px 0;
}

.card-body {
  background-color: white;
  color: black;
}
</style>