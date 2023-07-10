<script>
import FunctionSelectView from "../components/FunctionSelect.vue"


export default {
    components: {
        FunctionSelectView,

    },

    data() {

        return {

            userAnswerInfo:[],
            userName:null,
            createTime:null


        }


    },
    methods: {


        // 點選問卷題目跳到編輯問卷頁面
        answerDetailPage(test){
            this.$router.push(`/answer-detail?${test}`)
        },

        getAnswerList(){
            fetch("http://localhost:8080/get_FeedbackList",
                {
                    method: "GET",
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.userAnswerInfo = data.userAnswerList;
                    this.userName = data.userAnswerList.userName;
                    this.createTime = data.userAnswerList.createTime;
                
                })
        }
        

    },
    mounted() {

        this.getAnswerList();
    }
}


</script>

<template>
    <FunctionSelectView />
    <div>
        <div class="data-list row justify-content-center">
            <div class="col-md-8">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">姓名</th>
                            <th scope="col">填寫時間</th>
                            <th scope="col">觀看細節</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="(userInfo, index) in userAnswerInfo" :key=index>
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ userInfo.userName }}</td>
                            <td>{{ userInfo.createTime }}</td>
                            <td><a href="">前往</a></td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>

