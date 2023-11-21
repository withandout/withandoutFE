<template>
  <section class="signup">
    <img class="poster" src="@/assets/img/signup.jpg" alt="poster" />
    <form>
      <h2>Sign Up</h2>
      <section class="inputArea">
        <label for="id">아이디</label>
        <div>
          <input type="text" id="id" v-model="userId" required />
          <span class="complete" v-if="store.checkId">확인 완료</span>
          <button v-else @click.prevent="store.dupCheckId(userId)">
            중복확인
          </button>
        </div>
      </section>
      <section class="inputArea">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" required />
      </section>
      <section class="inputArea">
        <label for="nickname">닉네임</label>
        <div>
          <input type="text" id="nickname" v-model="nickname" required />
          <span class="complete" v-if="store.checkNickname">확인 완료</span>
          <button v-else @click.prevent="store.dupCheckNick(nickname)">
            중복확인
          </button>
        </div>
      </section>
      <section class="setInput">
        <section class="inputArea">
          <label for="region">지역</label>
          <select v-model="region" id="region" required>
            <option disabled value="">다음 중 하나를 선택하세요.</option>
            <option>도봉구</option>
            <option>강북구</option>
            <option>노원구</option>
            <option>은평구</option>
            <option>성북구</option>
            <option>중랑구</option>
            <option>동대문구</option>
            <option>종로구</option>
            <option>서대문구</option>
            <option>중구</option>
            <option>마포구</option>
            <option>용산구</option>
            <option>성동구</option>
            <option>광진구</option>
            <option>강동구</option>
            <option>송파구</option>
            <option>강남구</option>
            <option>서초구</option>
            <option>동작구</option>
            <option>관악구</option>
            <option>영등포구</option>
            <option>금천구</option>
            <option>양천구</option>
            <option>구로구</option>
            <option>강서구</option>
          </select>
        </section>
        <section class="inputArea">
          <label id="gender" for="gender">성별</label>
          <select id="gender" v-model="gender" required>
            <option>남</option>
            <option>여</option>
          </select>
        </section>
        <section class="inputArea">
          <label id="age" for="age">나이</label>
          <input type="number" id="age" min="20" v-model="age" required />
        </section>
      </section>
      <section class="imageArea">
        <input type="file" id="image" hidden @change="readInputFile" />
        <label for="image">
          <div class="htmlImage">이미지 가져오기</div>
          <div v-html="htmlImage"></div>
        </label>
      </section>
    </form>
    <button class="signupBtn" @click.prevent="signup">회원가입</button>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';

const userId = ref('');
const password = ref('');
const nickname = ref('');
const region = ref('');
const gender = ref('');
const age = ref(20);
const htmlImage = ref('');
let fileArr;
const store = useUserStore();

// 아이디 형식 정규식
const idReg = /^[a-zA-Z0-9]{6,20}$/;
// 비밀번호 형식 정규식
const passReg = /^[a-zA-Z0-9_*!@#$%^&(){}\[\]:;<>,.?~\\+=|~-]{8,15}$/;

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

const signup = () => {
  // 중복확인이 true일 때 확인 로직 필요
  userId.value = userId.value.trim();
  password.value = password.value.trim();

  const user = {
    userId: userId.value,
    password: password.value,
    nickname: nickname.value,
    region: region.value,
    gender: gender.value,
    age: age.value,
  };

  const userToBlob = new Blob([JSON.stringify(user)], {
    type: 'application/json',
  });

  const formData = new FormData();
  formData.append('user', userToBlob);
  if (fileArr !== undefined) {
    formData.append('image', fileArr[0]);
  }

  // 아이디와 비밀번호 형식, 중복확인이 모두 완료되었을 떄
  if (
    store.checkId &&
    store.checkNickname &&
    idReg.test(userId.value) &&
    passReg.test(password.value)
  ) {
    // user 넣어주기
    store.signupUser(formData);
  } else if (!store.checkId) {
    alert('아이디 중복체크 해주세요.');
  } else if (!store.checkNickname) {
    alert('닉네임 중복체크 해주세요.');
  } else if (!idReg.test(userId.value)) {
    alert(
      '아이디 형식이 틀렸습니다. 아이디는 문자와 숫자 8자리 이상 25자리 이하여야 합니다.'
    );
  } else if (!passReg.test(password.value)) {
    alert(
      '비밀번호 형식이 틀렸습니다. 비밀번호는 8자리 이상 20자리 이하여야 합니다.'
    );
  }
};

watch(htmlImage.value, () => {
  const imgElement = document.querySelector('.htmlImage img');
  imgElement.style.width = '3rem';
  imgElement.style.height = '3rem';
});
</script>

<style scoped>
@import '@/assets/css/signup.css';
</style>
