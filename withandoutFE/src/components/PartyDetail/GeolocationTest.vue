<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
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
            console.log(result[0].address.address_name);
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
});
</script>

<style scoped>
#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  height: 400px;
}
</style>
