<template>
  <section class="nameCard">
    <section class="halfSize imageSec">
      <img
        class="cardImage"
        v-if="userInfo.imgPath === ''"
        src="@/assets/upload/defaultUser.png"
      />
      <img class="cardImage" v-else :src="`${userInfo.imgPath}`" />
    </section>
    <section class="halfSize infoSec">
      <div class="cardName">{{ userInfo.nickname }}</div>
      <div>{{ userInfo.age }}세</div>
      <div>{{ userInfo.gender }}</div>
      <div>{{ userInfo.region }}</div>
      <section class="selfIntro">
        <div v-if="userInfo.content === ''">자기소개가 없습니다.</div>
        <div v-else>{{ userInfo.content }}</div>
        <button class="modifyBtn" @click.prevent="isUpdated = true">
          수정하기
        </button>
      </section>
      <div class="selfIntro" v-show="isUpdated">
        <input
          type="textarea"
          placeholder="자기소개를 입력하세요."
          v-model="updatedContent"
        />
        <button @click="modifyContent">완료</button>
      </div>
    </section>
  </section>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted, reactive, ref } from 'vue';
const store = useUserStore();
const userNo = JSON.parse(sessionStorage.getItem('sessionId')).userNo;
const userInfo = ref({});

const isUpdated = ref(false);
const updatedContent = ref('');

onMounted(() => {
  store.selectUser(userNo).then((data) => {
    userInfo.value = data;
  });
});

const modifyContent = () => {
  store.modifyUserContent(userNo, updatedContent.value);
  userInfo.value.content = updatedContent.value;
  updatedContent.value = '';
  isUpdated.value = false;
};
</script>

<style scoped>
@import '@/assets/css/main.css';
</style>
