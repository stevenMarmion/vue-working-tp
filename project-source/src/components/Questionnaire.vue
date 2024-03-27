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
  <section>
    <slot>Aucune données apparente</slot>
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
  </section>
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