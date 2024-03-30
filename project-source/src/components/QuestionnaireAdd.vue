<script>

export default {
    data() {
        return  {
            name: null,
            error_message : "Un des champs n'est pas remplit",
            show_error_message : false,
        }
    },
    methods: {
      turn_true_show_error_message : function() {
        this.show_error_message = true;
      },
      turn_false_show_error_message : function() {
        this.show_error_message = false;
      },
      valider : function() {
        console.log(this.name)
        if (this.name != null && this.name != " " && this.name != "" && this.name != undefined) {
          this.$emit('valide-custom', { name : this.name });
        } else {
          this.turn_true_show_error_message();
        }
      },
      fermer : function() {
        this.turn_false_show_error_message();
        this.$emit('close-custom')
      },
    },
    emits : ['valide-custom', 'close-custom']
}

</script>

<template>
  <div class="popup-container">
    <div class="popup-content">
      <h1>Ajout d'un questionnaire</h1>
      <div>
        <label :for="name">Ttire du questionnaire</label>
        <input type="text" v-model="name"/>
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