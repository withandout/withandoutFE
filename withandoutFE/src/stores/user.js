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
  const userEvents = ref([]);
  const user = ref({});
  const userLog = ref({});

  // 로그인
  const login = (user) => {
    axios({
      url: `${REST_API_USER}/login`,
      method: 'POST',
      data: user,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data);
          const sessionId = JSON.stringify(res.data);
          sessionStorage.setItem('sessionId', sessionId);
          router.push('home');
        }
      })
      .catch((e) => {
        alert('로그인에 실패했습니다. 아이디와 패스워드를 확인해주세요.');
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
    })
      .then((response) => {
        // 어떤거 날려주는지 확인하고 true/false 값 바꾸기
        if (response.status === 200) {
          checkNickname.value = true;
        }
      })
      .catch((e) => {
        console.log(e);
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
            console.log('authorized: true');
            townAuthorized.value = true;
          } else {
            console.log('authroized: false');
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
          townAuthorized.value = true;
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

  // 유저 운동 기록 조회
  const getUserRunningLog = (userNo) => {
    axios({
      url: `${REST_API_USER}/log/${userNo}`,
      method: 'GET',
    })
    .then((res) => {
      if (res.status === 200) {
        userLog.value = res.data;
        console.log(res.data)
      }
    })
    .catch((e) => {
      console.log(e)
    });
  };

  // 유저 가입 파티 조회
  const getAllEvents = (userNo) => {
    axios({
      url: `${REST_API_USER}/event/${userNo}`,
      method: 'GET',
    })
      .then((response) => {
        if (response.status === 200) {
          // description: 'Take Noah to basketball practice.',
          // isComplete: false,
          // dates: { repeat: { weekdays: 5 } }, // Every Friday
          // color: 'red',

          // tempEvents.value = ;
          console.log('이벤트 잘 받아왔어요.');
          console.log(response.data);

          userEvents.value.length = 0;

          response.data.map((event) => {
            userEvents.value.push({
              eventNo: event.eventNo,
              description: event.content,
              isCompleted: event.isApplied === 0 ? false : true,
              dates: new Date(event.sttTime).getTime() - 9 * 60 * 60 * 1000,
              // 색 추가 하나 하면 좋겠다.
            });
          });
          console.log(userEvents.value);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 유저 소개글 수정
  const modifyUserContent = (userNo, content) => {
    axios({
      url: `${REST_API_USER}/info/content`,
      method: 'PUT',
      data: {
        userNo: userNo,
        content: content,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          alert('수정 성공');
        }
      })
      .catch((e) => {
        console.log(e);
        alert('수정 실패');
      });
  };

  const selectUser = (userNo) => {
    const promise = axios({
      url: `${REST_API_USER}/info/${userNo}`,
      method: 'GET',
    });
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  };

  return {
    partyList,
    checkId,
    checkNickname,
    alertOn,
    townAuthorized,
    userEvents,
    user,
    login,
    logout,
    signupUser,
    dupCheckId,
    dupCheckNick,
    selectUserParties,
    alertToggle,
    getAlertOn,
    isTownAuthorized,
    townAuthorize,
    getAllEvents,
    modifyUserContent,
    selectUser,
    getUserRunningLog,
    userLog,
  };
});
