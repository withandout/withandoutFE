<template>
  <section class="applyEvents">
    <section class="wrapEvents">
      <template v-for="event in store.applyEvents">
        <EachEvents :event="event" />
      </template>
    </section>
  </section>
</template>
<script setup>
import { usePartyStore } from '@/stores/party';
import { onMounted } from 'vue';
import EachEvents from './EachEvents.vue';
const { data } = history.state;
const store = usePartyStore();

onMounted(() => {
  store.selectAllEvents({ partyNo: data.partyNo, userNo: data.userNo });
});
</script>
<style scoped>
@import '@/assets/css/ApplyEvents.css';
</style>
