<template>
  <section class="partyWrap" >
    <!-- :class="{ partyFocus: props.identify }" -->

    <img
      :src="`${props.party.imgPath}`"
      class="partyImage"
      style="width: 4rem; height: 4rem; border-radius: 50%; margin-left: 1rem"
    />
    <section class="partyEachInfo">
      <div class="partyName">{{ props.party.name }}</div>
      <span class="partySize"
        ><span class="sizeName">정원</span> {{ props.party.sizeCurrent }} /
        {{ props.party.sizeLimit }}
      </span>
    </section>
    <div class="partySports">{{ props.party.sports }}</div>
  </section>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  party: Object,
  // identify: Boolean,
});
</script>
<style scoped>
@import '@/assets/css/PartyList.css';
</style>
