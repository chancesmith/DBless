<?php foreach($jobs as $job) : //foreach element in job list ?>
	<h2><?php echo $job['title']; ?></h2>
	<?php if(isset($job['location'])): ?>
		<p><?php echo $job['location']; ?></p>
	<?php endif; ?>
	<?php if(isset($job['summary'])): ?>
		<?php $numOfWordsLimit = 20; ?>
		<?php echo createExcerpt($job['summary'], $numOfWordsLimit); ?>
	<?php endif; ?>
	<p><a href="/jobs/<?php echo $job['slug']; ?>" class="btn btn-default">view this job</a></p>
	<hr/>
<?php endforeach; ?>