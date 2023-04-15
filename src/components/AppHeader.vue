<script>
import { store } from '../data/store';
export default {
    name: 'AppHeader',
    data() {
        return {
            store,
            //counter: [],
        }
    },
    methods: {
        counting_order() {
            if (!localStorage.getItem('orders')) {
                return store.cart.length
            } else if (localStorage.getItem('orders')) {
                return store.cart.length ? store.cart.length : JSON.parse(localStorage.getItem('orders')).length
            }
        }
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-md bg-orange">
        <div class="container">
            <div class="w-100 d-flex justify-content-between">
                <div class="collapse navbar-collapse d-flex justify-content-between align-items-center p-0"
                    id="navbarSupportedContent">

                    <!-- Left Side Of Navbar -->
                    <div class="navMenu d-flex align-items-center">
                        <router-link :to="{ name: 'home' }" class="text-decoration-none text-dark">
                            <a class="mx-3 logo d-flex align-items-center" href="{{ route('dashboard') }}">
                                <img src="http://localhost:5174/img/logo-400x400.png" alt="logo deliveboo"
                                    class="d-flex align-items-center">
                                <h2 class="m-0 ms-2 p-0 fw-bold d-md-block d-none">DeliveBoo</h2>
                            </a>
                        </router-link>
                    </div>

                    <!-- right Side Of Navbar -->
                    <div class="dropdown d-lg-none d-block mt-3 ms-2">
                        <button class=" border-0 bg-transparent text-white" type="button" data-bs-toggle="dropdown">
                            <i class="fa-regular fa-user fs-2 " style="color: #fff;"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li> <a href="http://127.0.0.1:8000/login"
                                    class="me-3 hover-underline-animation dropdown-item text-dark">logIn()</a></li>
                            <li><a href="http://127.0.0.1:8000/register"
                                    class="hover-underline-animation dropdown-item text-dark">createAccount()</a></li>
                            <li><router-link :to="{ name: 'CartPage' }"
                                    class="hover-underline-animation dropdown-item text-dark">showCart({{ counting_order()
                                    }})</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="d-none d-lg-flex justify-content-center align-items-center translate-down mt-3 ms-4">
                        <a href="http://127.0.0.1:8000/login" class="me-3 hover-underline-animation">logIn()</a>
                        <a href="http://127.0.0.1:8000/register" class="me-3 hover-underline-animation">createAccount()</a>
                        <router-link :to="{ name: 'CartPage' }" class="hover-underline-animation dropdown-item">showCart({{
                            counting_order() }})</router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.bg-orange {
    background-color: var(--p-orange);
    min-height: 120px;
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);

    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 6;

    a {
        color: var(--white);
        text-decoration: none;

        img {
            width: 80px;
        }

        h2 {
            font-weight: 700;
            font-size: 60px;
        }
    }
}

.hover-underline-animation {
    display: inline-block;
    position: relative;
    color: #0087ca;
    font-size: 20px;
}

.hover-underline-animation:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--white);
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
}

.dropdown-menu {
    transform: translateX(-80%);
}
</style>
