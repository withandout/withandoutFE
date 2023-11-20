<template>
  <nav>
    <span class="wrapIcons">
    <v-menu class="alarms" v-model="localAlertOn" :close-on-content-click="false" location="end top" origin="auto">
      <template v-slot:activator="localAlertOn" location="end center" origin="auto">
        <font-awesome-icon class="icons" icon="fa-bell" @click.prevent="toggleAlert"/>
      </template>
      <InvitationAlert/>
    </v-menu>
      
    </span>
    <span class="wrapIcons">
      <v-menu class="alarms" v-model="localTownOn" :close-on-content-click="false" location="end top" origin="auto">
      <template v-slot:activator="localTownOn" location="end center" origin="auto">
        <font-awesome-icon class="icons" icon="fa-solid fa-location-crosshairs" @click.prevent="toggleTown"/>
      </template>
      <TownValidation/>
    </v-menu>
      
    </span>
    <span class="wrapIcons">
      <font-awesome-icon
        class="icons"
        icon="fa-solid fa-arrow-right-from-bracket"
      />
    </span>
    <span
      class="wrapIcons"
      @click.prevent="() => router.push({ name: 'home' })"
    >
      <font-awesome-icon class="icons" icon="fa-solid fa-house" />
    </span>
  </nav>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import InvitationAlert from '../components/Main/InvitationAlert.vue';
import TownValidation from '../components/Main/TownValidation.vue';

const router = useRouter();
const store = useUserStore();

const localAlertOn = ref(false);
const localTownOn = ref(false);

const menu = ref(false);

const toggleAlert = () => {
  localAlertOn.value = (! localAlertOn.value);
  console.log(localAlertOn.value)
}

const toggleTown = () => {
  localTownOn.value = (! localTownOn.value);
  console.log(localTownOn.value)
}
 
</script>
<style scoped>
@import '@/assets/css/nav.css';
</style>
