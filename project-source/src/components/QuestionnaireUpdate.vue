<script>

export default {
    props : {
        questionnaire : Object
    },
    methods: {
        valider : function() {
            this.$emit('valide-custom', { questionnaire : this.questionnaire })
        },
        fermer : function() {
            this.$emit('close-custom', { questionnaire : this.questionnaire })
        },
        supprimer_question : function() {
            this.$emit('supprimer-question', { id_question : index, id_questionnaire : this.questionnaire['id'] })
        }
    },
    emits : ['valide-custom', 'close-custom', 'supprimer-question']
}

</script>

<template>
  <div class="popup-container">
    <div class="popup-content">
      <h1>{{ questionnaire.titre }}</h1>
      <div>
        <label :for="questionnaire.id">ID :</label>
        <input type="text" v-bind:value="questionnaire.id" disabled></input>
      </div>
      <div>
        <label :for="questionnaire.titre">Titre :</label>
        <input type="text" v-model="questionnaire.titre"></input>
      </div>
      <div v-for="(question, index) in questionnaire.questions" :key="index">
        <label :for="'question_' + index">Titre question :</label>
        <input type="text" :id="'question_' + index" v-model="questionnaire.questions[index]">
        <div class="popup-buttons">
          <button @click="supprimer_question(index)">Supprimer</button>
        </div>
      </div>
      <div class="popup-buttons">
        <button @click="valider">Valider</button>
        <button @click="fermer">Fermer</button>
      </div>
    </div>
  </div>
</template>

<style src="../assets/popup.css"></style>