<template>
  <section
    class="applyEvents"
    :class="{ nono: store.applyEvents.length === 0 }"
  >
    <section class="wrapEvents">
      <template v-if="store.applyEvents.length === 0">
        <div class="noEvents">이벤트 없어요. 등록해주세요.</div>
      </template>
      <section v-else>
        <template v-for="event in store.applyEvents">
          <EachEvents :event="event" />
        </template>
      </section>
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
