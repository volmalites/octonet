<template>
  <div id="nav-container">
    <nav id="nav">
      <div id="menu">
        <router-link class="link" v-for="routes in links" v-bind:key="routes.id" :to="`${routes.page}`">{{routes.text}}</router-link>
      </div>
      <a id="toggle"><vue-fontawesome class="icon" icon="chevron-circle-down" size="2.5" color="white"></vue-fontawesome></a>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      links: [
        {
          id: 0,
          text: 'Home',
          page: '/'
        },
        {
          id: 1,
          text: 'About Us',
          page: '/about'
        },
        {
          id: 2,
          text: 'Services',
          page: '/services'
        },
        {
          id: 3,
          text: 'Contact Us',
          page: '/contact'
        }
      ],
      toggleState: false
    }
  },
  methods: {
    navBar: (nav) => {
      if (window.pageYOffset >= 300) {
        nav.style.position = 'fixed'
        nav.style.top = 0
        nav.style.left = 0
        nav.style.right = 0
        nav.style.zIndex = 1
        nav.style.backgroundColor = 'black'
        nav.style.padding = '20px 0'
        nav.style.margin = '0'
      } else {
        nav.style.position = 'relative'
        nav.style.backgroundColor = ''
        nav.style.padding = '10px 0'
        nav.style.margin = '10px 0'
      }
    },
    toggleNav: function () {
      if (this.toggleState === true) {
        this.toggleState = false
        this.menu.style.display = 'none'
        document.getElementById('toggle').firstElementChild.classList.replace('fa-chevron-circle-up', 'fa-chevron-circle-down')
      } else {
        this.toggleState = true
        this.menu.style.display = 'block'
        document.getElementById('toggle').firstElementChild.classList.replace('fa-chevron-circle-down', 'fa-chevron-circle-up')
      }
    },
    navOnSize: function () {
      if (window.innerWidth <= 800) {
        document.getElementById('nav-container').style.height = '110px'
        this.toggleState = false
        this.menu.style.display = 'none'
        this.toggle.style.display = 'block'
      } else {
        document.getElementById('nav-container').style.height = '60px'
        this.toggleState = true
        this.toggle.style.display = 'none'
        this.menu.style.display = 'block'
      }
    }
  },
  mounted () {
    this.nav = document.getElementById('nav')
    this.menu = document.getElementById('menu')
    this.toggle = document.getElementById('toggle')

    this.toggle.style.display = 'none'
    this.navBar(nav)
    this.navOnSize()

    document.addEventListener('scroll', () => {
      this.navBar(nav)
      this.navOnSize()
    })

    window.addEventListener('resize', () => {
      this.navOnSize()
    })

    nav.addEventListener('click', e => {
      if (e.target.classList.contains('icon')) {
        this.toggleNav()
      } else if (e.target.tagName === 'A' && !e.target.classList.contains('icon') && window.innerWidth <= 800) {
        this.toggleNav()
      }
    })
  }
}
</script>

<style scoped>
nav {
  text-align: center;
  font-size: 1.4em;
  font-weight: bold;
  margin: 10px 0;
  padding: 10px 0;
}

nav a {
  margin: 0 5px;
  background-color: rgba(0, 0, 0, .65);
  padding: 10px 17px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: transform .2s;
}

@media screen and (max-width: 800px) {
  nav a {
    display: block;
    border-radius: 0;
    margin: 5px 0;
  }
}

nav a:not(#toggle):hover, nav a:not(#toggle):focus {
  transform: scaleY(1.2);
}

.router-link-exact-active {
  background-color: rgba(51, 255, 255, 0.65);
  color: black;
}

#nav-container {
  display: table;
  height: 60px;
  width: 100%;
}
</style>
