import Vue from 'vue'
import VueRouter from 'vue-router'
import { setThemeColor } from '@/utils';

import BaseLayout from '@/layouts/BaseLayout'
import MainLayout from '@/layouts/MainLayout'
import SafeAreaLayout from '@/layouts/SafeAreaLayout'

import Home from '@/views/Home'
import Search from '@/views/Search'
import Rank from '@/views/Rank'
import Setting from '@/views/Setting'
import Artwork from '@/views/Artwork'
import Users from '@/views/Users'
import NovelChapter from '@/views/Novel/chapter'

const initLength = window.history.length
Object.defineProperty(VueRouter.prototype, '$historyCount', {
  get() {
    return window.history.length - initLength
  }
})

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '/',
        component: MainLayout,
        props: { safeArea: true },
        children: [
          {
            path: '/',
            redirect: '/home'
          },
          {
            path: '/home',
            name: 'Home',
            component: Home
          },
          {
            path: '/search',
            name: 'Search',
            component: Search
          },
          {
            path: '/rank',
            redirect: '/rank/daily'
          },
          {
            path: '/rank/:type',
            name: 'Rank',
            component: Rank
          },
          {
            path: '/setting',
            name: 'Setting',
            component: Setting
          }
        ]
      },
      {
        path: '/',
        component: MainLayout,
        props: { showNav: false },
        children: [
          {
            path: '/artwork/:id',
            name: 'Artwork',
            component: Artwork
          },
          {
            path: '/users/:id',
            name: 'Users',
            component: Users
          },
          {
            path: '/novel/:id',
            name: 'Novel',
            component: NovelChapter
          }
        ]
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'pixiv-viewer'

  setThemeColor(to.meta.themeColor || '#fff')

  next()
})

export default router
