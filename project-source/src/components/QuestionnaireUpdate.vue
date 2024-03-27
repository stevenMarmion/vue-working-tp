<script>

export default {
    props : {
        questionnaire :  {
          type : Object
        }
    },
    methods: {
        valider : function() {
            this.$emit('valide-custom', { questionnaire : this.questionnaire })
        },
        fermer : function() {
            this.$emit('close-custom', { questionnaire : this.questionnaire })
        },
    },
    emits : ['valide-custom', 'close-custom']
}

</script>

<template>
  <div class="popup-container">
    <div class="popup-content">
      <h1>{{ questionnaire.titre }}</h1>
      <div>
        <label :for="questionnaire.id">ID :</label>
        <input type="text" v-bind:value="questionnaire.id" disabled/>
      </div>
      <div>
        <label :for="questionnaire.titre">Titre :</label>
        <input type="text" v-bind:value="questionnaire.titre"/>
      </div>
      <div v-for="(question, index) in questionnaire.questions" :key="index">
        <label :for="'question_' + index">Titre question :</label>
        <input type="text" :id="'question_' + index" v-bind:value="questionnaire.questions[index]">
      </div>
      <div class="popup-buttons">
        <button @click="valider">Valider</button>
        <button @click="fermer">Fermer</button>
      </div>
    </div>
  </div>
</template>

<style src="../assets/popup.css"></style>