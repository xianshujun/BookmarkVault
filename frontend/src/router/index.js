import { createRouter, createWebHistory } from 'vue-router'
import BookmarkManage from '../views/bookmark-manage.vue'

const routes = [
  {
    path: '/',
    name: 'bookmark-manage',
    component: BookmarkManage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
