<script>

import QuestionnaireUpdate from '@/components/QuestionnaireUpdate.vue';

export default {
    data() {
      return {
        show_modal : false,
      }
    },
    props: {
        questionnaire : Object
    },
    created() {
      console.log(this.questionnaire)
    },
    methods : {
      supprimer : function() {
        this.$emit('supprimer', { id_questionnaire : this.questionnaire['id'] })
      },
      open_modal : function() {
        this.show_modal = true;
      },
      modifier_questionnaire : function(questionnaire) {
        console.log('on modifie avec ', questionnaire)
        this.questionnaire = questionnaire;
      },
      close : function() { 
        this.show_modal = false;
      },
      supprimer_question_questionnaire : function(id_question, id_questionnaire) {
        this.$emit('supprimer_question_questionnaire', { id_question: id_question, id_questionnaire : id_questionnaire })
      },
    },
    components: {QuestionnaireUpdate},
    emits: ['supprimer', 'supprimer_question_questionnaire']
}
</script>

<template>
  <tr>
    <td> {{ questionnaire.id }} </td>
    <td> <a href="">{{ questionnaire.titre }}</a></td>
    <td> il y a {{ questionnaire.questions.length }} question</td>
    <td> <button @click="supprimer">❌</button> <button @click="open_modal">🖌️</button> </td>
  </tr>

  <QuestionnaireUpdate v-if="show_modal"
      :questionnaire="questionnaire"
      @valide-custom="modifier_questionnaire"
      @close-custom="close"
      @supprimer-question="supprimer_question_questionnaire">
    </QuestionnaireUpdate>
</template>

<style scoped>
tr {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:hover {background-color: #ddd;}

td {
  text-align: center;
  padding-top: 12px;
  padding-bottom: 12px;
}

button {
  margin: 5px;
  padding: 5px 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #ddd;
}

th,td,tr{
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;

}
</style>