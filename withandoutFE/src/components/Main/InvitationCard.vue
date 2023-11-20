<template>
    <div>
        <v-card
      class="mx-auto"
      max-width="350"
      title="이승헌"
      subtitle="남성 강남구 28세"
      style="background-color: aliceblue"
        >
        <template v-slot:prepend>
            <!-- 이후 유저 이미지 사진으로 변경해야 함 -->
            <img class="profile" src="@/assets/img/default_user.png"/>
        </template>
        <template v-slot:append>
            <img class="approval yes" src="@/assets/img/yes.png"/>
            <img class="approval" src="@/assets/img/remove.png"/>    
        </template>
        <v-card-text
            >러닝 5년 했습니다. 역삼동 근처에서 즐겁게 달리실 분들과 함께하고
            싶습니다!</v-card-text
        >
        </v-card>
    </div>
  </template>

<script setup>

</script>

<style scoped>
    @import '@/assets/css/main_modal.css';
</style>

