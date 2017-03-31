<?php
// turn multi-decisional array in to HTML <ul>
function ulLiArray($array){
	echo '<ul>';
	foreach($array as $key => $item) {
		if (is_array($item)) {
			echo '<li>', $key;
			ulLiArray($item);
			echo '</li>';
		} else {
			echo '<li>', $item, '</li>'; 
		}
	}
	echo '</ul>';
}

// turn multi-decisional array in to HTML Boostrap <ul>
function ulLiBootstrapArray($array){
	echo '<ul class="list-group">';
	foreach($array as $key => $item) {
		if (is_array($item)) {
			echo '<li class="list-group-item">', $key;
			ulLiBootstrapArray($item);
			echo '</li>';
		} else {
			echo '<li class="list-group-item">', $item, '</li>'; 
		}
	}
	echo '</ul>';
}

// show excerpt of content (limit text by word count)
function createExcerpt($text, $limit) {
	if (str_word_count($text, 0) > $limit) {
		$words = str_word_count($text, 2);
		$pos = array_keys($words);
		$text = substr($text, 0, $pos[$limit]) . '...';
	}
	return $text;
}