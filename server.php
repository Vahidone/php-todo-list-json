<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-Requested-With");

$file_url = './data.json'; //creo variabile per utilizzarla dove mi serve sotto

$file_text = file_get_contents($file_url);

//converto il testo json in un array php
$todo_list = json_decode($file_text);