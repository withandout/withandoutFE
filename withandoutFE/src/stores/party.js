import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { defineStore } from 'pinia';

export const usePartyStore = defineStore('party', () => {
  const REST_API_PARTY = `http://localhost:8080/party`;
  const router = useRouter();
  const checkName = ref(false);

  // 아이디 중복체크
  const dupPartyName = (name) => {
    axios({
      url: `${REST_API_PARTY}/validate`,
      method: 'POST',
      data: { name: name },
    }).then((response) => {
      // 어떤거 날려주는지 확인하고 true/false 값 바꾸기
      // 406 -> 현재 존재한다는 의미
      // 200 -> 존재하지 않으면 200, 사용할 수 있다는 의미
      if (response.status === 200) {
        checkName.value = true;
      }
    });
  };

  const makeParty = (formData) => {
    axios({
      url: `${REST_API_PARTY}/new`,
      headers: { 'Content-Type': 'multipart/form-data' },
      method: 'POST',
      data: formData,
    }).then(() => {
      alert('파티가 생성되었습니다.');
      router.push('/home');
    });
  };
  return {
    checkName,
    dupPartyName,
    makeParty,
  };
});
