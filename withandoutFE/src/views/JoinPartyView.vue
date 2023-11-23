<template>
  <section class="partyList" :class="{ disable: isApplied }">
    <section class="parties">
      <section v-for="party in store.partyList" :key="party.partyNo">
        <Party
          :party="party"
          @click="selectedParty(party.partyNo)"
          :class="{ partyFocus: selectedPartyNo === party.partyNo }"
        />
      </section>
    </section>
    <section class="partyInfo">
      <PartyInfo :clickedParty="clickedParty" />
      <LeaderNameCard :leader="leader" />
      <section class="partyBtns">
        <button @click.prevent="isApplied = true">신청하기</button>
        <button @click.prevent="() => router.push({ name: 'home' })">
          나가기
        </button>
      </section>
    </section>
    <div :class="{ disable: isApplied }"></div>
    <!-- 가운데 띄울 신청 정보 -->
    <section v-show="isApplied" class="invitation">
      <article class="inviInfo">
        <!-- 일단 들어가야할 정보 -->
        <h3>신청 정보</h3>
        <div class="inviSec">
          <span>이름</span>
          <span class="inviMargin">{{ userInfo.nickname }}</span>
        </div>
        <div class="inviSec">
          <span>나이</span>
          <span class="inviMargin">{{ userInfo.age }}</span>
        </div>
        <div class="inviSec">
          <span>성별</span>
          <span class="inviMargin">{{ userInfo.gender }}</span>
        </div>
        <input
          class="inviContent"
          type="textarea"
          placeholder="간단한 자기소개 입력해주세요."
          v-model="introduce"
        />
        <div>
          <button
            class="applyBtn"
            @click.prevent="
              applyToParty(
                store.partyList[clickedPartyNum].partyNo,
                userInfo.userNo,
                Date.now(),
                introduce
              )
            "
          >
            신청하기
          </button>
          <button class="applyBtn outBtn" @click.prevent="isApplied = false">
            나가기
          </button>
        </div>
      </article>
    </section>
  </section>
</template>
<script setup>
import { onMounted, onUpdated, ref, watch } from 'vue';
import { usePartyStore } from '@/stores/party';
import Party from '@/components/Party/Party.vue';
import PartyInfo from '@/components/Party/PartyInfo.vue';
import LeaderNameCard from '@/components/Party/LeaderNameCard.vue';

import { useRouter } from 'vue-router';

const introduce = ref('');
const store = usePartyStore();
const router = useRouter();
const clickedParty = ref({});
const selectedPartyNo = ref(0);
const leader = ref({});

// clickListReset, clickedPartyNo 초기화.
const clickListReset = () => {
  clickedPartyNum.value = 0;
  introduce.value = '';
};

const clickedPartyNum = ref(0);
const userInfo = ref(JSON.parse(sessionStorage.getItem('sessionId')));
const isApplied = ref(false);
const applyToParty = (partyNo, userNo, Date, introduce) => {
  store.applyToParty(partyNo, userNo, Date, introduce);
  isApplied.value = false;
  clickListReset();
};

onMounted(() => {
  store
    .selectAvailableParty(userInfo.value.userNo, userInfo.value.region)
    .then((data) => {
      selectedPartyNo.value = data[0].partyNo;
      clickedParty.value = data[0];
      store.selectLeader(selectedPartyNo.value).then((data) => {
        leader.value = data;
      });
    });

  // 토글 초기화
  clickListReset();
});

// 파티 선택하는 함수
const selectedParty = (partyNo) => {
  store.selectParty(partyNo).then((data) => {
    selectedPartyNo.value = partyNo;
    clickedParty.value = data;
  });
};
</script>
<style scoped>
@import '@/assets/css/PartyList.css';
</style>
