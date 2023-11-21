<template>
  <section class="joinPartyWrap">
    <section class="clickPartyInfo">
      <div class="clip"></div>
      <section class="partyEaches">
        <div class="clickedSize">{{ props.clickedParty.name }}</div>
        <span class="clickedSize">
          <span class="sizeName">운동 종목</span
          >{{ props.clickedParty.sports }}</span
        >
        <span class="clickedSize"
          ><span class="sizeName">최대 인원</span>
          {{ props.clickedParty.sizeLimit }}명
        </span>
      </section>
      <img
        class="clickedImage"
        v-if="props.clickedParty.imgPath === ''"
        src="@/assets/img/default_party.png"
      />
      <img v-else :src="`${props.clickedParty.imgPath}`" class="clickedImage" />
    </section>
    <div class="clickedContent">{{ props.clickedParty.content }}</div>
  </section>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  clickedParty: Object,
});
</script>
<style scoped>
@import '@/assets/css/PartyList.css';
</style>
