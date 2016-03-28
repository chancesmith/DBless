<?php 
$fileJSON = file_get_contents("jobs.json");
$jobs = json_decode( $fileJSON, true );
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
				<a href="./#/">edit jobs</a>
			</div>
		<?php foreach($jobs as $job) { //foreach element in job list ?>
			<div class="col-md-8 col-md-offset-2">
				<h2><?php echo $job['name']; ?></h2>
				<p>Responsibilities: <?php echo $job['email']; ?></p>
				<p>Description: <?php echo $job['phone']; ?></p>
				<hr/>
			</div>
		<?php } ?>
		</div>
	</div>
</body>
</html>