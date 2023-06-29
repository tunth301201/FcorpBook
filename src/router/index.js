import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';

const routes = [
  {
    path: '/:bookId',
    name: 'Book',
    component: App
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
