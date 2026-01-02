import { createRouter, createWebHistory } from 'vue-router'
import BookmarkManage from '../views/bookmark-manage.vue'

const routes = [
  {
    path: '/',
    name: 'bookmark-manage',
    component: BookmarkManage
  },
  {
    path: '/version',
    name: 'version-manage',
    component: () => import('../views/version-manage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
