<template>
  <section class="invitingParty">
    <img class="invitingImg" :src="partyImgSrc" />
    <section class="invitingInfo">
      <section class="partyInfo">
        <div class="partyName">{{ props.party.name }}</div>
        <div class="partySports">{{ props.party.sports }}</div>
      </section>
      <section class="partyContent">
        <div v-for="member in memberImgSrc">
          <!-- <img
            v-if="member.imgPath === ''"
            class="memberImg"
            src="@/assets/img/default_user.png"
          /> -->
          <img :src="`${member.imgPath}`" style= "width: 4rem; height: 4rem; border-radius: 50%; margin-left: 1rem;" />
        </div>
      </section>
    </section>
  </section>
</template>
<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { usePartyStore } from '../../stores/party';
const partyImgSrc = ref('');
const memberImgSrc = ref('');
const store = usePartyStore();
const props = defineProps({
  party: Object,
});

onMounted(() => {
  if (props.party.imgPath) {
    const fileNameRegex = /\/([^\/]+)$/; // 마지막 슬래시 뒤의 문자열을 가져옴
    const match = props.party.imgPath.match(fileNameRegex);
    // match 배열에서 두 번째 요소가 파일 이름
    if (match && match[1]) {
      const fileName = match[1].slice(6);
      partyImgSrc.value = `${props.party.imgPath}`;
    } else {
      console.log('파일 이름을 찾을 수 없습니다.');
    }
  } else {
    partyImgSrc.value = '/src/assets/upload/defaultParty.png';
  }

  if (props.party.partyNo) {
    store.selectMembers(props.party.partyNo).then((data) => {
      memberImgSrc.value = data;
    });
    console.log(memberImgSrc.value);
  } else {
    console.log('해당 멤버를 찾을 수 없습니다.');
  }
});
</script>
<style scoped>
@import '@/assets/css/inviting.css';
</style>
