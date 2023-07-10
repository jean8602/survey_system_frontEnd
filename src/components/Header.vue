<script>
import { RouterLink } from 'vue-router';
export default {
    methods: {

    },
}
</script>

<template>
    <header>
        <div class="wrapper">
            <div class="logo-group">
                <div class="logo">
                    <RouterLink class="link" to="/">
                        <img src="../../pic/questions-1.jpg" alt="">
                    </RouterLink>
                </div>
                <div class="function-group">
                    <!-- 回首頁 -->
                    <div class="home">
                        <RouterLink class="link"  to="/">
                            Home</RouterLink>
                    </div>
                    <!-- 問卷管理 -->
                    <div class="survey-mange">
                        <RouterLink class="link" to="/survey-outer/survey-manage">
                            Admin</RouterLink>

                        <!-- <RouterLink class="link"  to="/addSurvey">
                        新增問卷</RouterLink>
                        下拉式選單：AddSurvey, Question, feedBack  -->
                    </div>
                    <!-- 問卷填寫 -->
                    <div class="write-survey">
                        <RouterLink class="link" to="/user-outer">
                            User</RouterLink>
                    </div>
                </div>
            </div>

        </div>
    </header>
</template>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    

}

.logo-group {
    width: 100vw;
    height: 120px;
    background-color: #8CD9D2;
    display: flex;

    .logo {
        width: 180px;
        height: 120px;


        img {
            width: 100%;
            height: 100%;
        }


    }

    .function-group {
        display: flex;
        color: white;
        align-items: center;


    }


}

.link {
    text-decoration: none;
    color: #fff;
    cursor: pointer;
    transition: 0.3s;
    margin: 0 1rem;
    font-size: 23px;


    &:hover {
        color: black;
        font-weight: bold;
    }
}
</style>