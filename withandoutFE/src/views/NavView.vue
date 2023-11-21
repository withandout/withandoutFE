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
      <TownValidation :townValid="townValid" :userNo="userNo"/>
    </v-menu>
      
    </span>
    <span class="wrapIcons">
      <font-awesome-icon
        class="icons"
        icon="fa-solid fa-arrow-right-from-bracket"
        @click.prevent="userStore.logout()"
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
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { usePartyStore } from '@/stores/party';
import InvitationAlert from '../components/Main/InvitationAlert.vue';
import TownValidation from '../components/Main/TownValidation.vue';

const router = useRouter();
const userStore = useUserStore();
const partyStore = usePartyStore();
const townValid = ref(false);

const localAlertOn = ref(false);
const localTownOn = ref(false);

const menu = ref(false);

const toggleAlert = () => {
  localAlertOn.value = (! localAlertOn.value);
}

const toggleTown = () => {
  localTownOn.value = (! localTownOn.value);
}

onMounted(() => {
  const userNo = JSON.parse(sessionStorage.getItem('sessionId')).userNo;
  userStore.isTownAuthorized(userNo);
  
  partyStore.selectApplicatns(userNo);
})

</script>
<style scoped>
@import '@/assets/css/nav.css';
</style>
