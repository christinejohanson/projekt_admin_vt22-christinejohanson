<?php
//Christine Johanson chjo2104  Miun Webbutveckling III - Projektuppgift 2022
?>
<?php
//aktivera sessioner
session_start();

$devmode = true;

if ($devmode) {
    // Aktivera felrapportering
    error_reporting(-1);
    ini_set("display_errors", 1);
}