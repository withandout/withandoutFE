<template>
  <form>
    <label for="id">아이디</label>
    <input type="text" id="id" v-model="userId" />
    <div>중복확인</div>
    <label for="password">비밀번호</label>
    <input type="password" id="password" v-model="password" />
    <label for="nickname">닉네임</label>
    <input type="text" id="nickname" v-model="nickname" />
    <div>중복확인</div>
    <label for="region">지역</label>
    <select v-model="region" id="region">
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
    <label for="gender">성별</label>
    <select id="gender" v-model="gender">
      <option>남</option>
      <option>여</option>
    </select>
    <label for="age">나이</label>
    <input type="number" id="age" min="20" v-model="age" />
    <input type="file" id="image" hidden />
    <label for="image">
      <div>이미지</div>
    </label>
    <button>회원가입</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style scoped></style>
