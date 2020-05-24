<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
if(!defined('_VIEW3BOARD_'))exit;
######################################################################################################################################################
?>
<!-- <script src="//maps.googleapis.com/maps/api/js?language=ko&amp;region=kr&amp;libraries=geometry<?if($settings_data['google_api_key']){echo '&key='.$settings_data['google_api_key'];}?>"></script> -->
<script src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=5avq6azn26&amp;submodules=geocoder"></script>
<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
<script>
var param_sca = '<?=$view3_sca?>';
var param_select = '<?=$view3_select?>';
var placeSearch = '<?=$view3_search?>';
window.geo_bound_mode = true;
</script>
<?
if($view3_sca == 'all') {
?>

<link rel="stylesheet" href="<?=$pc?>/plug_in/mcustomscrollbar/jquery.mCustomScrollbar.css" />
<script src="<?=$pc?>/plug_in/mcustomscrollbar/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="<?=BOARD?>/<?=$view3_skin?>/js/Geomap.js?<?=$time?>"></script>

<!-- <div class="place_find_container">
    <div id="placeFindWrap" class="place_find_wrap">
		<div class="inner">
			<div class="cols input">
				<form class="placefindbyname" onsubmit="return false;">
					<fieldset>
						<legend class="indent">매장 검색</legend>
						<label for="placeName">매장명 또는 주소를 입력해주세요.</label>
						<input type="text" name="placeName" id="placeName" class="place_name">
						<input type="submit" id="btnFindSubmit" class="place_btn">
					</fieldset>
				</form>
			</div>
		</div>
    </div>
    <div id="placeLoadMap"></div>
</div> -->

<div class="place_find_container rel">
    <div id="placeFindWrap" class="place_find_wrap fs_def">
        <div class="cols input">
            <form method="post" class="placefindbyname">
                <fieldset>
                    <legend class="indent">매장 검색</legend>
                    <label for="placeName">지하철역, 학교명 직접 입력</label>
                    <input type="text" name="search" id="placeName" class="place_name">
                    <input type="submit" id="btnFindSubmit" class="place_btn">
                </fieldset>
            </form>
        </div>
    </div>
    <div id="placeLoadMap"></div>
</div>
<?
}
?>

<?
if($total_data > 0) {
?>


<!-- store list start -->
<div id="storeListWrap" class="store_list_wrap">
	<ul class="store_list inner fs_def">
<?
    $list_page = 10;
    $page_per_list = 5;
    $start = ($view3_page - 1) * $list_page;
    page($total_data, $list_page, $page_per_list, $path_next, "img", $view3_page, $end_page_path);
    $sql = $main_sql.$view_order." limit ".$start.", ".$list_page;
    $out_sql = mysql_query($sql);
    while($list = mysql_fetch_assoc($out_sql)) {
        $option = view3_option(array($list['view3_file'],$list['view3_file_old'],$board),$list['view3_write_day'],$list['view3_notice'],$list['view3_main'],array($list["view3_code"],$list['view3_name']),array($list['view3_open'],$list['view3_close']));
        $path_view = URL_PATH.'?'.view3_link('||idx||select||search','view&select='.$view3_select.'&search='.$view3_search.'&idx='.$list['view3_idx']);
        if($list['view3_addr_road']) {
    		$addr = $list['view3_addr_road']." ".$list['view3_addr_detail'];
    	} else {
    		$addr = $list['view3_addr_number']." ".$list['view3_addr_detail'];
    	}
        $img = explode("||",$list['view3_file']);
        if ($img[2] == "") {
            $st_img = $root."/img/page/find/01/temp_img.jpg";
        } else {
            $st_img = $request_root."/upload/".$board.$img[2];
        }

?>
		<li class="store_li">
            <a href="<?=$root?>/board/index.php?board=map_01&amp;type=view&amp;idx=<?=$list['view3_idx']?>">
                <div class="img_area" style="background-image:url('<?=$st_img?>')"></div>
                <div class="text_area t_center">
                    <div class="fs_def">
                        <p class="store_name ellipsis"><?=$list['view3_title_01']?></p>
                        <?
                        switch ($list['view3_sex']) {
                            case '1':
                                $sex = "남/녀 공용";
                                break;
                            case '2':
                                $sex = "남성 전용";
                                break;
                            case '3':
                                $sex = "여성 전용";
                                break;
                            default:
                                $sex = "남/녀 공용";
                                break;
                        }
                        ?>
                        <p class="gender"><?=$sex?></p>
                    </div>
                    <p class="store_addr ellipsis"><?=$list['view3_addr_road'].$list['view3_addr_detail']?></p>
                    <p class="rmn">잔여객실 8</p>
                </div>
            </a>
			<!-- <p class="store_name"><?if($list['view3_special_01'] == 2){?><span class="new">NEW</span><?}?><?=$list['view3_title_01']?></p>
			<p class="store_addr ellipsis"><?=$addr?></p>
			<p class="store_tel"><?=$list['view3_special_04']?></p>
			<a href="#none" class="anchor-location-pop store_info" data-idx="<?=$list['view3_idx']?>"><img src="<?=$skin_path?>/img/store_info.png" alt="information" class="w100"></a>
			<a href="#none" class="anchor-location-nav store_kmap" data-title="<?=$list['view3_title_01']?>" data-x="<?=$list['view3_addr_x']?>" data-y="<?=$list['view3_addr_y']?>"><img src="<?=$skin_path?>/img/k_map.png" alt="카카오맵" class="w100"></a> -->
		</li>
<?
    }
?>
	</ul>

    <!-- paging start -->
	<div class="paging fs_def">
		<?=$out_page?>
	</div>
	<!-- //paging end -->

</div>
<!-- //store list end -->

<?
} else {
	echo '<p class="nodata">게시물이 없습니다.</p>'.PHP_EOL;
}
?>
