import Vue from 'vue'
import Router from 'vue-router'

import '@/assets/font/font.css'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Home from '@/views/Home'
import ArticleDetail from '@/views/ArticleDetail'
import PostArticle from '@/views/PostArticle'
import UserDetail from '@/views/UserDetail'
import RatingDetail from '@/views/RatingDetail'
import BrowseRating from '@/views/BrowseRating'
import PostRating from '@/views/PostRating'

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
    },
    {
      path: '/postArticle',
      name: 'PostArticle',
      component: PostArticle
    },
    {
      path: '/userDetail',
      name: 'UserDetail',
      component: UserDetail
    },
    {
      path: '/ratingDetail',
      name: 'RatingDetail',
      component: RatingDetail
    },
    {
      path: '/browseRating',
      name: 'BrowseRating',
      component: BrowseRating
    },
    {
      path: '/postRating',
      name: 'PostRating',
      component: PostRating
    }
  ]
})
