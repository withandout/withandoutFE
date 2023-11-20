<template>
  <section class="invitingView">
    <h1 class="invitedText">참여 중인 파티 정보</h1>
    <!-- axios로 data 가져와서 v-for로 보여줄 것 -->
    <section class="wrapParties">
      <section class="parties" v-for="party in store.partyList">
        <InvitingParty
          :party="party"
          @click="
            router.push({ name: 'detail', params: { partyNo: party.partyNo } })
          "
        />
      </section>
    </section>
    <section class="invitingBtns">
      <button
        class="makeParty"
        @click="() => router.push({ name: 'makeParty' })"
      >
        파티 만들기
      </button>
      <button
        class="joinParty"
        @click="() => router.push({ name: 'joinParty' })"
      >
        신청하기
      </button>
    </section>
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../stores/user';
import { useRouter } from 'vue-router';
import InvitingParty from './InvitngParty.vue';
const router = useRouter();
const store = useUserStore();
const sessionId = ref('');
onMounted(() => {
  // 세션 아이디 가져오기
  sessionId.value = JSON.parse(sessionStorage.getItem('sessionId')).userNo;
  store.selectUserParties(sessionId.value);
});
</script>
<style scoped>
@import '@/assets/css/main.css';
@import '@/assets/css/inviting.css';
</style>
