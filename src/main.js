// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'reset-css'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueParticles from 'vue-particles'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
import VueSession from 'vue-session'
import vClickOutside from 'v-click-outside'
import "font-awesome/css/font-awesome.min.css"

const socket = io.connect('wss://app.octonet.co.za', {
  reconnection: true,
  timeout: 1000 * 60 * 60,
  autoConnect: true,
  rememberUpgrade: true
});

Vue.use(VueParticles)
Vue.use(VueSocketIOExt, socket)
Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default)
Vue.use(VueSession, { persist: true })
Vue.use(vClickOutside)

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))
  if (!nearestWithMeta) return next()
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')
    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })
    tag.setAttribute('data-vue-router-controlled', '')
    return tag
  }).forEach(tag => document.head.appendChild(tag))

  next()
})

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
