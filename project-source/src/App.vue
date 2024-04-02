<script>
// Options API

import { get_all_questionnaires, 
         get_all_questions, 
         create_questionnaire,
         create_question,
         update_questionnaire, 
         update_question,
         delete_question,
         delete_questionnaire
} from './rest.js';

import Questionnaire from './components/Questionnaire.vue';
import Question from './components/Question.vue';
import QuestionnaireAdd from './components/QuestionnaireAdd.vue';
import QuestionAdd from './components/QuestionAdd.vue';
import InfoQuestionnaire from './components/InfoQuestionnaire.vue';

export default {
  data() {
    return {
      show_questionnaire: false,
      show_question: false,
      show_questionnaire_add: false,
      show_question_add: false,
      detail_questionnaire:null,
      cache: {
        questionnaires: new Map(),
        questions: new Map()
      }
    };
  },
  async created() {
    this.cache['questionnaires'] = await get_all_questionnaires();
    this.cache['questions'] = await get_all_questions();
  },
  methods : {
    turn_true_show_questionnaire : function() {
      this.show_questionnaire = true;
    },
    turn_false_show_questionnaire : function() {
      this.show_questionnaire = false;
    },
    turn_true_show_question : function() {
      this.show_question = true;
    },
    turn_false_show_question : function() {
      this.show_question = false;
    },
    turn_true_show_questionnaire_add : function() {
      this.show_questionnaire_add = true;
    },
    turn_false_show_questionnaire_add : function() {
      this.show_questionnaire_add = false;
    },
    turn_true_show_question_add : function() {
      this.show_question_add = true;
    },
    turn_false_show_question_add : function() {
      this.show_question_add = false;
    },
    show_detail : async function(questionnaireId) {
      questionnaireId = questionnaireId['id_questionnaire'];
      console.log(questionnaireId);
      for (let i = 0 ; i < this.cache['questionnaires'].length ; i++) {
        console.log(this.cache['questionnaires'][i].id);
          if (this.cache['questionnaires'][i].id == questionnaireId) {
            this.detail_questionnaire = this.cache['questionnaires'][i];
            console.log(this.detail_questionnaire);
          }
        }

    },
    show_add_popups : function() {
      if (this.show_questionnaire) {
        this.turn_false_show_questionnaire_add();
        this.turn_true_show_questionnaire_add();
      } else if (this.show_question) {
        this.turn_false_show_questionnaire_add();
        this.turn_true_show_question_add();
      }
    },
    questionnaires : async function() {
      this.cache['questionnaires'] = await get_all_questionnaires();
      this.turn_false_show_question();
      this.turn_true_show_questionnaire();
      this.detail_questionnaire=null;
    },
    questions : async function() {
      this.cache['questions'] = await get_all_questions();
      this.turn_false_show_questionnaire();
      this.turn_true_show_question();
      this.detail_questionnaire=null;
    },
    ajouter_questionnaire: async function(name) {
      const rep = await create_questionnaire(name);
      if (typeof rep === 'object' && rep !== null) {
        this.cache['questionnaires'].push(rep);
      }
    },
    ajouter_question: async function(title, questionaire_id,reponse1,reponse2,bonneReponse) {
      const rep = await create_question(title, questionaire_id,reponse1,reponse2,bonneReponse);
      if (typeof rep === 'object' && rep !== null) {
        this.cache['questions'].push(rep);
      }
    },
    modifier_questionnaire : async function(questionnaire) {
      const rep = await update_questionnaire(
        questionnaire.questionnaireId,
        questionnaire.newName
      );
      if (typeof rep === 'object' && rep !== null) {
        for (let i = 0 ; i < this.cache['questionnaires'].length ; i++) {
          if (this.cache['questionnaires'][i].id == questionnaire.questionnaireId.id_questionnaire) {
            this.cache['questionnaires'][i] = rep;
          }
        }
      }
      console.log(this.cache['questionnaires']);
    },
    modifier_question : async function(question) {
      const rep = await update_question(
        question.questionId,
        question.newTitle,
        question.newQuestionnaireId,
        question.reponse1,
        question.reponse2,
        question.bonneReponse,
      );
      if (typeof rep === 'object' && rep !== null) {
        for (let i = 0 ; i < this.cache['questions'].length ; i++) {
          console.log(this.cache['questions'][i]);
          if (this.cache['questions'][i].id == question.questionId) {
            this.cache['questions'][i] = rep;
          }
        }
      }
    },
    supprimer_questionnaire : async function(questionnaireId) {
      const rep = await delete_questionnaire(
        questionnaireId.id_questionnaire,
      );
      if (rep['valid']) {
        for (let i = 0 ; i < this.cache['questionnaires'].length ; i++) {
          if (this.cache['questionnaires'][i].id == questionnaireId.id_questionnaire) {
            this.cache['questionnaires'].splice(i, 1);
            break;
          }
        }
      }
    },
    supprimer_question : async function(questionId) {
      const rep = await delete_question (
        questionId.id_question,
      );
      if (rep['valid']) {
        for (let i = 0 ; i < this.cache['questions'].length ; i++) {
          if (this.cache['questions'][i].id == questionId.id_question) {
            this.cache['questions'].splice(i, 1);
            break;
          }
        }
      }
    },
  },
  computed : {
    titleComputed() {
      return this.show_questionnaire ? 
          'Les questionnaires' : this.show_question ? 
              'Les questions' : ''
    },
    buttonAddComputed() {
      return this.show_questionnaire ? 
          'Ajouter un questionnaire' : this.show_question ? 
              'Ajouter une question' : ''
    },
  },
  components: {Questionnaire, Question, QuestionnaireAdd, QuestionAdd, InfoQuestionnaire}
}
</script>

