import Vue from 'vue'
import Router from 'vue-router'
import VuePageTransition from 'vue-page-transition'
import VueMeta from 'vue-meta'

Vue.use(Router)
Vue.use(VuePageTransition)
Vue.use(VueMeta)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ "../components/HomePage.vue"),
      meta: {
        title: 'Octonet | Home Page | Web and Application Development',
        htmlAttrs: {
          lang: 'en',
          amp: true
        },
        metaTags: [
          {
            name: 'description',
            content: 'Octonet Web Application Development'
          }
        ]
      }
    },
    {
      path: '/about',
      name: 'About Us',
      component: () => import(/* webpackChunkName: "about" */ "../components/About.vue"),
      meta: {
        title: 'About Us | Octonet',
        htmlAttrs: {
          lang: 'en',
          amp: true
        },
        metaTags: [
          {
            name: 'description',
            content: 'More information about who works for Octonet'
          }
        ]
      }
    },
    {
      path: '/privacyPolicy',
      name: 'Privacy Policy',
      component: () => import(/* webpackChunkName: "privacyPolicy" */ "../components/PrivacyPolicy.vue"),
      meta: {
        title: 'Privacy Policy | Octonet',
        htmlAttrs: {
          lang: 'en',
          amp: true
        },
        metaTags: [
          {
            name: 'description',
            content: 'Octonet Terms of use and Privacy Policy'
          }
        ]
      }
    },
    {
      path: '/services',
      name: 'Services',
      component: () => import(/* webpackChunkName: "services" */ "../components/Services.vue"),
      meta: {
        title: 'Services | Octonet',
        htmlAttrs: {
          lang: 'en',
          amp: true
        },
        metaTags: [
          {
            name: 'description',
            content: 'The services that Octonet provides to the public and companies'
          }
        ]
      }
    },
    {
      path: '/contact',
      name: 'Contact Us',
      component: () => import(/* webpackChunkName: "contact" */ "../components/Contact.vue"),
      meta: {
        title: 'Contact Us | Contact Details | Octonet',
        htmlAttrs: {
          lang: 'en',
          amp: true
        },
        metaTags: [
          {
            name: 'description',
            content: 'How Octonet can be contacted. Email, telephonic and address'
          }
        ]
      }
    }
  ]
})
