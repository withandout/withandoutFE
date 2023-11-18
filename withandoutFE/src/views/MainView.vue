<template>
  <main>
    <NavView />
    <Motivation />
    <Weather />
    <NameCard />
  </main>
</template>
<script setup>
import Motivation from '@/components/Main/Motivation.vue';
import Weather from '@/components/Main/Weather.vue';
import NameCard from '@/components/Main/NameCard.vue';
import NavView from './NavView.vue';
</script>
<style scoped>
@import '@/assets/css/main.css';
</style>
