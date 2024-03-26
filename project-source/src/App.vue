<script>
// Options API

import Questionnaire from './components/Questionnaire.vue';

export default {
  data() {
    return {
      questionnaires : [
        { id : 1, titre : 'questionnaire1', questions : [1,2,3] },
        { id : 2, titre : 'questionnaire2', questions : [4,5,6] },
      ],
      questions : [
        {  id : 1, texte : 'question1'  },
        {  id : 2, texte : 'question2'  },
        {  id : 3, texte : 'question3'  },
        {  id : 4, texte : 'question4'  },
        {  id : 5, texte : 'question5'  },
        {  id : 6, texte : 'question6'  }
      ],
    }
  },
  methods : {
    ajouter_questionnaire : function(questionnaire) {
      this.questionnaires.push(questionnaire);
    },
    supprimer_questionnaire : function(id_questionnaire) {
      delete this.questionnaire[id_questionnaire];
    },
    modifier_questionnaire : function(questionnaire) {
      console.log('on modifie avec ', questionnaire)
      this.questionnaires[questionnaire['id']-1] = questionnaire;
    },
    ajouter_question : function(question) {
      this.questions.push(question);
    },
    supprimer_question : function(id_question) {
      delete this.questions[id_question];
    },
    modifier_question : function(question) {
      this.questions[question['id']-1] = question;
    },
  },
  components: {Questionnaire}
}
</script>

<template>
  <h1>test</h1>
  <table>
    <tr>
      <th> id </th>
      <th> titre </th>
      <th> nombre question </th>
      <th> sup/modif </th>
    </tr>
    <Questionnaire 
      v-for=" questionnaire of questionnaires" 
      :questionnaire="questionnaire">
    </Questionnaire>
  </table>
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
