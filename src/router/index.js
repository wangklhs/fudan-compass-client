import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Register from '@/views/Register'
import Home from '@/views/Home'
import ArticleDetail from '@/views/ArticleDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/articleDetail',
      name: 'ArticleDetail',
      component: ArticleDetail
    }
  ]
})
