<script>

export default {
    props : {
        question :  {
          type : Object
        }
    },
    methods: {
        valider : function() {
            this.$emit('valide-custom', { question : this.question })
        },
        fermer : function() {
            this.$emit('close-custom', { question : this.question })
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
      <div class="popup-buttons">
        <button @click="valider">Valider</button>
        <button @click="fermer">Fermer</button>
      </div>
    </div>
  </div>
</template>

<style src="../assets/popup.css"></style>
