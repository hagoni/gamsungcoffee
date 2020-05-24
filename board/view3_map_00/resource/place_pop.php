<?php
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
define('_VIEW3BOARD_', TRUE);
include_once														"../../../view3.php";
######################################################################################################################################################
$id = $_POST['id'];
$subject = $_POST['subject'];
$address = $_POST['address'];
$phone = $_POST['phone'];
?>

<div class="place_modal">
	<p class="place_title b_ff_h"><?=$subject?><button class="infoWindowClose">×</button></p>
	<div class="place_cont">
		<p class="place_addr b_ff_m"><?=$address?></p>
		<a href="#none" class="more_btn b_ff_m" data-idx="<?=$id?>" onclick="modalO('<?=$id?>');">more</a>
	</div>
</div>