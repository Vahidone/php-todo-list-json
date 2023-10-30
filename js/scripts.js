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

  methods: {
    getTodo() {
      axios.get(this.apiUrl).then((response) => {
        // console.log(response.data);
        this.todoList = response.data;
      });
    },



  mounted() {
  this.getTodo();
  }
}).mount('#app')