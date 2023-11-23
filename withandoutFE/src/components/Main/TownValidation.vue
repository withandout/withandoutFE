<template>
  <div>
    <v-sheet
      border="md"
      class="pa-6 text-black mx-auto"
      color="#FEFEFE"
      max-width="250"
    >
      <h5 class="text-h5 font-weight-bold mb-3 text-center">동네 인증</h5>

      <h4 class="text-h6 font-weight-bold mb-1 text-center">현재 위치</h4>

      <h4 v-if="userLocation === ''" class="text-h8 mb-3 text-center">
        위치 확인중
      </h4>
      <h4 v-else class="text-h5 font-weight-black mb-3 text-center">
        {{ userLocation }}
      </h4>

      <v-btn
        block
        class="text-h6 font-weight-bold text-black mb-4"
        color="blue"
        variant="flat"
        :disabled="userStore.townAuthorized"
        @click="userStore.townAuthorize(userNo, userLocation)"
      >
        <h4
          v-if="props.townVaild"
          class="text-h6 font-weight-bold text-center text-white"
        >
          인증 완료
        </h4>
        <h4 v-else>인증 하기</h4>
      </v-btn>
    </v-sheet>
  </div>
</template>
<script setup>
import { useUserStore } from '@/stores/user';
import { usePartyStore } from '@/stores/party';

import { ref, onMounted } from 'vue';
import { defineProps } from 'vue';

const userStore = useUserStore();
const partyStore = usePartyStore();
const townAuthorized = ref(false);
const userNo = JSON.parse(sessionStorage.getItem('sessionId')).userNo;
const userLocation = ref('');
const props = defineProps({
  townVaild: Boolean,
});

const initMap = function () {
  let myCenter = new kakao.maps.LatLng(33.450701, 126.570667); //카카오본사
  const geocoder = new kakao.maps.services.Geocoder();
  const searchDetailAddrFromCoords = (coords) => {
    geocoder.coord2Address(
      coords.getLng(),
      coords.getLat(),
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          if (result[0].road_address) {
            console.log(result[0].road_address.address_name);
          }
          if (result[0].address) {
            userLocation.value = result[0].address.address_name.slice(3, 6);
          }
        }
      }
    );
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      myCenter = new kakao.maps.LatLng(lat, lon);
      searchDetailAddrFromCoords(myCenter);
    });
  }
};

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement('script'); // autoload=false 스크립트를 동적으로 로드하기 위해서 사용
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_API_KEY
    }&libraries=services`;
    script.addEventListener('load', () => {
      kakao.maps.load(initMap);
    }); //헤드태그에 추가
    document.head.appendChild(script);
  }
  townAuthorized.value = props.townVaild;
});
</script>

<style scoped>
@import '@/assets/css/main_modal.css';
</style>
