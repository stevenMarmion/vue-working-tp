<script>
export default {
  name: 'InfoQuestionnaire',
  props: {
    questionnaire: {
      type: Object
    }
  },
  data() {
    return {
      liste_reponse : Array(this.questionnaire.questions.length).fill(0),
    }
  },
  methods : {
    repondre : function(liste_reponse) {
      this.$emit('repondre', { id_questionnaire : this.questionnaire['id'] , liste_reponse : liste_reponse })
    
  },
  },
emits: ['repondre']
}
</script>

<template>
  <div>
    <h1>Questionnaire {{ questionnaire.name }}</h1>
    <p>{{ questionnaire.description }}</p>
    <h2>Questions</h2>
    <ul>
      <li v-for="question in questionnaire.questions" :key="question.id">
        <h3>{{ question.title }}</h3>
        <p>reponse : </p>
        <ul>
            <li>
                <p>{{ question.reponse1 }}</p>
                <input type="radio" v-model="liste_reponse[question.id]" value="1">
            </li>
            <li>
                <p>{{ question.reponse2 }}</p>
                <input type="radio" v-model="liste_reponse[question.id]" value="2">
            </li>
        </ul>
      </li>
    </ul>
    <button @click="repondre(liste_reponse)">Valider</button>
  </div>
</template>