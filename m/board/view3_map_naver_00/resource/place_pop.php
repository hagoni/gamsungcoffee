<?php
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
define('_VIEW3BOARD_', TRUE);
include_once														"../../../../view3.php";
######################################################################################################################################################
$id = $_POST['id'];
$subject = $_POST['subject'];
$address = $_POST['address'];
$phone = $_POST['phone'];
$path_view = URL_PATH.'?'.view3_link('||idx','view&idx='.$id);
?>

<div class="place_modal">
	<p class="place_title b_ff_h"><?=$subject?><button class="infoWindowClose">×</button></p>
	<?echo "";?>
	<div class="place_cont">
		<p class="place_addr b_ff_m"><?=$address?></p>
		<a href="<?=$root?>/board/index.php?board=map_01&amp;type=view&amp;idx=<?=$id?>" class="more_btn_wrap b_ff_m">more</a>
	</div>
</div>
