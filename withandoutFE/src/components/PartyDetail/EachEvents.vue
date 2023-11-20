<template>
  <section class="eachEvents">
    <div class="verticalBar"></div>
    <section class="infos">
      <section>
        <span class="title">위치</span>
        <span class="info">{{ event.content }}</span>
      </section>
      <section>
        <span class="title">날짜 및 시간</span>
        <span class="info">{{ changedStart }}</span>
        <span class="info"> ~ {{ changedEnd }}</span>
      </section>
    </section>
    <button class="eventsBtn">신청</button>
  </section>
</template>
<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
  event: Object,
});

// 전부 시간을 위한 코드들
// 형 변환하기
// 주어진 타임스탬프
const startTime = props.event.sttTime;
// JavaScript Date 객체 생성
const startDate = new Date(startTime);
const hours = startDate.toTimeString().slice(13, 15);
const minutes = startDate.toTimeString().slice(15, 17);

const changedStart = ref(
  `${
    startDate.getMonth() + 1
  }월 ${startDate.getDate()}일 ${hours}시 ${minutes}분`
);
const endTime = props.event.endTime;
// JavaScript Date 객체 생성
const endDate = new Date(endTime);
const endHours = startDate.toTimeString().slice(13, 15);
const endMinutes = startDate.toTimeString().slice(15, 17);

const changedEnd = ref(
  `${
    endDate.getMonth() + 1
  }월 ${endDate.getDate()}일 ${endHours}시 ${endMinutes}분`
);
</script>
<style scoped>
@import '@/assets/css/ApplyEvents.css';
</style>
