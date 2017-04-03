<?php foreach($jobs as $job) : //foreach element in job list ?>
	<?php if (isset($_GET["job"]) && $_GET["job"] == $job['slug']) : ?>
		<?php $singleJobFound = true; ?>
		<h1><?php echo $job['title']; ?></h1>
		<?php if(isset($job['location'])): ?>
			<p>Location: <?php echo $job['location']; ?></p>
		<?php endif; ?>
		<?php if(isset($job['summary'])): ?>
			<p>Summary: <?php echo $job['summary']; ?></p>
		<?php endif; ?>
		<?php if(isset($job['benefits'])): ?>
			<p>Benefits &amp; Requirements:</p>
			<?php echo ulLiBootstrapArray($job['benefits']); ?>	
		<?php endif; ?>
		<?php if(isset($job['description'])): ?>
			<p>Description: <?php echo $job['description']; ?></p>
		<?php endif; ?>
	<?php endif; ?>
<?php endforeach; ?>