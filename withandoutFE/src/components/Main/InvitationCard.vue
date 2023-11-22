<template>
  <div>
    <div v-show="showCard">
      <v-card
        class="mx-auto"
        max-width="350"
        :title="props.applicant['nickname']"
        :subtitle="
          props.applicant['gender'] + ' ' + props.applicant['age'] + '세'
        "
        style="background-color: aliceblue"
      >
        <template v-slot:prepend>
          <!-- 이후 유저 이미지 사진으로 변경해야 함 -->
          <img
            class="profile"
            :src="props.applicant['imgPath']"
            style="border-radius: 50%; width: 3rem; height: 3rem"
          />
        </template>
        <template v-slot:append>
          <img
            @click="partyStore.acceptApply(userNo, partyNo)"
            class="approval yes"
            src="@/assets/img/yes.png"
          />
          <img
            @click="partyStore.declineApply(userNo, partyNo)"
            class="approval"
            src="@/assets/img/remove.png"
          />
        </template>
        <v-card-text> {{ props.applicant['content'] }} </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePartyStore } from '../../stores/party';

const partyStore = usePartyStore();
const showCard = ref(true);

const props = defineProps({
  applicant: Object,
});

const acceptApply = (userNo, partyNo) => {
  partyStore.acceptApply(userNo, partyNo);
};

const declineApply = (userNo, partyNo) => {
  partyStore.declineApply(userNo, partyNo);
};

const userNo = props.applicant['userNo'];
const partyNo = props.applicant['partyNo'];
</script>

<style scoped>
@import '@/assets/css/main_modal.css';
</style>
