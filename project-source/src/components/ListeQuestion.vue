<script>
    export default{
        props: {
            questions : Object
        }
    }
</script>

<template>
    <h1>test</h1>
    <table>
      <tr>
        <th> id </th>
        <th> texte" </th>
        <th> sup/modif </th>
      </tr>
      <Question v-for=" question of questions" :question="question"></Question>
    </table>
  </template>
  
  <style scoped>
  h1 {
    text-align: center;
    color: #333;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  table, th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  tr:hover {
    background-color: #ddd;
  }
  
  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #4CAF50;
    color: white;
  }
  
  th,td,tr{
    border: 1px solid rgb(160 160 160);
  }
  </style>