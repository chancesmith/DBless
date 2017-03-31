<?php 
$fileJSON = file_get_contents("jobs.json");
$jobs = json_decode( $fileJSON, true );
$jobFound = false;
?>


<!DOCTYPE html>
<head>
	<meta charset="utf-8">

	<title>Single Job Listing | DBless</title>
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
				<a href="./jobs.php" class="btn btn-default">view all jobs</a>
				<a href="./#/" class="btn btn-default">edit all jobs</a>
			</div>
		<?php if ($jobs != '' || isset($jobs)): ?>
			<?php foreach($jobs as $job) { //foreach element in job list ?>
				<?php if (isset($_GET["job"]) && $_GET["job"] == $job['slug']) { ?>
					<?php $jobFound = true; ?>
					<div class="col-md-8 col-md-offset-2">
						<h1><?php echo $job['title']; ?></h1>
						<p>Responsibilities: <?php echo $job['responsibilities']; ?></p>
						<p>Description: <?php echo $job['description']; ?></p>
					</div>
				<?php } ?>
			<?php } ?>
			<?php if (!$jobFound): ?>
				<div class="col-md-8 col-md-offset-2">
					<h2>Sorry, We can't fin the job you are looking for. <a href="./jobs.php" class="btn btn-default">Go view all jobs</a></h2>
				</div>
			<?php endif ?>
		<?php else: ?>
			<div class="col-md-8 col-md-offset-2">
				<h2>Sorry, no career opportunities are avilable at this time. Come back later to see future udpates.</h2>
			</div>
		<?php endif; ?>
		</div>
	</div>
</body>
</html>