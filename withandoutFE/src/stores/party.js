import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const usePartyStore = defineStore('party', () => {
  const REST_API_PARTY = `http://localhost:8080/party`;
  const REST_API_EVENT = `http://localhost:8080/event`;
  const router = useRouter();
  const partyList = ref({});
  const invitingMembers = ref({});
  const applicants = ref({});
  const applyEvents = ref({});
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

  // 정원이 있는 파티 조회
  const selectAvailableParty = () => {
    axios({
      url: `${REST_API_PARTY}/info/available`,
      method: 'GET',
    }).then((res) => {
      partyList.value = res.data;
    });
  };

  // 해당 파티의 전체 이벤트 조회하기
  const selectAllEvents = (events) => {
    axios({
      url: `${REST_API_PARTY}/event`,
      method: 'POST',
      data: events,
    })
      .then((res) => {
        console.log(res.data);
        applyEvents.value = res.data;
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 파티 신청자 조회
  const selectApplicatns = (userNo) => {
    axios({
      url: `${REST_API_PARTY}/apply/${userNo}`,
      method: 'GET',
    })
      .then((res) => {
        if (res.status === 200) {
          applicants.value = res.data;
          console.log(res.data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  const acceptApply =(userNo, partyNo) => {
    axios({
      url: `${REST_API_PARTY}/apply`,
      method: 'PUT',
      data: {
        userNo: userNo,
        partyNo: partyNo,
      }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("신청 수락 완료.")
        applicants.value = applicants.value.filter((applicant)=>{
          return (applicant.userNo != userNo || applicant.partyNo != partyNo)
        })
      }
    })
  }

  const declineApply =(userNo, partyNo) => {
    axios({
      url: `${REST_API_PARTY}/apply`,
      method: 'DELETE',
      data: {
        userNo: userNo,
        partyNo: partyNo,
      }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("신청 거절 완료.")
        applicants.value = applicants.value.filter((applicant) => {
          return (applicant.userNo != userNo || applicant.partyNo != partyNo)
        })
      }
    })
  }

  //  일정 생성. 시작 시간, 종료 시간, 컨텐트, 파티 넘버.
  const makeEvent =(userNo, eventNo) => {
    axios({
      url: `${REST_API_EVENT}/new`,
      method: 'POST',
      data: {
        userNo: userNo,
        eventNo: eventNo,
      }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("스무스하게 생성 완료.")
      }
    })
    .catch((e)=> {
      console.log("신청에서 에러 발견")
      console.log(e);
    })
  }

  //  일정 참여 신청.
  const applyEvent =(userNo, eventNo) => {
    axios({
      url: `${REST_API_EVENT}/join`,
      method: 'POST',
      data: {
        userNo: userNo,
        eventNo: eventNo,
      }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("스무스하게 참여 신청 완료.")
        applyEvents.value = applyEvents.value.map((event) => {
          console.log(event)
          if (event.eventNo == eventNo) {
            return {...event, eventNo: event.eventNo ,isApplied: 1, noParticipant: event.noParticipant + 1};
          }
          return event;
        })

        console.log(applyEvents.value)
        alert("스무스하게 참여 신청 완료!")
      }
    })
    .catch((e)=> {
      console.log("신청에서 에러 발견")
      console.log(e);
    })
  }

  // 이벤트 참여 취소
  const cancelEvent =(userNo, eventNo) => {
    axios({
      url: `${REST_API_EVENT}/cancel`,
      method: 'DELETE',
      data: {
        userNo: userNo,
        eventNo: eventNo,
      }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("스무스하게 참여 취소 완료")
        applyEvents.value = applyEvents.value.map((event) => {
          if (event.eventNo == eventNo) {
            return {...event, eventNo: event.eventNo, isApplied: 0, noParticipant: event.noParticipant-1};
          }
          return event;
        })

        alert("스무스하게 참여 취소 완료!")
      }
    })
    .catch((e)=> {
      console.log("취소에서 에러 발견")
      console.log(e);
    })
  }

  return {
    checkName,
    invitingMembers,
    applyEvents,
    applicants,
    partyList,
    dupPartyName,
    makeParty,
    selectMembers,
    selectAllEvents,
    selectApplicatns,
    selectAvailableParty,
    applicants, 
    acceptApply, 
    declineApply,
    makeEvent,
    applyEvent,
    cancelEvent, 
  };
});
