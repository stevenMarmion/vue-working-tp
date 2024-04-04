<script>

export default {
    data() {
      return {
        questionnaire_id : null
      }
    },
    props : {
        question :  {
          type : Object
        },
        questionnaires : {
          type : Object
        }
    },
    methods: {
        valider : function() {
            this.$emit('valide-custom', {
              question : this.question
            })
        },
        fermer : function() {
            this.$emit('close-custom', { 
              question : this.question
            })
        },
    },
    emits : ['valide-custom', 'close-custom']
}

</script>

<template>
  <div class="popup-container">
    <div class="popup-content">
      <h1>Modification de {{ question.title }}</h1>
      <div>
        <label :for="question.id">ID :</label>
        <input type="text" v-model="question.id" disabled/>
      </div>
      <div>
        <label :for="question.title">Titre :</label>
        <input type="text" v-model="question.title"/>
      </div>
      <div>
        <label :for="questionnaire_id">ID du questionnaire</label>
        <select v-model="question.questionnaire_id">
          <option v-for="(questionnaire, key) in questionnaires" :key="key" :value="questionnaire.id">
            {{ questionnaire.name }}
          </option>
        </select>
      </div>
      <div>
        <label >Nom de la reponse</label>
        <input type="text" v-model="question['reponse1']"/>
        <input type="radio" name="bonneRep" v-bind:value="1" v-model="question['bonneReponse']" v-if="question['bonneReponse']==1" checked></input>
        <input type="radio" name="bonneRep" v-bind:value="1" v-model="question['bonneReponse']" v-if="question['bonneReponse']==2"></input>
      </div>
      <div>
        <label >Nom de la reponse</label>
        <input type="text" v-model="question['reponse2']"/>
        <input type="radio" name="bonneRep" v-bind:value="2" v-model="question['bonneReponse']" v-if="question['bonneReponse']==2" checked></input>
        <input type="radio" name="bonneRep" v-bind:value="2" v-model="question['bonneReponse']" v-if="question['bonneReponse']==1"></input>
      </div>
      <div class="popup-buttons">
        <button @click="valider">Valider</button>
        <button @click="fermer">Fermer</button>
      </div>
    </div>
  </div>
</template>

<style src="../assets/popup.css"></style>
