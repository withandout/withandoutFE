<template>
  <section class="motiv">
    <p class="subSen">이번주는 5km 뛰셨네요!</p>
    <h2 class="mainSen">
      우리 조금만 <br />
      더 뛰어볼까요?
    </h2>
  </section>
</template>
<script setup></script>
<style scoped>
/* 나중에 border 수정할 것 */
.motiv {
  display: flex;
  flex-direction: column;
  width: 22rem;
  height: 21rem;
  background-image: url('../../assets/img/running.jpeg');
  background-color: rgba(255, 255, 255, 0.9);
  background-size: cover;
  background-position: 60%;

  text-align: center;
  position: relative;
  isolation: isolate;
  border-radius: 0.8rem;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 25%);
}

.subSen {
  font-size: 1.5rem;
  font-weight: 600;
  padding-top: 1rem;
}
.mainSen {
  padding-top: 0.5rem;
  line-height: 1.5;
  font-size: 1.7rem;
}

.motiv::after {
  content: '';
  position: absolute;
  background-color: white;
  z-index: -1;
  inset: 0;
  opacity: 0.6;
}
</style>