<template>
  <section>
    <h1>Bienvenue sur la visualisation des questionnaires</h1>
    <section class="flex" style="margin-bottom: 1em;">
      <div>
        <button @click="questionnaires">Voir les questionnaires</button>
      </div>
      <div style="margin-left: 1em;">
        <button @click="questions">Voir les questions</button>
      </div>
    </section>
    <h1>{{ titleComputed }}</h1>

    <div>
      <button @click="show_add_popups">
        {{ buttonAddComputed }}
      </button>
      
      <QuestionnaireAdd v-if="show_questionnaire_add"
        @valide-custom="ajouter_questionnaire"
        @close-custom="turn_false_show_questionnaire_add">
      </QuestionnaireAdd>

      <table v-if="show_questionnaire">
        <tr>
          <th> ID </th>
          <th> Titre </th>
          <th> Nombre question(s) </th>
          <th> Supp/Modif </th>
        </tr>
        <Questionnaire
          v-for="questionnaire of cache['questionnaires']"
          :key="questionnaire.id"
          :questionnaire="questionnaire"
          @supprimer="supprimer_questionnaire"
          @modifier_questionnaire="modifier_questionnaire"
          @show_detail="show_detail">
        </Questionnaire>
      </table>

      <table v-if="show_question">
        <tr>
          <th> ID </th>
          <th> Titre </th>
          <th> Questionnaire </th>
          <th> Supp/Modif </th>
        </tr>
        <Question
          v-for="question of cache['questions']"
          :key="question.id"
          :questionnaires="cache['questionnaires']"
          :question="question"
          @supprimer="supprimer_question"
          @modifier_question="modifier_question">
        </Question>

        <QuestionAdd v-if="show_question_add"
          :questionnaires="cache['questionnaires']"
          @valide-custom="ajouter_question"
          @close-custom="turn_false_show_question_add">
        </QuestionAdd>
      </table>

      <InfoQuestionnaire v-if="detail_questionnaire" :questionnaire="detail_questionnaire">

      </InfoQuestionnaire>

    </div>
  </section>
</template>
