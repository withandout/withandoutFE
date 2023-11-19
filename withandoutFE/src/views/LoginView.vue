<template>
  <form class="loginForm">
    <label for="id">아이디</label>
    <input type="text" id="id" v-model="userId" />
    <label for="password">비밀번호</label>
    <input type="password" id="password" v-model="password" />
    <section class="btns">
      <button
        class="signupBtn"
        @click.prevent="() => router.push({ name: 'signup' })"
      >
        회원가입
      </button>
      <button class="loginBtn" @click.prevent="loginUser">로그인</button>
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
