<script>
export default {
    data() {
        return {
            // newQuestion: '',
            // newQuestionType: 'text',
            // newOptions: null,
            // isRequired: false,
            // 新增一個編輯索引的數據屬性
            editIndex: null,
            temporaryQuestions:[],
           
        }
    },
    methods: {

        addQuestion() {
            if ((this.temporaryQuestions.questionName === null || this.temporaryQuestions.questionName.trim() === '') || (this.temporaryQuestions.options === null || this.temporaryQuestions.options.trim() === '')) {
                // 如果問卷題目為空白，不進行儲存動作
                alert("不得為空白");
                return;
            }

            const question = {
                questionName: this.temporaryQuestions.questionName,
                type: this.temporaryQuestions.type,
                options: this.temporaryQuestions.options,
                isRequired: this.temporaryQuestions.isRequired
            }
            this.temporaryQuestions.push(question);
            this.temporaryQuestions.questionName = '';
            this.temporaryQuestions.type = 0;
            this.temporaryQuestions.options = "";
            this.temporaryQuestions.isRequired = false;

        },


        // new
        editQuestion(index) {
            const question = this.temporaryQuestions[index];
            this.temporaryQuestions.questionName = question.questionName;
            this.temporaryQuestions.type = question.type;
            this.temporaryQuestions.options = question.options;
            this.temporaryQuestions.isRequired = question.isRequired;
            this.editIndex = index;  // 設定編輯索引的值
        },

        saveEditedQuestion() {
            if (this.editIndex !== null) {
                const question = {
                    questionName: this.temporaryQuestions.questionName,
                    type: this.temporaryQuestions.type,
                    options: this.temporaryQuestions.options,
                    isRequired: this.temporaryQuestions.isRequired
                };
                this.temporaryQuestions.splice(this.editIndex, 1, question);
                sessionStorage.setItem('questiondata', JSON.stringify(this.temporaryQuestions));
                this.temporaryQuestions.questionName = '';
                this.temporaryQuestions.type = 0;
                this.temporaryQuestions.options = "";
                this.temporaryQuestions.isRequired = false;
                this.editIndex = null;  // 清空編輯索引的值
            }
        },

        deleteQuestion(index) {
            this.temporaryQuestions.splice(index, 1); // 從 temporaryQuestions 陣列中刪除特定索引位置的問題
            sessionStorage.setItem('questions', JSON.stringify(this.temporaryQuestions)); // 將更新後的 temporaryQuestions 重新存回 sessionStorage
        },

        backAddSurvey() {
            this.$router.push(`/survey-outer/add-survey`)
        },

        // 儲存問卷基本資料與問卷題目 先fetch基本資料
        saveAlldata() {

            const storedSurvey = sessionStorage.getItem('surveyInfo');
            const surveyInfo = JSON.parse(storedSurvey);

            // 新增問卷基本資料
            const surveyData = {
                surveyName: surveyInfo.surveyName,
                summary: surveyInfo.summary,
                startTime: surveyInfo.startTime,
                endTime: surveyInfo.endTime
            };

            fetch("http://localhost:8080/add_survey_info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(surveyData)
            })
                .then(res => res.json())
                .then(data => {
                    const surveyId = data.surveyId;
                    console.log(data);

                    const storedQuestions = sessionStorage.getItem('questiondata');
                    const questions = JSON.parse(storedQuestions);
                    const filteredQuestions = questions.filter(question => question.questionName !== null);
                    const questionPromises = filteredQuestions.map(question => {
                        const questionData = {
                            surveyId: surveyId,
                            questionName: question.questionName,
                            options: question.options,
                            type: parseInt(question.type),
                            isRequired: Boolean(question.isRequired)
                        };
                        console.log(questionData);


                        return fetch("http://localhost:8080/addQuestions", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(questionData)
                        })
                            .then(res => res.json());
                    });

                    Promise.all(questionPromises)
                        .then(results => {
                            console.log(results);
                            sessionStorage.removeItem('surveyInfo');
                            sessionStorage.removeItem('questiondata');
                            location.href = "/survey-outer/survey-manage"
                        });
                });

        },

        // test() {
        //     console.log(this.questionList);
        // }




    },
    mounted() {

        const storedQuestions = sessionStorage.getItem('questiondata');
        if (storedQuestions) {
            this.temporaryQuestions = JSON.parse(storedQuestions);
            this.temporaryQuestions = this.temporaryQuestions.filter(item => {
                return (item.questionName !== null)
            })
        }
        console.log(this.temporaryQuestions);

    },
    watch: {
        temporaryQuestions: {
            handler() {
                const temp = JSON.stringify(this.temporaryQuestions);
                sessionStorage.setItem("questiondata", temp);

            },
            deep: true,
        },
    }
}


</script>

<template>
    <div>
        <div class="center-container">
            <div class="container py-3 d-grid justify-content-center align-items-center">
                <h2>新增問卷題目</h2>
                <div class="all d-flex justify-ceontent-center align-items-center">
                    <div class="quesName">
                        <label for="quesName">問題</label>
                        <input type="text" id="quesName" v-model="temporaryQuestions.questionName">
                    </div>

                    <!--  下拉式選單 -->

                    <div class="options">
                        <label class="label-container" for="typeSelect">題目類型</label>
                        <select class="typeSelect" v-model="temporaryQuestions.type">
                            <option value="0">問答</option>
                            <option value="1">單選</option>
                            <option value="2">多選</option>
                        </select>
                    </div>

                    <!-- checkbox 必填 -->
                    <div class="checkbox">
                        <input type="checkbox" name="isRequired" value="isRequired" v-model="temporaryQuestions.isRequired">
                        必填
                    </div>


                </div>

                <!-- 選項 -->
                <div class="options">
                    <label for="options">選項</label>
                    <input type="text" id="options" v-model="temporaryQuestions.options">
                    <p>（多個答案以;分隔）</p>

                </div>


                <div class="col-12" d-flex>
                    <button type="submit" class="btn" @click="addQuestion">加入</button>
                    <button type="submit" class="btn" @click="saveEditedQuestion">儲存</button>
                    <!-- <button type="submit" class="btn" @click="test">test</button> -->
                </div>
            </div>

        </div>
        <!-- 題目預覽表 -->
        <div class="data-list row justify-content-center">
            <div class="col-md-8">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">問題</th>
                            <th scope="col">種類</th>
                            <th scope="col">必填</th>
                            <th scope="col">選項</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(question, index) in temporaryQuestions" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ question.questionName }}</td>
                            <td>{{ question.type }}</td>
                            <td>{{ question.isRequired ? '是' : '否' }}</td>
                            <td>{{ question.options }}</td>
                            <td>
                                <button type="button" class="btn" @click="editQuestion(index)">編輯</button>
                                <button type="button" class="btn" @click="deleteQuestion(index)">刪除</button>
                            </td>

                        </tr>
                    </tbody>
                </table>

                <div class="col-12 d-flex justify-content-center">
                    <button type="button" class="btn" @click="backAddSurvey">取消</button>
                    <button type="button" class="btn" @click="saveAlldata">送出</button>
                </div>
            </div>
        </div>
        <RouterView />

    </div>
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