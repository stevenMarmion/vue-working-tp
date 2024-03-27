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
          newTitle : this.question.title
        })
      },
    },
    components: {QuestionUpdate},
    emits: ['supprimer', 'modifier_question']
}
</script>

<template>
  <section>
    <slot>Aucune données apparente</slot>
    <tr>
      <td> {{ question.id }} </td>
      <td> <a href="">{{ question.title }}</a></td>
      <td> <button @click="supprimer">❌</button> <button @click="open_modal">🖌️</button> </td>
    </tr>

    <QuestionUpdate v-if="show_modal"
      :question="question"
      @valide-custom="modifier_question"
      @close-custom="close">
    </QuestionUpdate>
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
