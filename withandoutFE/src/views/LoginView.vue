<template>
  <form class="loginForm">
    <label for="id">아이디</label>
    <input type="text" id="id" v-model="userId" tabindex="1" />
    <label for="password">비밀번호</label>
    <input type="password" id="password" v-model="password" tabindex="2" />
    <section class="btns">
      <button class="loginBtn" @click.prevent="loginUser" tabindex="3">
        로그인
      </button>
      <button
        class="signupBtn"
        @click.prevent="() => router.push({ name: 'signup' })"
        tabindex="-1"
      >
        회원가입
      </button>
    </section>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();

const userId = ref('');
const password = ref('');

const loginUser = () => {
  userStore.login({ userId: userId.value, password: password.value });
};
</script>

<style scoped>
@import '@/assets/css/login.css';
</style>
