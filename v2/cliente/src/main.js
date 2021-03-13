import Vue from 'vue';
import App from './App.vue';
import Admin from './components/Admin.vue';
import Principal from './components/Principal.vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/admin',
            component: Admin
        },
        {
            path: '/',
            component: Principal
        }
    ]
})

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')