<template>
  <section class="detailPartyView">
    <section class="detailRow">
      <NavView />
      <Rank />
      <PartyMembers />
    </section>
    <section class="detailRow">
      <ApplyEvents />
      <Gallery />
    </section>
  </section>
</template>
<script setup>
import NavView from '@/views/NavView.vue';
import Rank from '@/components/PartyDetail/Rank.vue';
import ApplyEvents from '@/components/PartyDetail/ApplyEvents.vue';
import PartyMembers from '@/components/PartyDetail/PartyMembers.vue';
import Gallery from '@/components/PartyDetail/Gallery.vue';

</script>
<style scoped>
@import '@/assets/css/DetailParty.css';
</style>
