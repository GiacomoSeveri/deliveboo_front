import { createApp } from 'vue';
import { router } from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import AppLoader from './components/AppLoader.vue';
// import * as Popper from "@popperjs/core";
import App from './App.vue';

const app = createApp(App);
app.component('AppLoader', AppLoader);
app.use(router);
app.mount('#app');
