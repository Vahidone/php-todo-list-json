const { createApp } = Vue;

createApp({
  data() {
    return {
      titol: 'Todo List',
      apiUrl: './server.php',
      todoList: [],
      newTodoText: '',
      errorMessage: '',
      showError: true,
      editingIndex: null,
      editText: ''
      
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
      this.todoList[index].done = !this.todoList[index].done;
    
      const data = new FormData();
      data.append('toggleTodoIndex', index);
    
      axios.post(this.apiUrl, data).then((response) => {
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
      },

      editTodo() {
        if (this.editingIndex !== null) {
          const editedTodo = this.todoList[this.editingIndex];
          editedTodo.text = this.editText;
  
          const data = new FormData();
          data.append('editTodoIndex', this.editingIndex);
          data.append('editedText', this.editText);
  
          axios.post(
            this.apiUrl,
            data
          ).then((response) => {
            this.getTodo();
          });
  
          // Reset the editing index and editText
          this.editingIndex = null;
          this.editText = '';
        }
      },
      startEdit(index) {
        this.editingIndex = index;
        this.editText = this.todoList[index].text;
      },
      cancelEdit() {
        this.editingIndex = null;
        this.editText = '';
      }

   
  },

  mounted() {
  this.getTodo();
  }
}).mount('#app')
