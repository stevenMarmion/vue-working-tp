<script>

import QuestionUpdate from '@/components/QuestionUpdate.vue';

export default {
    name: 'QuestionRows',
    data() {
      return {
        show_modal : false,
      }
    },
    props: {
        question : {
          type : Object
        },
        questionnaires : {
          type : Object
        }
    },
    methods : {
      open_modal : function() {
        this.show_modal = true;
      },
      close : function() { 
        this.show_modal = false;
      },
      supprimer : function() {
        this.$emit('supprimer', { id_question : this.question['id'] })
      },
      modifier_question : function() {
        this.$emit('modifier_question', { 
          questionId : this.question.id,
          newTitle : this.question.title,
          newQuestionnaireId : this.question.questionnaire_id
        })
      },
    },
    components: {QuestionUpdate},
    emits: ['supprimer', 'modifier_question']
}
</script>

<template>
    <tr>
      <td> {{ question.id }} </td>
      <td> <a href="">{{ question.title }}</a></td>
      <td> <a href="">{{ question.questionnaire_id }}</a></td>
      <td> <button @click="supprimer">❌</button> <button @click="open_modal">🖌️</button> </td>
    </tr>

    <QuestionUpdate v-if="show_modal"
      :question="question"
      :questionnaires="questionnaires"
      @valide-custom="modifier_question"
      @close-custom="close">
    </QuestionUpdate>
</template>
