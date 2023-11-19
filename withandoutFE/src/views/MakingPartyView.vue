<template>
  <section class="makePartyView">
    <form>
      <h2>Gather Members</h2>
      <section class="inputArea">
        <label for="name">파티 이름</label>
        <div>
          <input type="text" id="name" v-model="name" required />
          <span v-if="store.checkName">확인 완료</span>
          <button v-else @click.prevent="store.dupPartyName(name)">
            중복확인
          </button>
        </div>
      </section>
      <section class="setInput">
        <section class="inputArea">
          <label for="exercise">운동</label>
          <input type="text" id="exercise" v-model="sports" required />
        </section>
        <section class="inputArea">
          <label for="size">최대 인원</label>
          <input type="number" id="size" v-model="sizeLimit" required />
        </section>
      </section>
      <section class="inputArea">
        <label for="content">파티 소개글</label>
        <textarea id="content" v-model="content"></textarea>
      </section>
      <section class="imageArea">
        <input type="file" id="image" hidden @change="readInputFile" />
        <label for="image">
          <div class="htmlImage">이미지 가져오기</div>
          <div v-html="htmlImage"></div>
        </label>
      </section>
      <button class="makePartyBtn" @click.prevent="makeParty">
        파티 만들기
      </button>
    </form>
    <img class="poster" src="@/assets/img/make-party.png" />
  </section>
</template>
<script setup>
import { ref, watch } from 'vue';
import { usePartyStore } from '@/stores/party';
const store = usePartyStore();
const name = ref('');
const sports = ref('');
const sizeLimit = ref(10);
const content = ref('');
const htmlImage = ref('');
let fileArr;

const readInputFile = (e) => {
  // 미리보기 기능구현
  let files = e.target.files;
  fileArr = Array.prototype.slice.call(files);
  console.log(fileArr);
  fileArr.forEach(function (f) {
    if (!f.type.match('image/.*')) {
      alert('이미지 확장자만 업로드 가능합니다.');
      return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
      htmlImage.value = `<img style="width: 10rem;" src=${e.target.result} />`;
    };
    reader.readAsDataURL(f);
  });
};

const makeParty = () => {
  const region = JSON.parse(sessionStorage.getItem('sessionId')).region;
  const userNo = JSON.parse(sessionStorage.getItem('sessionId')).userNo;
  name.value = name.value.trim();
  sports.value = sports.value.trim();

  const party = {
    name: name.value,
    sports: sports.value,
    sizeLimit: sizeLimit.value,
    content: content.value,
    region: region,
    userNo: userNo,
  };

  const partyToBlob = new Blob([JSON.stringify(party)], {
    type: 'application/json',
  });

  const formData = new FormData();
  formData.append('party', partyToBlob);
  formData.append('image', fileArr[0]);

  if (store.checkName) {
    store.makeParty(formData);
  }
};

watch(htmlImage.value, () => {
  const imgElement = document.querySelector('.htmlImage img');
  imgElement.style.width = '3rem';
  imgElement.style.height = '3rem';
});
</script>
<style scoped>
@import '@/assets/css/makeParty.css';
</style>
