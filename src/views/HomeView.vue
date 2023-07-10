<script>

export default {

  data() {

  },

  methods: {

    addSurvey() {
      this.$router.push(`/survey-outer/survey-manage`)
    },
    
    writeSurvey() {
      this.$router.push(`/user-outer`)
    },
  }
}

</script>

<template>
  <div class="wrap">
    <div class="left">
      <h2>questions 動態問卷服務</h2>
      <p>輕鬆建立問卷，填寫問卷很easy!</p>
      <button type="button">Get started</button>
      <RouterView />
    </div>
    <div class="right">
      <img src="../../pic/13146663_Tiny businesswoman checking completed tasks on clipboard.jpg" alt="">
    </div>
  </div>
  <!-- 中間特色功能區 -->
  <!-- 最左邊 -->

  <div class="container d-flex justify-content-center">
    <div class="col-md-6 col-lg-3 d-flex align-items-stretch ">
      <div class="card ">
        <img src="../../pic/29243260_politics_set3.jpg" class="card-img-top card-fluid" alt="...">
        <div class="card-body">
          <h5 class="card-title">設計問卷</h5>
          <p class="card-text">輕鬆設計問卷</p>
          <button class="btn btn-info" @click="addSurvey">Add Survey</button>
        </div>
      </div>
    </div>
    <!-- 中間 -->
    <div class="col-md-6 col-lg-3 d-flex align-items-stretch ">
      <div class="card">
        <img src="../../pic/20827570_Cartoon character filling in form in survey or checklist.jpg"
          class="card-img-top card-fluid" alt="...">
        <div class="card-body">
          <h5 class="card-title">填寫問卷</h5>
          <p class="card-text">輕鬆填寫問卷</p>
          <button class="btn btn-info " @click="writeSurvey">Write Survey</button>
        </div>
      </div>
    </div>
    <!-- 右邊 -->

    <div class="col-md-6 col-lg-3 d-flex align-items-stretch ">
      <div class="card">
        <img src="../../pic/4332371_18919.jpg" class="card-img-top card-fluid" alt="...">
        <div class="card-body">
          <h5 class="card-title">分析問卷</h5>
          <p class="card-text">圖表化問卷結果</p>
          <button class="btn btn-info ">Analyze Survey</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px;
}

.btn {
  background-color: #8CD9D2;
}

.left {
  text-align: center;

  h2 {
    font-size: 30px;
  }

  p {
    font-size: 20px;
  }

  button {
    background-color: #FFBB13;
    border-radius: 10px;
    font-size: 20px;
    padding: 8px;
    border: 2px solid white;
    color: white;
  }

}

img {
  width: 800px;
  // height: 500px;
}

.card-img-top {
  // width: 90%;
  // height: 100%;
  max-width: 100%;
  height: auto;
  object-fit: cover;
}

.card {
  border-radius: 3px;
  padding: 20px;
}

.left-box {
  display: flex;

}

.section {
  display: flex;
  margin: 0 auto;
}
</style>
