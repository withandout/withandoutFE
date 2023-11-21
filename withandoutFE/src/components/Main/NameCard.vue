<template>
  <section class="nameCard">
    <section class="halfSize">
      <img
        class="cardImage"
        v-if="user.imgName === ''"
        src="@/assets/img/default_user.png"
      />
      <div class="cardName">{{ user.nickname }}</div>
    </section>
  </section>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
const store = useUserStore();

const user = JSON.parse(sessionStorage.getItem('sessionId'));
console.log(user.nickname);
</script>

<style scoped>
@import '@/assets/css/main.css';
</style>
