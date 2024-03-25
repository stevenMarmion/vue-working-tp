<script>
// Options API

import QuestionnaireUpdate from './components/QuestionnaireUpdate.vue';

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
      ]
    }
  },
  methods : {
    ajouter_questionnaire : function(questionnaire) {
      this.questionnaires.push(questionnaire);
    },
    supprimer_questionnaire : function(id_questionnaire) {
      delete this.questionnaire[id_questionnaire];
    },
    ajouter_question : function(question) {
      this.questions.push(question);
    },
    supprimer_question : function(id_question) {
      delete this.questions[id_question];
    },
  },
  components: {QuestionnaireUpdate}
}
</script>

<template>
  <header>
    <h1>On modifie question</h1>
  </header>

  <main>
    <QuestionnaireUpdate v-for="ques of questionnaires" :questionnaire = "ques"></QuestionnaireUpdate>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
