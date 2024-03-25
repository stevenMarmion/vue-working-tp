<script>
// Options API

import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

export default {
  data() {
    return [
      questionnaires = [
        {  'questionnaire1' : [1,2,3]  },
        {  'questionnaire2' : [4,5,6]  }
      ],
      questions = [
        {  1 : 'question1'  },
        {  2 : 'question2'  },
        {  3 : 'question3'  },
        {  4 : 'question4'  },
        {  5 : 'question5'  },
        {  6 : 'question6'  }
      ]
    ]
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
