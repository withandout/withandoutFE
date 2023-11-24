import { createRouter, createWebHistory } from 'vue-router';
import {useUserStore} from '../stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: ['/index', '/login'],
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      beforeEnter: (to, from) => {
        if (sessionStorage.getItem('sessionId') != null) {
          return {name: 'home'};
        }
      }
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
      beforeEnter: (to, from) => {
        if (JSON.parse(sessionStorage.getItem('sessionId'))['isAuthorized'] != 1) {
          alert("동네 인증을 먼저 완료해주세요.")
          return {name: 'home'};
        }
      }
    },
    {
      path: '/join-party',
      name: 'joinParty',
      component: () => import('@/views/JoinPartyView.vue'),
      beforeEnter: (to, from) => {
        if (JSON.parse(sessionStorage.getItem('sessionId'))['isAuthorized'] != 1) {
          alert("동네 인증을 먼저 완료해주세요.")
          return {name: 'home'};
        }
      }
    },
    {
      path: '/party/detail/:partyNo',
      name: 'detail',
      component: () => import('@/views/DetailPartyView.vue'),
      beforeEnter: (to, from) => {
        if (JSON.parse(sessionStorage.getItem('sessionId'))['isAuthorized'] != 1) {
          alert("동네 인증을 먼저 완료해주세요.")
          return {name: 'home'};
        }
      }
    },
  ],
});

router.beforeEach(async (to, from) => {

  if ((sessionStorage.getItem('sessionId') == null) && (to.name != 'login' && to.name != 'signup')) {
    alert("로그인이 필요합니다.");
    return {name: 'login'};
  }
})

export default router;
