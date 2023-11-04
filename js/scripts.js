const { createApp } = Vue;

createApp({
  data() {
    return {
      titol: 'Todo List',
      apiUrl: './server.php',
      todoList: [],
      newTodoText: '',
      errorMessage: '',
      showError: true
      
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
    

      if (this.todoList[index].done == false) {
        this.showError = true;
        this.errorMessage = 'ATTENZIONE! devi barrare la voce selezionata prima di eliminarla dalla lista!';
        return;
      }else {
        this.errorMessage = '';
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
      removeError() {
        this.showError = false;
      }

   
  },

  mounted() {
  this.getTodo();
  }
}).mount('#app')
