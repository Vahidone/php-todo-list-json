const { createApp } = Vue;

createApp({
  data() {
    return {
      title: 'Todo List',
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
      // qui verifichiamo se input è vuoto facciamo apparire il messaggio di errore
      if (this.newTodoText.trim() === '') {

        // la variabile showError serve a controllare la visualizzazione dell'area di messaggio di errore
        this.showError = true;
        this.errorMessage = 'Non puoi lasciare il campo vuoto!';
        return;
      }

      // altrimenti si prosegue con la creazione dell'oggetto data in formato FormData 
      const data = new FormData();
      data.append('newTodoText', this.newTodoText)
    

      axios.post(
        this.apiUrl,
        data
      )
      .then((response) => {
        console.log(response.data);

        // qui viene recuperato l'elenco aggiornato di attività dal server 
        this.getTodo();

        // si resetta il campo di input 
        this.newTodoText = '';

      });
    },

    toggleTodo(index) {
      // questa funzione cambia semplicemente il valore booleano della chiave "done" 
      this.todoList[index].done = !this.todoList[index].done;
    
      const data = new FormData();
      data.append('toggleTodoIndex', index);
    
      axios.post(this.apiUrl, data).then((response) => {
        this.getTodo();
      });
    },
    
    

    deleteTodo(index) {
    

      // verifichiamo se il task è stato barrato o no  
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
          // sostituire il testo modificato con il testo dello stesso index della lista 
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
  
          // si resetta editText e il valore di editingIndex torna a essere null 
          this.editingIndex = null;
          this.editText = '';
        }
      },

      // serve per avviare operazione di modifica 
      startEdit(index) {
        this.editingIndex = index;
        // serve a mostrare il testo attuale dell'attività selezionata, in modo che l'utente possa modificarlo
        this.editText = this.todoList[index].text;
      },

      // si resetta il campo di input dei testo modificato tramite il pulsante esc (in html)
      cancelEdit() {
        this.editingIndex = null;
        this.editText = '';
      }

   
  },

  mounted() {
  this.getTodo();
  }
}).mount('#app')
