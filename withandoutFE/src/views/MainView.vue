<template>
  <main>
<<<<<<< Updated upstream
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
=======
    <NavView />
    <Motivation/>
    <!-- <TownValidation/> -->
    <Weather />
    <NameCard />
>>>>>>> Stashed changes
  </main>
</template>
<script setup>
import Motivation from '@/components/Main/Motivation.vue';
import Weather from '@/components/Main/Weather.vue';
import NameCard from '@/components/Main/NameCard.vue';
import NavView from './NavView.vue';
<<<<<<< Updated upstream
import Calender from '../components/Main/Calender.vue';
import InvitingInfo from '../components/Main/InvitingInfo.vue';
=======
import InvitationAlert from '../components/Main/InvitationAlert.vue';

import {ref, watch} from 'vue';

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import TownValidation from '../components/Main/TownValidation.vue';
const store = useUserStore();


>>>>>>> Stashed changes
</script>
<style scoped>
@import '@/assets/css/main.css';
</style>
