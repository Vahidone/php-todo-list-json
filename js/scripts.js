const { createApp } = Vue;

createApp({
  data() {
    return {
      titol: 'Todo List',
      apiUrl: './server.php',
      todoList: [],
      newTodoText: ''
    }
  },


}).mount('#app')