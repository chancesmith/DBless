<?php foreach($jobs as $job) { //foreach element in job list ?>
	<h2><?php echo $job['title']; ?></h2>
	<?php if(isset($job['location'])): ?>
		<p>Location: <?php echo $job['location']; ?></p>
	<?php endif; ?>
	<?php if(isset($job['summary'])): ?>
		<p>Summary: <?php echo $job['summary']; ?></p>
	<?php endif; ?>
	<?php if(isset($job['benefits'])): ?>
		<p>Benefits:</p>
		<?php echo ulLiBootstrapArray($job['benefits']); ?>	
	<?php endif; ?>
	<?php if(isset($job['description'])): ?>
		<p>Description: <?php echo $job['description']; ?></p>
	<?php endif; ?>
	<p><a href="/jobs/<?php echo $job['slug']; ?>" class="btn btn-default">view this job</a></p>
	<hr/>
<?php } ?>