<template>
  <section class="members">
  <h1 class="memberH1">MEMBERS</h1>
    <section class="memberSection">
      <div v-for="member in members">
        <img :src="`${member.imgPath}`" style="width: 6rem; height: 6rem; border-radius: 50%; margin: 1rem;" />
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
      console.log(res);
      members.value = res;
    });
    console.log(members.value);
  } else {
    console.log('해당 멤버를 찾을 수 없습니다.');
  }
});
</script>
<style scoped>
@import '@/assets/css/DetailParty.css';
</style>
