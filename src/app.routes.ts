/* All App routes must be registered here */
export const ROUTE_CRYPTO_OVERVIEW = {
    path: '/',
    name: 'Overview',
    component: () => import('./pages/PageDashboard.vue')
}
export const ROUTE_CRYPTO_FAVORITES = { 
    path: 'favorites', 
    name: 'CrytoFavorites', 
    component: () => import('./pages/PageDashboard.vue')
}
export const ROUTE_CRYPTO_VIEW = {
    path: 'view-crypto/:id',
    name: 'CryptoItem',
    component: () => import('./views/Dashboard/ViewCryptoItem.vue'),
}

export const ROUTE_NOT_FOUND = {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('./pages/Page404.vue')
}