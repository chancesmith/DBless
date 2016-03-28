<?php

$jsonString = file_get_contents('jobs.json');
$data = json_decode($jsonString, true);

if(isset($_POST['myData'])){
	$data = $_POST['myData'];

	// $obj = json_decode($_POST['myData']);
	// 
	// Need to do anything with the data? 
	// Goes here between the decode and encode. 
	// Otherwise, skip it.
	// 
	// $newJsonString = json_encode($data);

	file_put_contents('jobs.json', $data);
	echo "yup! - php";
} else {
	echo "nope - php";
}
