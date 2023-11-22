<template>
  <section class="calendarView">
    <VCalendar
      expanded
      title-position="left"
      :attributes="attributes"
      style="height: 24rem; margin-top: 1rem; padding-top: 3rem"
    />
  </section>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const userNo = JSON.parse(sessionStorage.getItem('sessionId')).userNo;

const attributes = computed(() => [
  ...userStore.userEvents.map((todo) => ({
    dates: todo.dates,
    dot: {
      color: todo.color,
      ...(todo.isComplete && { class: 'opacity-75' }),
    },
    popover: {
      label: todo.description,
    },
  })),
]);

onMounted(() => {
  userStore.getAllEvents(userNo);
});
</script>
<style scoped>
@import '@/assets/css/main.css';
@import 'v-calendar/style.css';
</style>
