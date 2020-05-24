<?php
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
define('_VIEW3BOARD_', TRUE);
include_once														"../../../view3.php";
######################################################################################################################################################
$skin_path = $_POST['skin_path'];
$view3_idx = $_POST['idx'];
$board = 'map_01';
$query_string = "SELECT * FROM `".TABLE_LEFT.$board."` WHERE 1=1 AND `view3_idx` = '$view3_idx'";
$result = mysql_query($query_string);
$list = mysql_fetch_assoc($result);
$list_file_array = explode('||', $list['view3_file']);
$list_files = array();
foreach($list_file_array as $val) {
    if($val == '') continue;
    $list_files[] = $pc.'/upload/'.$board.$val;
}
if(count($list_files) == 0) $list_files[0] = $pc.'/design/noimg/noimg.jpg';
?>

<div class="place_pop_view">
    <button type="button" class="pv-closer place_pop_close"><img src="<?=$skin_path?>/img/pop_close.png" alt=""></button>
    <p class="place_pop_name"><?=$list['view3_title_01']?></p>
    <div class="place_pop_cont clearfix">
        <div class="place_pop_imgs f_left">
            <div class="img" style="background-image:url('<?=$list_files[0]?>')"></div>
            <ul class="place_pop_thumb over_h">
                <?foreach($list_files as $key => $val) {?>
                <li<?if($key == 0){echo ' class="on"';}?>><a href="#none" style="background-image:url('<?=$val?>')" data-src="<?=$val?>"></a></li>
                <?}?>
            </ul>
        </div>
        <div class="pv-scroller place_pop_info f_left">
            <dl>
                <dt>&middot; 주소</dt>
                <dd><?=$list['view3_addr_road'].($list['view3_addr_detail'] ? ' '.$list['view3_addr_detail'] : '')?></dd>
            </dl>
            <?if($list['view3_special_04']) {?>
            <dl>
                <dt>&middot; 전화번호</dt>
                <dd><?=$list['view3_special_04']?></dd>
            </dl>
            <?}?>
            <?if($list['view3_check_01']) {?>
            <dl>
                <dt>&middot; 좌석수</dt>
                <dd><?=$list['view3_check_01']?>석</dd>
            </dl>
            <?}?>
            <?if($list['view3_special_02']) {?>
            <dl>
                <dt>&middot; 영업시간</dt>
                <dd><?=$list['view3_special_02']?></dd>
            </dl>
            <?}?>
            <dl>
                <dt>&middot; 옵션</dt>
                <dd><i class="fas fa-wifi"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-credit-card"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="<?=BOARD?>/view3_map_00/img/take_out.png" alt="테이크아웃" /></dd>
            </dl>
            <!-- <dl>
                <dt>&middot; 예약/포장</dt>
                <dd><?=$list['view3_special_05'] == 'on' ? '가능' : '불가'?>/<?=$list['view3_special_06'] == 'on' ? '가능' : '불가'?></dd>
            </dl> -->
            <!-- <dl>
                <dt>&middot; 주차여부</dt>
                <dd><?=$list['view3_special_07'] == 'on' ? '가능' : '불가'?></dd>
            </dl> -->
        </div>
    </div>
</div>
