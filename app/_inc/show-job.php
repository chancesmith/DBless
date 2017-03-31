<?php foreach($jobs as $job) { //foreach element in job list ?>
	<?php if (isset($_GET["job"]) && $_GET["job"] == $job['slug']) { ?>
		<?php $singleJobFound = true; ?>
		<h1><?php echo $job['title']; ?></h1>
		<p>Responsibilities: <?php echo $job['responsibilities']; ?></p>
		<p>Description: <?php echo $job['description']; ?></p>
	<?php } ?>
<?php } ?>