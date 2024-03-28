<script>

import QuestionnaireUpdate from '@/components/QuestionnaireUpdate.vue';

export default {
    name: 'QuestionnaireRows',
    data() {
      return {
        show_modal : false,
      }
    },
    props: {
        questionnaire : {
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
        this.$emit('supprimer', { id_questionnaire : this.questionnaire['id'] })
      },
      modifier_questionnaire : function() {
        this.$emit('modifier_questionnaire', { 
          questionnaireId : this.questionnaire.id,
          newName : this.questionnaire.name
        })
      },
    },
    components: {QuestionnaireUpdate},
    emits: ['supprimer', 'modifier_questionnaire']
}
</script>

<template>
    <tr>
      <td> {{ questionnaire.id }} </td>
      <td> <a href="">{{ questionnaire.name }}</a></td>
      <td> {{ questionnaire.questions.length }} question(s)</td>
      <td> <button @click="supprimer">❌</button> <button @click="open_modal">🖌️</button> </td>
    </tr>

    <QuestionnaireUpdate v-if="show_modal"
      :questionnaire="questionnaire"
      @valide-custom="modifier_questionnaire"
      @close-custom="close">
    </QuestionnaireUpdate>
</template>