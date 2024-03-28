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
      show_question : false,
      cache: {}
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
      this.cache['questionnaires'] = await get_all_questionnaires();
      this.turn_false_show_question();
      this.turn_true_show_questionnaire();
    },
    questions : async function() {
      this.cache['questions'] = await get_all_questions();
      this.turn_false_show_questionnaire();
      this.turn_true_show_question();
    },
    modifier_questionnaire : async function(questionnaire) {
      this.cache['questionnaires'][questionnaireId] = await update_questionnaire(
        questionnaire.questionnaireId,
        questionnaire.newName
      )
    },
    modifier_question : async function(questionId, newTitle, newQuestionnaireId) {
      this.cache['questions'][questionId] = await update_question (
        questionId, 
        newTitle, 
        newQuestionnaireId
      )
    },
    supprimer_questionnaire : async function(questionnaireId) {
      const rep = await delete_questionnaire(
        questionnaireId.id_questionnaire,
      )
      console.log(this.cache['questionnaires'])
      if (rep['valid']) {
        delete this.cache['questionnaires'][questionnaireId.id_questionnaire]
      }
    },
    supprimer_question : async function(questionId) {
      const rep = await delete_question (
        questionId.id_question, 
      )
      if (rep['valid']) {
        delete this.cache['questions'][questionId.id_question]
      }
    },
  },
  computed : {
    titleComputed() {
      return this.show_questionnaire ? 
          'Les questionnaires' : this.show_question ? 
              'Les questions' : '' 
    }
  },
  components: {Questionnaire, Question}
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
        v-for="question of cache['questions']"
        :key="question.id"
        :question="question"
        @supprimer="supprimer_question"
        @modifier_question="modifier_question">
      </Question>
    </table>
  </section>
</template>
