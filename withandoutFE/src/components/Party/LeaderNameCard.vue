<template>
  <section class="nameCard">
    <section class="halfSize imageSec">
      <img
        class="cardImage"
        v-if="props.leader.imgPath === ''"
        src="@/assets/upload/defaultUser.png"
      />
      <img class="cardImage" v-else :src="`${props.leader.imgPath}`" />
    </section>
    <section class="halfSize leaderSec">
      <div class="cardName">{{ props.leader.nickname }}</div>
      <div class="cardAge">{{ props.leader.age }}세</div>
      <div>{{ props.leader.gender }}</div>
      <div>{{ props.leader.region }}</div>
      <div v-if="props.leader.content === ''">자기소개가 없습니다.</div>
      <div v-else>{{ props.leader.content }}</div>
    </section>
  </section>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  leader: Object,
});
console.log(props.leader);
</script>
<style scoped>
@import '@/assets/css/LeaderNameCard.css';
</style>
