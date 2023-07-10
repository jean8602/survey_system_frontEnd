<script>
export default {
    data() {
        return {
            surveyInfo: [],
            status: null,
            startTime: null,
            endTime: null,
            surveyId: 0,
            surveyName: null
        }
    },
    methods: {

        getSurveydata() {
            fetch("http://localhost:8080/get_Survey_Info",
                {
                    method: "GET",
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.surveyInfo = data.surveyList;
                    this.startTime = data.surveyList.startTime;
                    this.endTime = data.surveyList.endTime;
                    this.surveyId = data.surveyList.surveyId;
                })
        },

        // 狀態欄在user與admin不一樣
        finalStatus(startTime, endTime) {
            const today = new Date().toISOString().split('T')[0];;

            if (endTime < today) {
                return "已關閉"
            } else if (startTime > today && endTime > today) {
                return "尚未開始"
            } else {
                return "開放中"
            }
        },

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

        // 搜尋
        search() {
            const searchData = {
                surveyName: this.surveyName,
                startTime: this.startTime,
                endTime: this.endTime,
            };

            console.log(searchData);
            fetch("http://localhost:8080/distinct_search_survey", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // credentials: 'include',
                body: JSON.stringify(searchData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.surveyInfo = data.res;
                    this.startTime = data.res.startTime;
                    this.endTime = data.res.endTime;
                })

        },

        // 點選＋跳到新增問卷的頁面
        addSurvey() {
            this.$router.push(`/survey-outer/add-survey`)
        },

        // 刪除問卷 (修改視窗文字)
        delSurvey(id) {
            // 如status==尚未開放的才能刪

            const confirmation = `確定要刪除問卷?`;

            // 使用 confirm 彈窗顯示確認訊息
            if (confirm(confirmation)) {
                // 冒號後面是輸入的參數，前面是表欄位名稱
                const del = {
                    surveyId: id
                };
                console.log(del);

                fetch("http://localhost:8080/del_survey_info", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(del)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
            location.href = "/survey-outer/survey-manage"
        },

        // 點選問卷題目跳到編輯問卷頁面
        editSurveyPage(test) {

            this.$router.push(`/survey-outer/edit-survey?${test}`)


        },
        // editSurveyPage(test) {
        //     const startTime = ''; // 設定 startTime 的值
        //     const endTime = ''; // 設定 endTime 的值

        //     if (this.finalStatus(startTime, endTime) !== "開放中") {
        //         this.$router.push({ path: '/survey-outer/edit-survey', query: { test } });
        //     } else {
        //         alert("問卷不得編輯");
        //     }
        // },

        // 點選問卷題目跳到填寫問卷頁面
        writeSurveyPage(test) {
            this.$router.push(`/write-survey?${test}`)
        },



    },
    mounted() {
        this.getSurveydata();
        this.finalStatus();
    },
    props: ["admin"]
}

</script>

<template>
    <!-- 搜尋欄 -->

    <div class="container d-flex justify-content-center py-3">
        <div class="card w-50">
            <div class="card-body">
                <form action="">
                    <div class="mb-3">
                        <!-- 問卷標題欄 -->
                        <label for="name">問卷名稱:</label>
                        <input type="text" id="name" v-model="surveyName">
                    </div>
                    <br>
                    <!-- 時間欄 -->
                    <div class="mb-3">
                        <label for="startTime">開始時間: </label>
                        <input type="date" id="startTime" v-model="startTime">
                        <br>
                        <label for="endTime">結束時間: </label>
                        <input type="date" id="endTime" v-model="endTime">
                    </div>
                    <a href="#" class="btn btn-primary" @click="search">搜尋</a>
                </form>

            </div>
        </div>
    </div>




    <!-- 表格欄 -->
    <div>
        <div class="data-list row justify-content-center">
            <div class="col-md-8">
                <table class="table table-hover">
                    <thead>
                        <td v-if="admin == 'admin'"><i class="fa-sharp fa-solid fa-plus" @click="addSurvey"></i></td>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">問卷名稱</th>
                            <th scope="col">狀態</th>
                            <th scope="col">開始時間</th>
                            <th scope="col">結束時間</th>
                            <th scope="col">觀看統計</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="(surveyInfo, index) in surveyInfo" :key=index>
                            <th scope="row">{{ index + 1 }}</th>
                            <td v-if="admin == 'admin'" @click="editSurveyPage(surveyInfo.surveyId)">{{
                                surveyInfo.surveyName }}</td>
                            <td v-else @click="writeSurveyPage(surveyInfo.surveyId)">{{ surveyInfo.surveyName }}</td>
                            <td v-if="admin == 'admin'">{{ finalStatus(surveyInfo.startTime, surveyInfo.endTime) }}</td>
                            <td v-else>{{ userFinalStatus(surveyInfo.startTime, surveyInfo.endTime) }}</td>
                            <td>{{ surveyInfo.startTime }}</td>
                            <td>{{ surveyInfo.endTime }}</td>
                            <td><a href="">前往</a></td>

                            <!-- 以下兩個符號如果是使用者就不能出現 -->
                            <td v-if="admin == 'admin' && finalStatus(surveyInfo.startTime, surveyInfo.endTime) !== '開放中'"><i class="fa-solid fa-trash"
                                    @click="delSurvey(surveyInfo.surveyId)"></i></td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    </div>
</template>

<style lang="scss" scoped>
i {
    cursor: pointer;
}

.btn {
    background-color: #8CD9D2;
    border-radius: 10px;
    font-size: 14px;
    border: 2px solid white;
    color: black;

}
</style>