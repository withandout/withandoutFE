<template>
  <section class="invitingView">
    <h1 class="invitedText">참여 중인 파티 정보</h1>
    <!-- axios로 data 가져와서 v-for로 보여줄 것 -->
    <button @click="() => router.push({ name: 'makeParty' })">
      파티 만들기
    </button>
    <button @click="() => router.push({ name: 'joinParty' })">신청하기</button>
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../stores/user';
import { useRouter } from 'vue-router';
const router = useRouter();
const store = useUserStore();
const sessionId = ref('');
onMounted(() => {
  // 세션 아이디 가져오기
  sessionId.value = JSON.parse(sessionStorage.getItem('sessionId')).userNo;
  console.log(sessionId.value);
  store.selectUserParties(sessionId.value);
});
</script>
<style scoped>
@import '@/assets/css/main.css';
@import '@/assets/css/inviting.css';
</style>
