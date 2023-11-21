<template>
  <section class="eachEvents">
    <div class="verticalBar"></div>
    <section class="infos">
      <section class="upperLine">
      <section>
        <span class="title">위치</span>
        <span class="info">{{ event.content }}</span>
      </section>
      <section>
          <span class="title">참여자 수</span>
          <span class="info">{{ event.noParticipant }}명</span>
        </section>
      </section>
      <section>
        <span class="title">날짜 및 시간</span>
        <span class="info">{{ changedStart }}</span>
        <span class="info">&nbsp; - {{ changedEnd }}</span>
      </section>
    </section>
    <button v-if="event.isApplied == 0" class="eventsApplyBtn" @click="applyEvent(event.eventNo)">신청</button>
    <button v-else class="eventsCancelBtn" @click="cancelEvent(event.eventNo)">취소</button>
  </section>
</template>
<script setup>
import { defineProps, ref } from 'vue';
import { usePartyStore } from '@/stores/party';

const partyStore = usePartyStore();

const props = defineProps({
  event: Object,
});

// 전부 시간을 위한 코드들
// 형 변환하기
// 주어진 타임스탬프
const startTime = props.event.sttTime - 9*60*60*1000;

// JavaScript Date 객체 생성
const startDate = new Date(startTime);

console.log(startDate.toTimeString());
const hours = startDate.toString().slice(16, 18);
const minutes = startDate.toString().slice(19, 21);
const userNo = JSON.parse(sessionStorage.getItem('sessionId')).userNo;

const applyEvent = (eventNo) => {
  partyStore.applyEvent(userNo, eventNo)
}

const cancelEvent = (eventNo) => {
  partyStore.cancelEvent(userNo, eventNo)
}

const changedStart = ref(
  `${
    startDate.getMonth() + 1
  }월 ${startDate.getDate()}일 ${hours}시 ${minutes}분`
);
const endTime = props.event.endTime - 9*60*60*1000;;
// JavaScript Date 객체 생성
const endDate = new Date(endTime);
const endHours = endDate.toString().slice(16, 18);
const endMinutes = endDate.toString().slice(19, 21);

const changedEnd = ref(
  `${
    endDate.getMonth() + 1
  }월 ${endDate.getDate()}일 ${endHours}시 ${endMinutes}분`
);
</script>
<style scoped>
@import '@/assets/css/ApplyEvents.css';
</style>
