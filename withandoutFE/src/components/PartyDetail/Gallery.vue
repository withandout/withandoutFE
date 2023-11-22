<template>
  <section class="galleryView">
    <v-row class="gallery">
    <v-col
      v-for="article in partyStore.partyArticles"
      :key="article.articleNo"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img
        :src="`${article.imgPath}`"
        :lazy-src="`${article.imgPath}`"
        aspect-ratio="1"
        cover
        class="bg-grey-lighten-2"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey-lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
  </section>
</template>
<script setup>

import { ref, onMounted } from 'vue';
import { usePartyStore } from '@/stores/party';
import { useRoute } from 'vue-router';

const partyStore = usePartyStore();
const route = useRoute();

const partyNo = ref(route.params.partyNo);

console.log(partyNo.value);

const articles = ref({});

onMounted(() => {
  partyStore.getPartyArticles(partyNo.value);

  articles.value = partyStore.partyArticles;
})

</script>
<style scoped>
@import '@/assets/css/DetailParty.css';
</style>
