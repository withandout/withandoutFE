<template>
  <section class="motiv">
    <template v-if="userStore.userLog != undefined">
      <template v-if="userStore.userLog['distance'] < 4">
        <p class="subSen"> 
          {{(userStore.userLog['distance'] - userStore.userLog['distance']%100)/1000}}km만큼 달렸어요! 
        </p>
        <h2 class="mainSen">
          이번주는 조금 더 <br />
          분발해볼까요?
        </h2>
      </template>
      <template v-else-if="userStore.userLog['distance'] < 8">
        <p class="subSen">이번주는 
          {{(userStore.userLog['distance'] - userStore.userLog['distance']%100)/1000}}km 달렸네요!</p>
        <h2 class="mainSen">
          우리 조금만 <br />
          더 달려볼까요?
        </h2>
      </template>
      <template v-else>
        <p class="subSen">
          {{(userStore.userLog['distance'] - userStore.userLog['distance']%100)/1000}}km를 달렸어요 !</p>
        <h2 class="mainSen">
          대단해요! <br />
          목표 달성이 머지 않았어요! <br />
        </h2>
      </template>      
    </template>
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user'; 

const userStore = useUserStore();

onMounted(() => {
  const userNo = JSON.parse(sessionStorage.getItem("sessionId")).userNo;
  console.log(userNo);
  userStore.getUserRunningLog(userNo);
})

</script>
<style scoped>
@import '@/assets/css/main.css';
@import '@/assets/css/nav.css';
</style>
