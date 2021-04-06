<template>
  <div>
    <nav id="nav">
      <router-link v-for="routes in links" v-bind:key="routes.id" :to="`${routes.page}`">{{routes.text}}</router-link>
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
      ]
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
    }
  },
  mounted () {
    const nav = document.getElementById('nav')
    this.navBar(nav)

    document.addEventListener('scroll', () => {
      this.navBar(nav)
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

nav a:hover {
  transform: scale(1.5);
}

.router-link-exact-active {
  background-color: rgba(51, 255, 255, 0.65);
  color: black;
}
</style>
