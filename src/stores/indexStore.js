import { defineStore } from "pinia";
export default defineStore("questionStore", {
    //data
    state: () => {
        return {
            questionInfo: [],
            questionName: null,
            type: 0,
            options: null,

        }

    },
    //computed
    getters: {
        getquestionsInfo: (state) => `${state.questionName}`,

    },

    //methods 唯一一個可以用this的區域
    actions: {
        addQues(questionName) {
            // this.questionName = questionName;
            // this.type = type;
            // this.options = options;
            this.temporaryQuestions.push(this.newQuestion)
            this.newQuestion = ''


        },

    }

})