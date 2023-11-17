import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const REST_API_USER = `http://localhost:8080/user`;
  const router = useRouter();
  // 로그인
  const login = (user) => {
    axios({
      url: `${REST_API_USER}/login`,
      method: 'POST',
      data: user,
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log(res.data);
        const sessionId = res.data.sessionId;
        sessionStorage.setItem('sessionId', sessionId);
        alert('로그인 완료되었습니다.');
        router.push('home');
      } else {
        alert('정보를 다시 확인해주세요.');
      }
    });
  };

  // 회원가입
  const signupUser = (user) => {
    axios({
      url: `${REST_API_USER}/signup`,
      method: 'POST',
      data: user,
    }).then(() => {
      alert('회원가입 되었습니다.');
      router.push('/');
    });
  };
  return { login, signupUser };
});
