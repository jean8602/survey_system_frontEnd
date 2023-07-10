<script>
import { RouterView } from 'vue-router';

export default {
    data() {

        return {
            name: null,
            summary: null,
            startTime: null,
            endTime: null,
            surveyId: null,
            searchAllList: [],
            temporarySurvey: {
                userName: null,
                phone: null,
                email: null,
                age: null,
                answers: []
            },
            test: [],
            // question: {
            //     selectedOptions: []
            // },
            // temporaryAnswer: {},

            isSubmitted: false,
            isEditing: false
        }


    },

    methods: {

        // checkage
        checkAge() {
            if (this.temporarySurvey.age < 0) {
                this.temporarySurvey.age = null
            }

        },

        backUserPage() {
            this.$router.push(`/user-outer`);
            sessionStorage.removeItem('writedata');

        },

        getSurveyInfo() {

            let url = window.location.search;
            let str = url.substring(url.indexOf("?") + 1);
            this.surveyId = parseInt(str);
            let body = {
                surveyId: this.surveyId
            }
            fetch("http://localhost:8080/get_All_Info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.name = data.searchAllList[0].surveyName;
                    this.summary = data.searchAllList[0].summary;
                    this.startTime = data.searchAllList[0].startTime;
                    this.endTime = data.searchAllList[0].endTime;
                    this.searchAllList = data.searchAllList;
                })

        },
        // user狀態
        userFinalStatus(startTime, endTime) {
            const today = new Date().toISOString().split('T')[0];;
            if (endTime < today) {
                return "已完結"
            } else if (startTime > today && endTime > today) {
                return "尚未開始"
            } else {
                return "投票中"
            }
        },

        // 送出暫存使用者資料
        getStorageInfo() {
            if ((this.temporarySurvey.userName === null || this.temporarySurvey.userName.trim() === '') || (this.temporarySurvey.phone === null || this.temporarySurvey.phone.trim() === '') || (this.temporarySurvey.email === null || this.temporarySurvey.email.trim() === '')) {
                // 如果基本資料為空白，不進行儲存動作
                alert("不得為空白");
                return;
            }

            if (this.temporarySurvey.age < 0) {
                alert("年齡不得為負數");
                return;
            }


            // 清空 temporarySurvey.answers
            this.temporarySurvey.answers = [];

            const storedSurvey = {
                userInfo: {
                    userName: this.temporarySurvey.userName,
                    phone: this.temporarySurvey.phone,
                    email: this.temporarySurvey.email,
                    age: this.temporarySurvey.age
                },
                answers: []
            };

            this.searchAllList.forEach(question => {
                const answer = {
                    questionId: question.questionId,
                    option: ""
                };

                if (question.type === 1) {
                    answer.option = question.selectedOption;
                } else if (question.type === 2) {
                    answer.option = this.test;
                }

                storedSurvey.answers.push(answer);
            });

            sessionStorage.setItem("writedata", JSON.stringify(storedSurvey));
            this.isSubmitted = true;
        },
        saveAnswerdata() {

            const storedData = sessionStorage.getItem('writedata');
            const data = JSON.parse(storedData);

            const userInfo = data.userInfo;
            const answers = data.answers;

            answers.forEach(answer => {
                const questionId = parseInt(answer.questionId);
                const option = answer.option;
                let optionString = "";

                if (Array.isArray(option)) {
                    optionString = option.join(';');
                } else {
                    optionString = option;
                }

                console.log(option);
                console.log(optionString);
                console.log(questionId);

                const surveyData = {
                    userName: userInfo.userName,
                    phone: userInfo.phone,
                    email: userInfo.email,
                    age: parseInt(userInfo.age),
                    questionId: parseInt(answer.questionId),
                    answer: optionString,
                }
                fetch("http://localhost:8080/add_AnswerInfo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(surveyData)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        sessionStorage.removeItem('writedata');
                        location.href = "/user-outer"

                    });

            });


        },



    },
    mounted() {
        this.getSurveyInfo();

        const storedSurvey = sessionStorage.getItem('writedata');
        if (storedSurvey) {
            this.temporarySurvey = JSON.parse(storedSurvey);
        }
        console.log(this.temporarySurvey);

    }

}

</script>

<template>
    <div class="card text-center">
        <div class="card-header">
            <a href="#" class="btn btn-primary" @click="backUserPage">返回</a>
            問卷 #{{ surveyId }}
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ name }}</h5>
            <p class="card-text">投票時間:{{ startTime }}~{{ endTime }}</p>
            <h5>問卷說明:{{ summary }}</h5>
            <div>
                <h5>基本資料</h5>
                <div class="userInfo1">
                    <label for="userName">姓名</label>
                    <input type="text" id="userName" v-model="temporarySurvey.userName"
                        :disabled="isSubmitted && !isEditing">
                </div>
                <div class="userInfo2">
                    <label for="phone">手機</label>
                    <input type="text" id="phone" v-model="temporarySurvey.phone" :disabled="isSubmitted && !isEditing">
                </div>
                <div class="userInfo3">
                    <label for="email">email</label>
                    <input type="email" id="email" v-model="temporarySurvey.email" :disabled="isSubmitted && !isEditing">
                </div>
                <div class="userInfo4">
                    <label for="age">年齡</label>
                    <input type="number" id="age" min="1" v-model="temporarySurvey.age"
                        :disabled="isSubmitted && !isEditing" @blur="checkAge">
                </div>
            </div>

            <!--    題目區 -->
            <div class="ques">

                <div v-for="(question, index) in searchAllList" :key="question.questionId">
                    <h5>{{ index + 1 }}. {{ question.questionName }}</h5>

                    <div v-if="question.type === 1">
                        <!-- 處理單選時 -->
                        <div v-for="option in question.options.split(';')" :key="option">
                            <input type="radio" :id="option" :value="option" v-model="question.selectedOption"
                                :disabled="isSubmitted && !isEditing">
                            <label :for="option">{{ option }}</label>
                        </div>
                    </div>
                    <!-- 處理多選時 -->

                    <div v-if="question.type === 2" v-for="(option, optionIndex) in question.options.split(';')"
                        :key="option">
                        <input type="checkbox" :id="optionIndex" :value="option" v-model="test"
                            :disabled="isSubmitted && !isEditing">
                        <label :for="optionIndex">{{ option }}</label>
                    </div>
                </div>
            </div>


        </div>
        <div class="card-footer text-muted" v-if="!isSubmitted">
            <a href="#" class="btn btn-primary" @click="getStorageInfo">送出</a>
        </div>
        <div class="card-footer text-muted" v-if="isSubmitted">
            <a href="#" class="btn btn-primary" @click="isEditing = true">編輯</a>
            <a href="#" class="btn btn-primary" @click="saveAnswerdata">儲存</a>
        </div>

    </div>

    <RouterView />
</template>

<style lang="scss" scoped>
.btn {
    background-color: #8CD9D2;
    border-radius: 10px;
    font-size: 14px;
    border: 2px solid white;
    color: black;

}
</style>