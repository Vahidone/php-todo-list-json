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
        this.todoList = response.data;
      });
    },

    addTodo() {
      const todoFormData = {
        newTodoText: this.newTodoText,
      }

      axios.post(
        this.apiUrl,
        todoFormData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      ).then((response) => {
        console.log(response.data);

        this.getTodo();

        this.newTodoText = '';

      });
    },

    toggleTodo(index) {
    

    const todoFormData = {
      toggleTodoIndex: index,
    }

    axios.post(
      this.apiUrl,
      todoFormData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    ).then((response) => {
    
      this.getTodo(); 
    });
    },

    deleteTodo(index) {
    const todoFormData = {
      deleteTodoIndex: index,
    }

    axios.post(
      this.apiUrl,
      todoFormData,
      
      { headers: { 'Content-Type': 'multipart/form-data' } }
    ).then((response) => {
      

      this.getTodo(); 
    });
    }
  },

  mounted() {
  this.getTodo();
  }
}).mount('#app')