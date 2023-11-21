import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const REST_API_USER = `http://localhost:8080/user`;
  const router = useRouter();
  const checkId = ref(false);
  const checkNickname = ref(false);
  const partyList = ref({});
  const alertOn = ref(false);
  const townAuthorized = ref(false);

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
        const sessionId = JSON.stringify(res.data);
        sessionStorage.setItem('sessionId', sessionId);
        alert('로그인 완료되었습니다.');
        router.push('home');
      } else {
        alert('정보를 다시 확인해주세요.');
      }
    });
  };

  // 로그아웃
  const logout = () => {
    axios({
      url: `${REST_API_USER}/logout`,
      method: 'GET',
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        sessionStorage.removeItem('sessionId');
        alert('로그아웃 되었습니다.');
        router.push('/login');
      }
    });
  };

  // 회원가입
  const signupUser = (formData) => {
    axios({
      url: `${REST_API_USER}/signup`,
      headers: { 'Content-Type': 'multipart/form-data' },
      method: 'POST',
      data: formData,
    }).then(() => {
      alert('회원가입 되었습니다.');
      router.push('/');
      checkId.value = false;
      checkNickname.value = false;
    });
  };

  // 아이디 중복체크
  const dupCheckId = (userId) => {
    axios({
      url: `${REST_API_USER}/validate`,
      method: 'POST',
      data: { userId: userId },
    }).then((response) => {
      // 어떤거 날려주는지 확인하고 true/false 값 바꾸기
      // 406 -> 현재 존재한다는 의미
      // 200 -> 존재하지 않으면 200, 사용할 수 있다는 의미
      if (response.status === 200) {
        checkId.value = true;
      }
    });
  };

  // 닉네임 중복체크
  const dupCheckNick = (nickname) => {
    axios({
      url: `${REST_API_USER}/validate`,
      method: 'POST',
      data: { nickname: nickname },
    }).then((response) => {
      // 어떤거 날려주는지 확인하고 true/false 값 바꾸기
      if (response.status === 200) {
        checkNickname.value = true;
      }
    });
  };

  // 유저 가입 파티 조회
  const selectUserParties = (userNo) => {
    axios({
      url: `${REST_API_USER}/myparty/${userNo}`,
      method: 'GET',
    })
      .then((response) => {
        partyList.value = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // alert 켜기
  const alertToggle = () => {
    alertOn.value = !alertOn.value;
    console.log(alertOn.value);
  };
  // alert 끄기
  const getAlertOn = () => alertOn.value;

  // 동네 인증 완료
  const isTownAuthorized = (userNo) => {
    axios({
      url: `${REST_API_USER}/auth/${userNo}`,
      method: 'GET',
    })
      .then((response) => {
        if (response.status === 200) {
          if (response.data == 1) {
            townAuthorized.value = true;
          } else {
            townAuthorized.value = false;
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const townAuthorize = (userNo, region) => {
    axios({
      url: `${REST_API_USER}/auth`,
      method: 'PUT',
      data: {
        userNo: userNo,
        region: region,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // 수정이 잘 되었다면 반대로 Toggle
          townAuthorized.value = !townAuthorized;
          alert('동네 인증이 완료되었습니다!');
        }
      })
      .catch((e) => {
        console.log(e);
        alert(
          '인증이 완료되지 않았습니다. 등록했던 동네와 현재 위치를 확인해주세요!'
        );
      });
  };

  // 유저 가입 파티 조회
  const getAlertMsg = (userNo) => {
    axios({
      url: `${REST_API_USER}/myparty/${userNo}`,
      method: 'GET',
    })
      .then((response) => {
        partyList.value = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return {
    partyList,
    checkId,
    checkNickname,
    login,
    logout,
    signupUser,
    dupCheckId,
    dupCheckNick,
    selectUserParties,
    alertOn,
    alertToggle,
    getAlertOn,
    isTownAuthorized,
    townAuthorized,
    townAuthorize,
  };
});
