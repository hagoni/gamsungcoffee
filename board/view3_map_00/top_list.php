<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
if(!defined('_VIEW3BOARD_'))exit;
######################################################################################################################################################
?>
<?
$map_op = " and view3_special_01 = 2 ";
$top_list_query = $main_sql.$map_op.$view_order;
$top_result = mysql_query($top_list_query);
$top_num = mysql_num_rows($top_result);
if ($top_num > 0) {
?>
    <!-- 신규매장 start -->
    <div class="new_store over_h rel" data-motion-offset="1">
        <div class="page_title_area">
            <div class="titles_wrap">
                <p class="page_title fs_def">
                    <img src="<?=$skin_path?>/img/new_st_ttl.jpg" alt="">
                    <span class="line line_l"><span class="el1_1"></span></span>
                </p>
            </div>
        </div>
        <div class="new_store_slide l50">
            <div class="swiper-container">
                <ul class="swiper-wrapper">
    <?
    $rand = 1;
    while($top_list = mysql_fetch_assoc($top_result)) {
        $top_img_arr = explode('||', $top_list['view3_file']);
        for($i=0; $i<count($top_img_arr); $i++) {
            if($top_img_arr[$i] == '') continue;
            $top_img = $pc.'/upload/'.$board.$top_img_arr[$i];
            break;
        }
        if(!$top_img) $top_img = $skin_path.'/img/new_st_ttl_'.$rand.'.jpg';
    ?>
                    <li class="swiper-slide">
                        <a href="#none" class="infowindow-opener" data-title="<?=$top_list['view3_title_01']?>">
                            <div class="img" style="background-image:url('<?=$top_img?>')"></div>
                            <div class="store_name fs_def t_center">
                                <span class="ellipsis"><?=$top_list['view3_title_01']?></span>
                                <!-- <img src="<?=$skin_path?>/img/new.jpg" alt="NEW"> -->
                            </div>
                        </a>
                    </li>
    <?
    unset($top_img);
    $rand++;
    if ($rand > 5) {
        $rand = 1;
    }
    }
    ?>
                </ul>
            </div>
            <button class="new_store_btns new_store_prev"><img src="<?=$skin_path?>/img/prev_btn.jpg" alt="이전"></button>
            <button class="new_store_btns new_store_next"><img src="<?=$skin_path?>/img/next_btn.jpg" alt="다음"></button>
        </div>
    </div>
    <!-- //신규매장 end -->
<?
}
?>


<script>
$(document).ready(function() {
    new Swiper('.new_store_slide .swiper-container', {
        autoplay: {delay: 3000},
        speed: 500,
        slidesPerView: 5,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.new_store_next',
            prevEl: '.new_store_prev'
        }
    });
});
</script>
