<template>
    <div class="profileBox">
        <div class="d-flex mt-2 mb-2 flex-column " v-for="i in 3" :key="i">
            <InvitationCard/>
        </div>
    </div>
</template>

<script setup>
import InvitationCard from './InvitationCard.vue';

</script>

<style scoped>
    @import '@/assets/css/main_modal.css';
</style>