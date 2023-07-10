<script>
import { toHandlers } from 'vue';

export default {

    data() {
        return {
            name: null,
            summary: null,
            startTime: null,
            endTime: null,
            reqSurvey: [],
            surveyId: 0,
            // question題目資料
            questionName: null,
            type: 0,
            options: null,
            required: false,
            questionList: [],
            // 測試
            isPopupVisible: false, // 控制交互式窗口的显示/隐藏状态
            newData: '' // 输入框中的新数据
        }
    },

    methods: {

        // 返回管理者預設頁面
        backSurveyManage() {
            this.$router.push(`/survey-outer/survey-manage`)
        },

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

        // 帶入資料庫的既有資料
        editData() {
            let url = window.location.search;
            let str = url.substring(url.indexOf("?") + 1);
            this.surveyId = parseInt(str);
            let body = {
                surveyId: this.surveyId
            }
            fetch("http://localhost:8080/search_Survey_ById", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // credentials: 'include',
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.name = data.survey.surveyName;
                    this.summary = data.survey.summary;
                    this.startTime = data.survey.startTime;
                    this.endTime = data.survey.endTime;
                })

        },


        // 帶出對應的題目列表
        getQuesData() {
            let url = window.location.search;
            let str = url.substring(url.indexOf("?") + 1);
            this.surveyId = parseInt(str);
            let body = {
                surveyId: this.surveyId
            }
            fetch("http://localhost:8080/get_All_Questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.questionName = data.questionList.questionName;
                    this.type = data.questionList.type;
                    this.options = data.questionList.options;
                    this.required = data.questionList.required;
                    this.questionList = data.questionList;
                })

        },
        // 判斷題目類型
        questionType(type) {

            if (type == 0) {
                return "文字"
            } else if (type == 1) {
                return "單選"
            } else {
                return "多選"
            }

        },

        // 儲存前跳出視窗讓使用者確認一次後再儲存
        handleSubmit() {
            let url = window.location.search;
            let str = url.substring(url.indexOf("?") + 1);
            this.surveyId = parseInt(str);
            let body = {
                surveyId: this.surveyId
            }
            // 確認使用者修改的內容
            const confirmation = `你所修改的內容為\n 問卷名稱:${this.name} \n 問卷簡要:${this.summary}\n 開始時間:${this.startTime}\n 結束時間:${this.endTime}`;

            // 使用 confirm 彈窗顯示確認訊息
            if (confirm(confirmation)) {
                // 建立更新資料的物件
                const updatedData = {
                    surveyId: this.surveyId,
                    surveyName: this.name,
                    summary: this.summary,
                    startTime: this.startTime,
                    endTime: this.endTime,
                };

                fetch("http://localhost:8080/update_survey_info", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // credentials: 'include',
                    body: JSON.stringify(updatedData)

                })
                    .then(res => res.json())
                    .then(data => {
                        // 處理後端回應的邏輯
                        console.log(data);

                        if (data.message == "success!") {
                            alert("更新成功");
                            location.reload();
                            location.href = "/survey-outer/survey-manage";
                        }
                        else {
                            alert("更新失敗");
                            location.reload();

                        }
                    })
                // .catch(error => {
                //     // 處理錯誤的邏輯
                //     console.error(error);
                // });
            }
        },


        // editquestion
        editQuesData(test) {

            this.$router.push(`/survey-outer/add-questions${{test}}`)



        }

    },

    mounted() {
        this.editData();
        this.getQuesData();

    }

}

</script>

<template>
    <div>
        <div class="center-container" >
            <div class="container py-3">
                <h2>問卷資料</h2>
                <div class="surveyName">
                    <p>問卷狀態：{{ finalStatus(startTime, endTime) }}</p>
                    <label for="surveyName">問卷名稱</label>
                    <input type="text" id="surveyName" v-model="name" :disabled="finalStatus(startTime, endTime) === '開放中'">
                </div>

                <div class="summary">
                    <label for="summary">問卷概述</label>
                    <!-- <input type="text" id="summary" v-model="summary" :disabled="finalStatus(startTime, endTime) === '開放中'"> -->
                    <textarea id="summary" v-model="summary" :disabled="finalStatus(startTime, endTime) === '開放中'"></textarea>
                </div>
                <div class="startTime">
                    <label for="startTime">開始時間</label>
                    <input type="date" id="startTime" v-model="startTime" :disabled="finalStatus(startTime, endTime) === '開放中'">
                </div>
                <div class="endTime">
                    <label for="endTime">結束時間</label>
                    <input type="date" id="endTime" v-model="endTime" :disabled="finalStatus(startTime, endTime) === '開放中'">
                </div>

                <div class="col-12" d-flex>
                    <button type="submit" class="btn" @click="backSurveyManage">取消</button>
                    <button type="submit" class="btn" @click="handleSubmit">儲存</button>
                </div>
            </div>
        </div>

        <!-- 帶入對應的問卷題目 -->
        <div class="data-list row justify-content-center">
            <div class="col-md-8">
                <table class="table table-hover">
                    <thead>
                        <!-- 狀態為開放時不得編輯與刪除 -->
                        <td v-if="finalStatus(startTime, endTime) === '尚未開始'" ><i class="fa-sharp fa-solid fa-plus" @click=""></i></td>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">題目名稱</th>
                            <th scope="col">題目類型</th>
                            <th scope="col">必填</th>
                            <th scope="col">題目選項</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="(qustionInfo, index) in questionList" :key=index>
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ qustionInfo.questionName }}</td>
                            <td>{{ questionType(qustionInfo.type) }}</td>
                            <td>{{ qustionInfo.required ? '是' : '否' }}</td>
                            <td>{{ qustionInfo.options }}</td>
                            <td>
                                <button type="submit" class="btn" @click="" v-if="finalStatus(startTime, endTime) === '尚未開始'">編輯</button>
                            </td>
             
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <RouterView />

    </div>
</template>

<style lang="scss" scoped>
.center-container {
    display: flex;
    justify-content: center;
}

.container {
    text-align: center;
}

.btn {
    background-color: #8CD9D2;
    border-radius: 10px;
    font-size: 14px;
    border: 2px solid white;
    color: black;

}
</style>