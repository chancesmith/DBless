<?php 
require('_inc/functions.php');
$fileJSON = file_get_contents("jobs.json");
$jobs = json_decode( $fileJSON, true );
$singleJobListing = true;
$singleJobFound = false;
$errors = array();
?>

<!DOCTYPE html>
<head>
	<meta charset="utf-8">

	<title>Show Jobs | DBless</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- fonts -->
	<link href='https://fonts.googleapis.com/css?family=Passion+One:400,700,900|Oswald:400,700,300' rel='stylesheet' type='text/css'>

	<!-- styles -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" />
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.0/css/font-awesome.css" />
	<link rel="stylesheet" href="css/main.css" />
	<link rel="stylesheet" href="css/animate.css" />
	
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-8 col-md-offset-2">
				<h1>List of Available Jobs:</h1>
				<a href="../#/" class="btn btn-default">Edit jobs</a>
				<a href="../jobs/" class="btn btn-default">Go view all jobs</a>
			</div>
			
			<div class="col-md-8 col-md-offset-2">
				<?php // if jobs collection not found, show error ?>
				<?php if (!isset($jobs) || $jobs == ""): ?>
					<?php array_push($errors, "no jobs found"); ?>
					<h2>Sorry, no career opportunities are avilable at this time. Come back later to see future udpates.</h2>
				<?php endif; ?>

				<?php // if single job not requested ?>
				<?php if (!isset($_GET["job"]) || $_GET["job"] == "" || $_GET["job"] == null): ?>
					<?php $singleJobListing = false; ?>
				<?php endif; ?>

				<?php // if no errors, show single job ?>
				<?php if (!count($errors) && $singleJobListing == true): ?>
					<?php include './_inc/show-job.php'; ?>
				<?php endif; ?>

				<?php // if single job not found, show 404 like error ?>
				<?php if (!$singleJobFound && $singleJobListing == true): ?>
					<?php array_push($errors, "single post not found"); ?>
					<h2>Sorry, we couldn't find this job, <br/>"<?php echo $_GET['job']; ?>"</h2>
					<p><a href="/jobs/" class="btn btn-default">Go view all jobs</a></p>
				<?php endif ?>

				<?php // if no errors, and not a single job listing, show all jobs ?>
				<?php if (count($errors) == 0 && $singleJobListing == false): ?>
					<?php include './_inc/show-all-jobs.php'; ?>
				<?php endif; ?>

				<?php // if errors found, show errors ?>
				<?php if (count($errors)): ?>
					<?php //print_r($errors); ?>
				<?php endif; ?>
			</div>
		</div>
	</div>
</body>
</html>