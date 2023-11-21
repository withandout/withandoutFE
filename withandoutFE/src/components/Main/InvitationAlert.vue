<template>
    <div class="profileBox">
        <div class="d-flex mt-2 mb-2 flex-column " v-for="applicant in applicants" :key="applicant.userNo">
            <InvitationCard :applicant="applicant"/>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import InvitationCard from './InvitationCard.vue';
import { usePartyStore } from '@/stores/party';

const partyStore = usePartyStore();

const applicants = ref({})

onMounted(() => {
    applicants.value = partyStore.applicants;
    console.log(applicants.value)
}) 

</script>

<style scoped>
    @import '@/assets/css/main_modal.css';
</style>