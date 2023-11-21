<template>
  <section class="weatherSec">
    <h1 class="loca">강남구</h1>
    <img
      class="weather"
      v-if="sky === '구름 많음'"
      src="@/assets/img/weather/weather_cloudy.png"
    />
    <img
      class="weather"
      v-else-if="sky === '흐림'"
      src="@/assets/img/weather/weather_foggy.png"
    />
    <img class="weather" v-else src="@/assets/img/weather/weather_sunny.png" />
    <div class="tmp">{{ tmp }}℃</div>
    <div class="reh">습도 {{ reh }}%</div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';

const tmp = ref(null);
const sky = ref(null);
const pty = ref(null);
const reh = ref(0);
const mapX = ref(0);
const mapY = ref(0);

// 날씨 API
const API_URL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst`;
const today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();
let hours = today.getHours();
month = month < 10 ? '0' + month : month;
day = day < 10 ? '0' + day : day;
//hours = hours < 10 ? '0' + hours + '00' : hours + '00';
const time = ['0200', '0500', '0800', '1100', '1400', '1700', '2000', '2300'];
if (hours % 3 === 1) {
  hours = hours - 2;
  if (hours < 0) hours = 23;
} else if (hours % 3 === 0) {
  hours = hours - 1;
  if (hours < 0) hours = 24;
}
hours = hours < 10 ? '0' + hours + '00' : hours + '00';
console.log(hours);
const todayStr = `${year}${month}${day}`;
const encodedServiceKey = encodeURIComponent(
  import.meta.env.VITE_WEATHER_API_KEY
);

// 날씨 API 가져오는 함수
const getWeatherAPI = async () => {
  try {
    await axios
      .get(API_URL, {
        params: {
          ServiceKey: encodedServiceKey,
          dataType: 'JSON',
          base_date: todayStr, //20231105 형태
          base_time: hours, //이것은 총 8회 발표
          numOfRows: 15,
          nx: mapX.value,
          ny: mapY.value,
        },
      })
      .then((response) => {
        console.log(response.data);
        return response.data.response.body.items.item;
      })
      .then((response) => {
        //TMP : 1시간 기온 ℃
        //UUU : 풍속(동서) m/s
        //VVV : 풍속(남북) m/s
        //VEC : 풍향 deg
        //WSD : 풍속 m/s
        //SKY : 하늘상태 --> 코드 : 맑음(1), 구름많음(3), 흐림(4)
        //PTY : 강수형태 --> 코드 : 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
        //POP : 강수확률 %
        //WAV : 파고 M
        //PCP : 1시간 강수량 범주(1mm)
        //REH : 습도 %
        //SNO : 1시간 적설량
        //TMN : 일 최저기온 ℃ x
        //TMX : 일 최고기온 ℃ x
        response.forEach((item) => {
          if (item.category === 'TMP') {
            tmp.value = item.fcstValue;
          } else if (item.category === 'SKY') {
            switch (item.fcstValue) {
              case '1':
                sky.value = '맑음';
                break;
              case '3':
                sky.value = '구름많음';
                break;
              case '4':
                sky.value = '흐림';
                break;
            }
          } else if (item.category === 'PTY') {
            switch (item.fcstValue) {
              case '0':
                pty.value = '없음';
                break;
              case '1':
                pty.value = '비';
                break;
              case '2':
                pty.value = '비/눈';
                break;
              case '3':
                pty.value = '눈';
                break;
              case '4':
                pty.value = '소나기';
                break;
            }
          } else if (item.category === 'REH') {
            reh.value = item.fcstValue;
          }
        });
      });
  } catch (err) {
    console.log(err);
  }
};

// 처음 마운트하고 현재 위치 가져왔을 때 weatherAPI 날림
onMounted(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      mapX.value = Math.floor(position.coords.latitude);
      mapY.value = Math.floor(position.coords.longitude);
      getWeatherAPI();
    },
    (error) => {
      console.error('위치 정보를 가져오는 중 오류가 발생했습니다: ', error);
    }
  );
});

// 바뀔 때 실시간으로 변경
watch([mapX, mapY], () => {
  getWeatherAPI();
});
</script>

<style scoped>
@import '@/assets/css/main.css';
</style>
