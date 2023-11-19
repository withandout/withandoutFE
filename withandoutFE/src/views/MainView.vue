<template>
  <main>
    <section class="mainRow">
      <NavView />
      <Motivation />
      <Weather />
      <NameCard />
    </section>
    <section class="mainRow">
      <Calender />
      <InvitingInfo />
    </section>
  </main>
</template>
<script setup>
import Motivation from '@/components/Main/Motivation.vue';
import Weather from '@/components/Main/Weather.vue';
import NameCard from '@/components/Main/NameCard.vue';
import NavView from './NavView.vue';
import Calender from '../components/Main/Calender.vue';
import InvitingInfo from '../components/Main/InvitingInfo.vue';
</script>
<style scoped>
@import '@/assets/css/main.css';
</style>
