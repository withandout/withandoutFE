<template>
  <v-card class="d-flex flex-column py-2 rankComponent">
    <div class="d-flex justify-center mt-auto text-h4 font-weight-bold">
      🏅이번주 랭킹
    </div>
    <div>
      <div class="d-flex align-center flex-column my-auto">
        <template v-if="partyStore.partyLog.length > 0">
          <div class="text-h4">{{ partyStore.partyLog[0].nickname }}</div>
          <div class="mt-2">일주일 동안 {{ partyStore.partyLog[0].distance }} m 를 달렸어요 !!</div>
        </template>
      </div>
      <RankByDistance />
    </div>
  </v-card>
</template>
<script setup>
import RankByDistance from './RankByDistance.vue';
import { ref, onMounted } from 'vue';
import { usePartyStore } from '../../stores/party';
import { useRoute } from 'vue-router';

const route = useRoute();
const partyNo = ref(-1);
const viewToggle = ref(true);
const partyStore = usePartyStore();

onMounted(() => {
  partyNo.value = route.params.partyNo;
  console.log(partyNo.value);
  partyStore.getPartyLog(partyNo.value);
});
</script>
<style scoped>
@import '@/assets/css/DetailParty.css';

.rankPodium {
  transform: rotate(-90deg) translateX(-100%);
  transform-origin: top left;
}

.rating-values {
  width: 25px;
}
</style>
