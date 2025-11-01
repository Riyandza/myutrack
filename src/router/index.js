import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue') // Lazy load
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import('../views/ExploreView.vue')
  },
  {
    path: '/album/:id', // Dynamic route for albums
    name: 'albumDetail',
    component: () => import('../views/DetailView.vue')
  },
  {
    path: '/artist/:id',
    name: 'artistDetail',
    component: () => import('../views/ArtistDetailView.vue')
  },
  // Add more routes for artists, etc.
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router