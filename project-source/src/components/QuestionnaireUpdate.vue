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
        }
    },
    emits : ['valide-custom', 'close-custom']
}

</script>

<template>
    <div class="container">
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
      </div>
      <button @click="valider">Valider</button>
      <button @click="fermer">Fermer</button>
    </div>
</template>

<style src="../assets/style.css"></style>