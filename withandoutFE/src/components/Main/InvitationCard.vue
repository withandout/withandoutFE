<template>
    <div>
        <v-card
      class="mx-auto"
      max-width="350"
      :title="props.applicant['nickname']"
      :subtitle="props.applicant['gender'] + ' ' + props.applicant['age'] + '세'"
      style="background-color: aliceblue">
        <template v-slot:prepend>
            <!-- 이후 유저 이미지 사진으로 변경해야 함 -->
            <img class="profile" :src="props.applicant['imgPath']" style="border-radius: 50%; width: 3rem; height: 3rem;"/>
        </template>
        <template v-slot:append>
            <img class="approval yes" src="@/assets/img/yes.png"/>
            <img class="approval" src="@/assets/img/remove.png"/>    
        </template>
        <v-card-text
            > {{props.applicant["content"]}} </v-card-text
        >
        </v-card>
    </div>
  </template>

<script setup>

const props = defineProps({
    applicant: Object,
})
</script>

<style scoped>
    @import '@/assets/css/main_modal.css';
</style>

