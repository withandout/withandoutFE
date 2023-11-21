<template>
  <section class="partyList">
    <section class="parties">
      <section v-for="(party, index) in store.partyList">
        <Party
          :party="party"
          :identify="clickList[index]"
          @click="selectedParty(index)"
        />
      </section>
    </section>
    <section class="partyInfo">
      <!-- 이거 에러처리 해줘야 할 듯 => 아무것도 없을 때 -->
      <PartyInfo
        v-if="store.partyList.length >= 0"
        :clicked-party="store.partyList[clickedPartyNum]"
        :key="clickedPartyNum"
      />
    </section>
  </section>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { usePartyStore } from '@/stores/party';
import Party from '@/components/Party/Party.vue';
import PartyInfo from '@/components/Party/PartyInfo.vue';

const store = usePartyStore();
const clickList = ref(
  Array.from({ length: store.partyList.length }, (v, i) => {
    if (i === 0) return true;
    else return false;
  })
);
const clickedPartyNum = ref(0);

onMounted(() => {
  store.selectAvailableParty();
  // 일단 true false 배열 만들기, selected style을 주기 위함
});

const selectedParty = (index) => {
  clickList.value = clickList.value.map((value, i) => i === index);
  clickedPartyNum.value = index;
};
</script>
<style scoped>
@import '@/assets/css/PartyList.css';
</style>
