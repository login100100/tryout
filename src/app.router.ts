import { createRouter, createWebHistory } from 'vue-router'

import {
  ROUTE_CRYPTO_OVERVIEW,
  ROUTE_CRYPTO_FAVORITES,
  ROUTE_CRYPTO_VIEW,
  ROUTE_NOT_FOUND
} from './app.routes';


const routes = [
  {
    path: ROUTE_CRYPTO_OVERVIEW.path,
    name: ROUTE_CRYPTO_OVERVIEW.name,
    component: ROUTE_CRYPTO_OVERVIEW.component,
    children: [
      {
        path: ROUTE_CRYPTO_FAVORITES.path,
        name: ROUTE_CRYPTO_FAVORITES.name,
        component: ROUTE_CRYPTO_FAVORITES.component,
      },
      {
        path: ROUTE_CRYPTO_VIEW.path,
        name: ROUTE_CRYPTO_VIEW.name,
        component: ROUTE_CRYPTO_VIEW.component,
      }
    ]
  },
  {
    path: ROUTE_NOT_FOUND.path,
    name: ROUTE_NOT_FOUND.name,
    component: ROUTE_NOT_FOUND.component
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
