<template>
  <div id="app">
    <div id="content">
      <div id="logo-containter"><a href="/"><img class="logo" src="./assets/logo-2.svg" alt="Octonet"></a></div>
      <Navigation />
      <vue-page-transition name="flip-y">
        <router-view/>
      </vue-page-transition>
    </div>
    <div id="background">
      <vue-particles :particlesNumber=200 :moveSpeed="1" linesColor="#00FFFF" color="#00FFFF" :linesDistance=120>
      </vue-particles>
    </div>
    <Footer />
    <loading :opacity=0.9 background-color="black" :height=255 :width=255 color="aquamarine" :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'App',
  data () {
    return {
      isLoading: false,
      fullPage: true,
      isConnected: false
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
  components: {
    'Navigation': Navigation,
    'Footer': Footer,
    Loading
  },
  beforeMount () {
    this.isLoading = true
  },
  mounted () {
    this.isLoading = false

    this.$socket.client.on('log', (result) => {
      console.log(result)
    })
  }
}
</script>

<style>
@import './assets/fonts.css';

body {
  font-family: 'Ubuntu', sans-serif;
  background: linear-gradient(30deg, rgba(53,107,111,1) 10%, rgba(65,255,225,1) 30%, rgba(0,128,128,1) 60%) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #222;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.router-link-exact-active {
  background-color: rgba(255, 255, 255, .65);
  color: black;
}

#app {
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}

#grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}

@media screen and (min-width: 600px) {
  #grid {
    grid-gap: 10px;
    padding: 0px 10px 10px;
  }
}

section {
  background-color: rgba(0, 0, 0, .65);
  padding: 30px;
}

#content {
  position: relative;
  z-index: 100;
}

#background {
  position: absolute;
  z-index: -100;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.particles-js-canvas-el {
  left: 0;
  position: fixed;
  z-index: -999;
  width: 100%;
}

#logo-containter {
  text-align: center;
  margin: 20px auto;
  width: 250px;
  transition: all 1s ease-in-out;
}

.logo {
  width: 100%;
  max-width: 100%;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, .65);
}

#logo-containter:hover {
  transform: scale(1.1,1.1);
}

h1 {
  display: block;
  font-size: 3em;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
  text-align: center;
}

h2 {
  display: block;
  font-size: 2em;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
  text-align: center;
}

h3 {
  display: block;
  font-size: 1.35em;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
  text-align: center;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

a {
  text-decoration: none;
}

a:link {
  color: lime;
}

a:visited {
  color: green;
}

a:hover {
  color: greenyellow;
}

a:active {
  color: yellow;
}

.line {
  border-top: 1px solid white;
  display: block;
  margin-top: 15px;
  padding-top: 50px;
  position: relative;
}

ol {
  counter-reset: number;
}

ol > li {
  margin-bottom: 5px;
  counter-increment: number;
}

ol > li:before {
  content: counter(number);
  color: black;
  text-align: center;
  margin-right: .8rem;
  background: turquoise;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  padding-top: 0.24rem;
  display: inline-block;
  box-sizing: border-box;
}

ul > li {
    margin-bottom: 5px;
}

ul > li:before {
  content: "";
  color: black;
  text-align: center;
  margin-right: .8rem;
  background: turquoise;
  border-radius: 50%;
  width: .5rem;
  height: .5rem;
  padding-top: 0.24rem;
  display: inline-block;
  box-sizing: border-box;
}
</style>
