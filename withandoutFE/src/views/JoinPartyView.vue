<template>
  <section class="partyList" :class="{ disable: isApplied }">
    <section class="parties">
      <section v-for="(party, index) in store.partyList">
        <Party
          :party="party"
          @click="selectedParty(index)"
          />
          <!-- :identify="clickList[index]" -->
      </section>
    </section>
    <section class="partyInfo">
      <!-- 이거 에러처리 해줘야 할 듯 => 아무것도 없을 때 -->
      <!-- <PartyInfo
        v-if="store.partyList.length > 0"
        :clicked-party="store.partyList[clickedPartyNum]"
        :key="clickedPartyNum"
      /> -->
      <!-- 리더 네임카드 -->
      <button @click.prevent="isApplied = true">신청하기</button>
      <button @click.prevent="() => router.push({ name: 'home' })">
        나가기
      </button>
    </section>
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
import { onMounted, ref, watch } from 'vue';
import { usePartyStore } from '@/stores/party';
import Party from '@/components/Party/Party.vue';
import PartyInfo from '@/components/Party/PartyInfo.vue';
import { useRouter } from 'vue-router';

const introduce = ref('');
const store = usePartyStore();
const router = useRouter();
const clickList = ref([]);

// clickListReset, clickedPartyNo 초기화.
const clickListReset = () => {
  clickList.value = 
  Array.from({ length: store.partyList.length }, (v, i) => {
    if (i === 0) return true;
    else return false;
  });
  clickedPartyNum.value = 0;
}
 
const clickedPartyNum = ref(0);
const userInfo = ref(JSON.parse(sessionStorage.getItem('sessionId')));
const isApplied = ref(false);
const applyToParty = (partyNo, userNo, Date, introduce) => {
  store.applyToParty(partyNo, userNo, Date, introduce);
  clickListReset();
}


onMounted(() => {
  store.selectAvailableParty(userInfo.value.userNo, userInfo.value.region);
  // 토글 초기화
  clickListReset();
});

const selectedParty = (index) => {
  clickList.value = clickList.value.map((value, i) => i === index);
  clickedPartyNum.value = index;
};
</script>
<style scoped>
@import '@/assets/css/PartyList.css';
</style>
