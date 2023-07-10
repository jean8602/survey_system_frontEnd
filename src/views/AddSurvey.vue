<script>

export default {

    data() {
        return {
            name: null,
            summary: null,
            startTime: null,
            endTime: null,
            reqSurvey: [],
            temporarySurvey: [],
            storedName: null
        }
    },

    methods: {
        // 暫存問卷基本資料
        addBasicInfo() {

            const today = new Date().toISOString().split('T')[0];

            if (this.endTime < today || this.endTime < this.startTime) {
                alert("日期輸入有誤！");
                return;
            }

            // if (this.name === null|| this.summary === null||this.name.trim() === '' || this.summary.trim() === '' || this.startTime < today) {
            //     // 如果問卷題目為空白，不進行儲存動作
            //     alert("不得為空白！");
            //     return;
            // }


            const newData = {
                surveyName: this.name,
                summary: this.summary,
                startTime: this.startTime,
                endTime: this.endTime,
            };
            sessionStorage.setItem('surveyInfo', JSON.stringify(newData));
            this.$router.push(`/survey-outer/add-questions`);

        },

        // 點選取消會清除暫存資料與返回列表
        cancelSurvey() {

            sessionStorage.clear();
            this.name = '';
            this.summary = 'text';
            this.startTime = '';
            this.endTime = false;
            this.$router.push(`/survey-outer/survey-manage`);

        },


        // old version
        addSurveyInfo() {

            const confirmation = `新增問卷為\n 問卷名稱:${this.name} \n 問卷簡述:${this.summary}\n 開始時間: ${this.startTime}\n 結束時間:${this.endTime}`;

            if (confirm(confirmation)) {
                // 建立更新資料的物件
                const updatedData = {
                    surveyName: this.name,
                    summary: this.summary,
                    startTime: this.startTime,
                    endTime: this.endTime,
                };

                console.log(updatedData);
                fetch("http://localhost:8080/add_survey_info", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // credentials: 'include',
                    body: JSON.stringify(updatedData)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.message == "新增問卷基本資料成功") {
                            alert("更新成功");
                            location.href = "/survey-outer/survey-manage";

                        }
                        else {
                            alert("更新失敗");
                            location.reload();
                        }
                    })

            };

        },

        // 返回管理者預設頁面
        backSurveyManage() {
            this.$router.push(`/survey-outer/survey-manage`)
        },

    },

    mounted() {

        const storedSurvey = sessionStorage.getItem('surveyInfo');
        console.log(storedSurvey);

        if (storedSurvey) {
            console.log(JSON.parse(storedSurvey).surveyName);
            this.temporarySurvey = JSON.parse(storedSurvey);
            this.name = this.temporarySurvey.surveyName;
            this.summary = this.temporarySurvey.summary;
            this.startTime = this.temporarySurvey.startTime;
            this.endTime = this.temporarySurvey.endTime;
        }

    }
}



</script>

<template>
    <div>
        <div class="center-container">
            <div class="container py-3">
                <h2>新增問卷基本資料</h2>
                <div class="surveyName">
                    <label for="surveyName">問卷名稱</label>
                    <input type="text" id="surveyName" v-model="name">
                </div>

                <div class="summary">
                    <label for="summary">問卷概述</label>
                    <input type="text" id="summary" v-model="summary">

                </div>
                <div class="startTime">
                    <label for="startTime">開始時間</label>
                    <input type="date" id="startTime" v-model="startTime">
                </div>
                <div class="endTime">
                    <label for="endTime">結束時間</label>
                    <input type="date" id="endTime" v-model="endTime">
                </div>

                <div class="col-12" d-flex>
                    <button type="submit" class="btn" @click="cancelSurvey">取消</button>
                    <button type="submit" class="btn" @click="addBasicInfo">下一步</button>
                </div>
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