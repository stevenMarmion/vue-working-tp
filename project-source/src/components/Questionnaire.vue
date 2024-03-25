<script>
    export default{
        props: {
            questionnaire : Object
        }
    }
</script>

<template>
  <tr>
    <td> {{ questionnaire.id }} </td>
    <td> {{ questionnaire.titre }}</td>
    <td> il y a {{ questionnaire.questions.length }} question</td>
    <td> <button>❌</button> <button>🖌️</button> </td>
  </tr>
</template>

<style scoped>
tr {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:hover {background-color: #ddd;}

td {
  text-align: center;
  padding-top: 12px;
  padding-bottom: 12px;
}

button {
  margin: 5px;
  padding: 5px 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #ddd;
}

th,td,tr{
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;

}
</style>