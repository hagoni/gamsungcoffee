<?
$fb_board = 'fb_01';
$select_query = "SELECT * FROM `".TABLE_LEFT.$fb_board."` WHERE view3_use = '1' ORDER BY view3_order DESC, view3_idx DESC";
$fb_count = mysql_num_rows(mysql_query($select_query));
if($fb_count > 0) {
?>

    <ul id="sns-data-container" class="sns_list">
<?
    $list_page = 12;
    $page_per_list = 10;
    $start = ($view3_page - 1) * $list_page;
    page($fb_count, $list_page, $page_per_list, $path_next, "img", $view3_page, $end_page_path);
    $sql = $select_query." limit ".$start.", ".$list_page;
    $out_sql = mysql_query($sql);
    while($list = mysql_fetch_assoc($out_sql)) {
        $list_file_array = explode('||', $list['view3_file']);
        $list_img = $pc.'/upload/'.$fb_board.$list_file_array[0];
?>
        <li class="grid-item">
            <a href="<?=$list['view3_link']?>" target="_blank">
                <div class="img" style="background-image:url('<?=$list_img?>')"></div>
                <div class="text_area rel">
                    <p class="sns_title">페이스북</p>
                    <p class="sns_desc text"><?=html_entity_decode($list['view3_command_01'])?></p>
                    <ul class="sns_ico">
                        <li><img src="<?=$skin_path.'/img/sns_ico03.png'?>" class="w100"></li>
                    </ul>
                </div>
            </a>
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

<script src="<?=$skin_path?>/js/fb_temp.js?<?=$time?>"></script>

<?
} else {
	echo '<p class="nodata">게시물이 없습니다.</p>'.PHP_EOL;
}
?>