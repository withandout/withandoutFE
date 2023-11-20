<template>
  <section class="members">
    <h1 class="memberH1">MEMBERS</h1>
    <section class="memberSection">
      <div v-for="member in members">
        <img
          v-if="member.imgPath === ''"
          class="memberImg"
          src="@/assets/img/default_user.png"
        />
        <img v-else :src="`@/assets/upload/${member.imgPath}`" />
        <div class="nickname">
          {{ member.nickname }}
        </div>
      </div>
    </section>
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { usePartyStore } from '../../stores/party';
const members = ref({});
const store = usePartyStore();
const { data } = history.state;
onMounted(() => {
  if (data.partyNo) {
    store.selectMembers(data.partyNo).then((res) => {
      members.value = res;
    });
  } else {
    console.log('해당 멤버를 찾을 수 없습니다.');
  }
});
</script>
<style scoped>
@import '@/assets/css/DetailParty.css';
</style>
