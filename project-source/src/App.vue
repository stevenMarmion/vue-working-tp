<script>
// Options API

import { get_all_questionnaires, 
         get_all_questions, 
         update_questionnaire, 
         update_question,
         delete_question,
         delete_questionnaire
} from './rest.js';

import Questionnaire from './components/Questionnaire.vue';
import Question from './components/Question.vue';

export default {
  data() {
    return {
      show_questionnaire : false,
      show_question : false
    }
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
    questionnaires : async function() {
      await get_all_questionnaires();
    },
    questions : async function() {
      await get_all_questions();
    },
    modifier_questionnaire : async function(questionnaireId, newName) {
      await update_questionnaire(
        questionnaireId,
        newName
      )
    },
    modifier_question : async function(questionId, newTitle, newQuestionnaireId) {
      await update_question (
        questionId, 
        newTitle, 
        newQuestionnaireId
      )
    },
    supprimer_questionnaire : async function(questionnaireId) {
      await delete_questionnaire(
        questionnaireId,
      )
    },
    delete_question : async function(questionId) {
      await delete_question (
        questionId, 
      )
    },
  },
  components: {Questionnaire, Question}
}
</script>

<template>
  <section>
    <h1>Bienvenue sur la visualisation des questionnaires</h1>
    <div>
      <button @click="questionnaires, turn_false_show_question, turn_true_show_questionnaire">Voir les questionnaires</button>
    </div>
    <div>
      <button @click="questions, turn_false_show_questionnaire, turn_true_show_question">Voir les questions</button>
    </div>
    <table v-if="show_questionnaire">
      <tr>
        <th> ID </th>
        <th> Titre </th>
        <th> Nombre question(s) </th>
        <th> Supp/Modif </th>
      </tr>
      <Questionnaire
        v-for="questionnaire of localStorage.questionnaires"
        :key="questionnaire.id"
        :questionnaire="questionnaire"
        @supprimer="supprimer_questionnaire"
        @modifier_questionnaire="modifier_questionnaire">
      </Questionnaire>
    </table>
    <table v-if="show_question">
      <tr>
        <th> ID </th>
        <th> Titre </th>
        <th> Supp/Modif </th>
      </tr>
      <Question
        v-for="question of localStorage.questions"
        :key="question.id"
        :question="question"
        @supprimer="supprimer_question"
        @modifier_question="modifier_question">
      </Question>
    </table>
  </section>
</template>

<style scoped>
h1 {
  text-align: center;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #4CAF50;
  color: white;
}

th,td,tr{
  border: 1px solid rgb(160 160 160);
}
</style>
