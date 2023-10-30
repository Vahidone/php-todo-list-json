<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-Requested-With");

$file_url = './data.json'; //creo variabile per utilizzarla dove mi serve sotto

$file_text = file_get_contents($file_url);

//converto il testo json in un array php
$todo_list = json_decode($file_text);

if (isset($_POST['newTodoText'])) {

  $newTodo = [
      'text' => $_POST['newTodoText'],
      'done' => false,
  ];

  array_push($todo_list, $newTodo);
 
  file_put_contents($file_url, json_encode($todo_list));
} else if (isset($_POST['toggleTodoIndex'])) {
  
  $todoIndex = $_POST['toggleTodoIndex'];



  if ($todo_list[$todoIndex]->done == 1) {
     
      $todo_list[$todoIndex]->done = false;
  } else {
      
      $todo_list[$todoIndex]->done = true;
  }
  ;
  file_put_contents($file_url, json_encode($todo_list));

} else if (isset($_POST['deleteTodoIndex'])) {
  

  $todoIndex = $_POST['deleteTodoIndex'];

  array_splice($todo_list, $todoIndex, 1);

  file_put_contents($file_url, json_encode($todo_list));


} else {
  
  
  header('Content-Type: application/json');
  echo json_encode($todo_list);
}
