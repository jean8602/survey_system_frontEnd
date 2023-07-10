import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import SurveyManageView from "../views/SurveyManage.vue"
import WriteSurveyView from "../views/WriteSurvey.vue"
import AddSurveyView from "../views/AddSurvey.vue"
import SurveyOuterView from "../views/SurveyOuter.vue"
import AddQuestionsView from "../views/AddQuestions.vue"
import EditSurveyView from "../views/EditSurvey.vue"
import UserOuterView from "../views/UserOuter.vue"
import FeedBackView from "../views/Feedback.vue"
import AnswerDetailView from "../views/AnswerDetail.vue"
// import FeedBackOuterView from "../views/FeedbackOuter.vue"



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/survey-outer',
      name: 'survey-outer',
      component: SurveyOuterView,
      children:[
        {
          path:'survey-manage',
          component:SurveyManageView
        },

        {
          path:'add-survey',
          component:AddSurveyView
        },

        {
          path:'add-questions',
          component:AddQuestionsView
        },

        {
          path:'edit-survey',
          component:EditSurveyView
        },
      ]

    },

    {
      path: '/write-survey',
      name: 'write-survey',
      component: WriteSurveyView
      
    },

    {
      path: '/feedback',
      name: 'feedback',
      component: FeedBackView
      
    },

    {
      path: '/answer-detail',
      name: 'answer-detail',
      component: AnswerDetailView
      
    },


    {
      path: '/user-outer',
      name: 'user-outer',
      component: UserOuterView,
      children:[
        {
          path:'survey-manage',
          component:SurveyManageView
        },
      ]

    },

    // {
    //   path: '/feedback-outer',
    //   name: 'feedback-outer',
    //   component: FeedBackOuterView,
    //   children:[
    //     {
    //       path:'feedback',
    //       component:FeedBackView
    //     },
    //   ]

    // },


  ]
})

export default router
