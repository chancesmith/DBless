<?php foreach($jobs as $job) { //foreach element in job list ?>
	<h2><?php echo $job['title']; ?></h2>
	<p>Responsibilities: <?php echo $job['responsibilities']; ?></p>
	<p>Description: <?php echo $job['description']; ?></p>
	<p><a href="/jobs/<?php echo $job['slug']; ?>" class="btn btn-default">view this job</a></p>
	<hr/>
<?php } ?>