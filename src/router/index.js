import { createRouter, createWebHistory } from "vue-router";

import HomePage from '../pages/HomePage.vue';
// import ContactPage from '../pages/ContactPage.vue';
import RestaurantDetails from '../pages/RestaurantDetails.vue';
// import NotFoundPage from '../pages/NotFoundPage.vue';
import CartPage from '../pages/CartPage.vue';

const router = createRouter({
    linkExactActiveClass: 'active',
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: HomePage },
        // { path: '/contact', name: 'contact', component: ContactPage },
        { path: '/Restaurants/:id', name: 'Restaurant-details', component: RestaurantDetails },
        // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
        {
            path: "/carrello",
            name: "CartPage",
            component: CartPage,
        }
    ]
});

export { router };