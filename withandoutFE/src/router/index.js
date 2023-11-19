import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: ['/index', '/login'],
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/MainView.vue'),
    },
    {
      path: '/make-party',
      name: 'makeParty',
      component: () => import('@/views/MakingPartyView.vue'),
    },
    {
      path: '/join-party',
      name: 'joinParty',
      component: () => import('@/views/JoinPartyView.vue'),
    },
  ],
});

export default router;
