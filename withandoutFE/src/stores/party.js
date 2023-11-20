import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const usePartyStore = defineStore('party', () => {
  const REST_API_PARTY = `http://localhost:8080/party`;
  const router = useRouter();
  const invitingMembers = ref({});
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

  // 파티 만들기
  const makeParty = (formData) => {
    axios({
      url: `${REST_API_PARTY}/new`,
      headers: { 'Content-Type': 'multipart/form-data' },
      method: 'POST',
      data: formData,
    }).then(() => {
      alert('파티가 생성되었습니다.');
      router.push('/home');
      checkName.value = false;
    });
  };

  // 해당 파티의 유저 조회하기
  const selectMembers = (partyNo) => {
    const promise = axios({
      url: `${REST_API_PARTY}/member/${partyNo}`,
      method: 'GET',
    });
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  };

  return {
    checkName,
    invitingMembers,
    dupPartyName,
    makeParty,
    selectMembers,
  };
});
