<script>
export default {
  name: 'InfoQuestionnaire',
  props: {
    questionnaire: {
      type: Object
    }
  },
}
</script>

<template>
  <div>
    <h1>Questionnaire {{ questionnaire.name }}</h1>
    <p>{{ questionnaire.description }}</p>
    <h2>Questions</h2>
    <ul>
      <li v-for="question in questionnaire.questions" :key="question.id">
        <h3>{{ question.title }}</h3>
        <p>reponse : </p>
        <ul>
            <li>
                <p>{{ question.reponse1 }}</p>
            </li>
            <li>
                <p>{{ question.reponse2 }}</p>
            </li>
        </ul>
        <p>la numéro {{  question.bonneReponse }} est la bonne réponse</p>
        
      </li>
    </ul>
  </div>
</template>