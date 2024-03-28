<script>

export default {
    props : {
        questionnaire :  {
          type : Object
        }
    },
    methods: {
        valider : function() {
          console.log(this.questionnaire)
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
      <h1>Modification de {{ questionnaire.name }}</h1>
      <div>
        <label :for="questionnaire.id">ID :</label>
        <input type="text" v-model="questionnaire.id" disabled/>
      </div>
      <div>
        <label :for="questionnaire.name">Titre :</label>
        <input type="text" v-model="questionnaire.name"/>
      </div>
      <div v-for="(question, index) in questionnaire.questions" :key="index">
        <label :for="'question_' + index">Titre question :</label>
        <input type="text" :id="'question_' + index" v-model="questionnaire.questions[index].title">
      </div>
      <div class="popup-buttons">
        <button @click="valider">Valider</button>
        <button @click="fermer">Fermer</button>
      </div>
    </div>
  </div>
</template>

<style src="../assets/popup.css"></style>