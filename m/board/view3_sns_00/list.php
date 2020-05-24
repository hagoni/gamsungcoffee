<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
if(!defined('_VIEW3BOARD_'))exit;
######################################################################################################################################################
?>

<!-- board wrapper start -->
<div id="boardWrap">
<?
if($view3_sca == 'news') {
?>
	<ul class="tabmenu media_tab fs_def">
		<li<?if($view3_tab == '' || $view3_tab == 1){echo ' class="on"';}?>><a href="<?=URL_PATH.'?'.get("page||type||tab||idx","tab=1");?>">보도자료</a></li>
		<li<?if($view3_tab == 2){echo ' class="on"';}?>><a href="<?=URL_PATH.'?'.get("page||type||tab||idx","tab=2");?>">방영</a></li>
	</ul>

	<div class="tabcons">
<?
	if($view3_tab == '' || $view3_tab == 1) {
		include_once('inc/naver.php');
	} else if($view3_tab == 2) {
		include_once('inc/video.php');
	}
?>
	</div>
<?
######################################################################################################################################################
} else {
	$skinPath = BOARD.'/'.$view3_skin;
	$linkbar_show = false;
	$fbPageId = ''; //페이스북
	// $hashTag = '감성커피☕️'; //인스타그램
	$hashTag = '감성커피'; //인스타그램
	$ignoreCaption = '만원||수익||쇼핑몰||모델||헬스||부업||판다||본업||로지||유기네||주점||마사지||룸싸롱||매출누락||더체크'; //인스타그램 특정 내용포함시 제외 (구분 : ||)
	if($fbPageId != '' || $hashTag != '') {
?>
	<ul id="snsTabmenu" class="tabmenu fs_def">
		<li<?if($view3_tab == '' || $view3_tab == 1){echo ' class="on"';}?>><a href="<?=URL_PATH.'?'.get("page||type||tab||idx","tab=1");?>">블로그</a></li>
<?
		if($fbPageId != '') {
?>
		<li<?if($view3_tab == 2){echo ' class="on"';}?>><a href="<?=URL_PATH.'?'.get("page||type||tab||idx","tab=2");?>">페이스북</a></li>
<?
		}
		if($hashTag != '') {
?>
		<li<?if($view3_tab == 3){echo ' class="on"';}?>><a href="<?=URL_PATH.'?'.get("page||type||tab||idx","tab=3");?>">인스타그램</a></li>
<?
		}
?>
	</ul>
<?
	}
?>

	<ul id="snsTabcons" class="tabcons">
		<li<?if($view3_tab == '' || $view3_tab == 1){echo ' style="display:block"';}?>>
<?
include_once('inc/naver.php');
?>
		</li>
<?
		if($fbPageId != '') {
?>
		<li<?if($view3_tab == 2){echo ' style="display:block"';}?>>
<?
include_once('inc/facebook.php');
?>
		</li>
<?
		}
		if($hashTag != '') {
?>
		<li<?if($view3_tab == 3){echo ' style="display:block"';}?>>
<?
include_once('inc/instagram.php');
?>
		</li>
<?
		}
?>
	</ul>

<script type="text/javascript">
(function($) {
	doc.ready(function() {
		new Tabbing($('#snsTabmenu'), $('#snsTabcons'));
	});
}(jQuery));
</script>
<?
}
?>

</div>
<!-- //board wrapper end -->
