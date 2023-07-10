<script>
export default {
    methods:{
        // 到新增問卷頁面
        addSurveyPage (){
            this.$router.push(`/survey-outer/add-survey`)
        },
        backSurveyManage(){
            this.$router.push(`/survey-outer/survey-manage`)
        },
        addQuestionsPage (){
            this.$router.push(`/survey-outer/add-questions`)
        },
        feedBackPage(){
            this.$router.push(`/feedback`)
        }


    }
}

</script>

<template>
    <div>
        <nav class="nav flex-column bg-light">
       
            <a class="nav-link link-success active" aria-current="page" href="#" @click="backSurveyManage">
                <span>
                    問卷管理
                </span>
                Dashboard
            </a>
            <a class="nav-link link-success" href="#" @click="addSurveyPage">
                <i class="fa-sharp fa-solid fa-pen-to-square"></i>
                新增問卷基本資料</a>

                <a class="nav-link link-success" href="#" @click="addQuestionsPage">
                <i class="fa-sharp fa-solid fa-pen-to-square"></i>
                新增問卷題目</a>
            <a class="nav-link link-success" href="#" @click="feedBackPage">
                <i class="fa-solid fa-square-poll-vertical"></i>
                問卷回饋</a>
            <a class="nav-link link-success" href="#">
                <i class="fa-solid fa-chart-pie"></i>
                問卷統計</a>
        </nav>
        
    </div>
</template>

<style lang="scss" scoped>
.nav{
  /*   border:1px solid black; */
  position: fixed;
  min-width: 200px;
  min-height: 100vh;

}
</style>