<?php 
require('_inc/functions.php');
$fileJSON = file_get_contents("jobs.json");
$jobs = json_decode( $fileJSON, true );
$singleJobListing = true;
$singleJobFound = false;
$errors = array();

// show CMS view
require '_inc/jobs.view.php';