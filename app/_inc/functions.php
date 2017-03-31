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