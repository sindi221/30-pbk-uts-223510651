import { createRouter, createWebHistory } from 'vue-router'
import TheWelcome from '../views/TheWelcome.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    // Komponen yang akan ditampilkan untuk rute ini
    component: Home
  },
  {
    path: '/theWelcome',
    name: 'TheWelcome',
    component: TheWelcome
  },
  // Definisi rute lainnya...
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
