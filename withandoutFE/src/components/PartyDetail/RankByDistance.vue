<template>
    <div class="rankList">
    <v-list bg-color="transparent"
    class="d-flex flex-column"
    density="compact">
        <v-list-item v-for="(value ,i) in partyStore.partyLog" :key="i">
        <v-progress-linear
            :model-value="`${value['distance']/1000*12}`"
            class="mx-n5"
            color="yellow-darken-3"
            height="20"
            rounded
        ></v-progress-linear>

        <template v-slot:prepend>
            <div class="rating-value">
                <img class="imgRanking" :src="`${value['imgPath']}`"/>
                <span class="d-flex justify-end"> {{ value["nickname"]}} </span>
            </div>
        </template>

        <template v-slot:append>
            <div class="rating-value">
                <div class="point-box">
                    <span class="d-flex justify-end"> {{ (value["distance"] - value["distance"]%100)/1000 }}km</span>
                </div>
            </div>
        </template>
        </v-list-item>
    </v-list>
    </div>
</template>
<script setup>
import { usePartyStore } from '@/stores/party';
const partyStore = usePartyStore();
</script>
<style scoped>
@import '@/assets/css/DetailParty.css';
</style>