<script>
export default {
    props: {
        questionnaires: {
            type: Object
        }
    },
    data() {
        return  {
            title: null,
            questionnaire_id: null,
            error_message : "Un des champs n'est pas remplit",
            show_error_message : false,
        }
    },
    methods: {
      valider() {
        if (this.title != null && this.title != " " && this.title != "" && this.title != undefined) {
          if (this.questionnaire_id != null && this.questionnaire_id != " " && this.questionnaire_id != "" && this.questionnaire_id != undefined) {
            this.$emit('valide-custom', { 
              title: this.title, 
              questionnaire_id: this.questionnaire_id 
            });
          } else {
            this.turn_true_show_error_message();
          }
        } else {
          this.turn_true_show_error_message();
        }
      },
      turn_true_show_error_message : function() {
        this.show_error_message = true;
      },
      turn_false_show_error_message : function() {
        this.show_error_message = false;
      },
        fermer() {
          this.turn_false_show_error_message();
          this.$emit('close-custom')
        },
    },
    emits: ['valide-custom', 'close-custom']
}
</script>

<template>
  <div class="popup-container">
    <div class="popup-content">
      <h1>Ajout d'une question</h1>
      <div>
        <label :for="title">Nom de la questions</label>
        <input type="text" v-model="title"/>
      </div>
      <div>
        <label :for="questionnaire_id">ID du questionnaire</label>
        <select v-model="questionnaire_id">
          <option v-for="(questionnaire, key) in questionnaires" :key="key" :value="questionnaire.id">
            {{ questionnaire.name }}
          </option>
        </select>
      </div>
      <p v-if="show_error_message" style="color: red;">
        {{ error_message }}
      </p>
      <div class="popup-buttons">
        <button @click="valider">Valider</button>
        <button @click="fermer">Fermer</button>
      </div>
    </div>
  </div>
</template>
