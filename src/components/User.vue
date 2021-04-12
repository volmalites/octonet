<template>
  <div id="container">
    <div id="log-in">
      <form v-on:submit.prevent="onSubmit">
        <h1>OCTONET</h1>
        <div id="inputs">
          <label for="email"><vue-fontawesome class="icon" icon="envelope" size="2" color="black"></vue-fontawesome></label>
          <input type="text" :disabled="email" name="email" v-model="input.email" id="email" class="no-outline" v-on:keyup.enter="login()">
          <span class="text">
            <span v-show="!email">Email</span>
            <vue-fontawesome v-show="email" class="icon" icon="check-circle-o" size="2" color="green"></vue-fontawesome>
          </span>
          <label for="password"><vue-fontawesome class="icon" icon="unlock-alt" size="2" color="black"></vue-fontawesome></label>
          <input type="password" :disabled="password" name="password" v-model="input.password" id="password" class="no-outline" v-on:keyup.enter="login()">
          <span class="text">
            <span v-show="!password">Password</span>
            <vue-fontawesome v-show="password" class="icon" icon="check-circle-o" size="2" color="green"></vue-fontawesome>
          </span>
        </div>
        <div id="message">{{message}}</div>
        <button id="btn" type="button" :disabled="disabledBtn" v-on:click="login()"><span class="noselect">Log In</span><div id="circle"></div></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      input: {
        email: '',
        password: ''
      },
      isConnected: false,
      message: '',
      disabledBtn: false,
      email: false,
      password: false
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
  methods: {
    login() {
      this.validating = true;
      this.message = '';
      this.disabledBtn = true;
      this.$socket.client.emit('login', this.input, (result) => {
        result.forEach(element => {
          this[element.target] = !element.error;
          document.getElementById(element.target).focus();
          this.message = element.errorMsg;
        });
        if (this.email && this.password) {
          console.log('LOGGING YOU IN');
        } else {
          this.disabledBtn = false;
        }
      });
      this.validating = false;
    }
  },
  mounted () {
    this.$socket.client.on('log', (result) => {
      console.log(result)
    })

    document.getElementById('email').focus()
  }
}
</script>

<style scoped>
#log-in {
  color: black;
  display: table;
  margin: 5vh auto;
  background-color: rgba(0, 255, 179, 0.8);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
}

input, button {
  display: block;
}

input {
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: hidden;
  background-color: rgba(0, 0, 0, .35);
  padding: 12px 10px;
  border-radius: 10px;
  margin: 10px auto;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
}

.no-outline:focus {
  outline: none;
  box-shadow: 3.5px 3.5px rgba(0, 0, 0, 0.7);
}

#btn {
  background: rgba(0, 0, 0, .35);
  color: black;
  font-size: 1.3em;
  font-weight: bold;
  height: 50px;
  min-width: 150px;
  border: none;
  border-radius: 10px;
  position: relative;
  transition: 1s;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  margin: 20px auto;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-top: 5px;
}

#btn #circle {
  width: 5px;
  height: 5px;
  background: transparent;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  overflow: hidden;
  transition: 500ms;
}

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#btn:hover, #btn:focus {
  color: white;
  background: black;
}

#btn:hover #circle, #btn:focus #circle {
  height: 50px;
  width: 150px;
  left: 0;
  border-radius: 0;
  border-bottom: 2px solid #eee;
}

i {
  margin: 12.5px;
}

input {
  width: 200px;
}

.text {
  margin: auto 10px;
  font-size: 1.3em;
}

#inputs {
  display: grid;
  grid-template-columns: auto auto auto;
}

#message {
  color: red;
  text-align: center;
}
</style>