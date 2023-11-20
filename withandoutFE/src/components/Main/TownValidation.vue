<template>
    <div>
      <v-sheet
      border="md"
      class="pa-6 text-black mx-auto"
      color="#FEFEFE"
      max-width="250"
      >
      <h5 class="text-h5 font-weight-bold mb-3 text-center">동네 인증</h5>

      <h4 class="text-h6 font-weight-bold mb-1 text-center">현재 위치</h4>

      <h4 class="text-h5 font-weight-black mb-3 text-center">강남구 역삼동</h4>

      <v-btn
        block
        class="text-h6 font-weight-bold text-black mb-4"
        color="blue"
        variant="flat"
        :disabled="townAuthorized"
        @click="userStore.townAuthorize(userNo)"
      >
      <!-- 값 prop 받아와서 확인해주셈 -->
      <h4 v-if="townAuthorized" class="text-h6 font-weight-bold mb-1 text-center">인증 완료</h4>
      <h4 v-else>인증 하기</h4> 
      </v-btn>
      </v-sheet>
      </div>
  </template>

<script setup>
  import { useUserStore } from '@/stores/user';
  import { ref } from 'vue';
  
  const userStore = useUserStore();

  const townAuthorized = userStore.townAuthorized;

  const userNo = JSON.parse(sessionStorage.getItem('sessionId')).userNo;
</script>

<style scoped>
    @import '@/assets/css/main_modal.css';
</style>

