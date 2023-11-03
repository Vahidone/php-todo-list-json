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
      axios.get(this.apiUrl)
      
      .then((response) => {
        this.todoList = response.data;
      });
    },

    addTodo() {
      const data = new FormData();
      data.append('newTodoText', this.newTodoText)
    

      axios.post(
        this.apiUrl,
        data
      )
      .then((response) => {
        console.log(response.data);

        this.getTodo();

        this.newTodoText = '';

      });
    },

    toggleTodo(index) {

      const data = new FormData();
      data.append('toggleTodoIndex', index)
   

    axios.post(
      this.apiUrl,
      data
     
    )
    .then((response) => {
    
      this.getTodo(); 
    });
    },

    deleteTodo(index) {
      const data = new FormData();
      data.append('deleteTodoIndex', index)
   

    axios.post(
      this.apiUrl,
      data
      
    )
    .then((response) => {
      

      this.getTodo(); 
    });
    }
  },

  mounted() {
  this.getTodo();
  }
}).mount('#app')