<?
$settings_sql = 'SELECT * FROM `'.TABLE_LEFT.'settings` WHERE `key`="info";';
$settings_query = mysql_query($settings_sql);
$settings_raw = mysql_fetch_assoc($settings_query);
$settings_data = unserialize($settings_raw['val']);
?>
    <!-- 헤더 start -->
    <div id="headerWrap" class="header_wrap" data-header-offset="1">
        <div class="header">
            <ul class="h_sns clearfix abs">
                <li class="fb fs_def">
                    <a href="https://www.facebook.com/gamsungcoffee/" target="_blank"></a>
                    <span><i class="hd_num hd_num1" data-number="<?=htmlentities($settings_data['info_count_facebook'], ENT_QUOTES | ENT_IGNORE, "UTF-8");?>">-</i> <em>건</em></span>
                </li>
                <li class="insta fs_def">
                    <a href="https://www.instagram.com/gamsungcoffee_official/" target="_blank"></a>
                    <span><i class="hd_num hd_num2" data-number="<?=htmlentities($settings_data['info_count_instagram'], ENT_QUOTES | ENT_IGNORE, "UTF-8");?>">-</i> <em>Follow</em></span>
                </li>
            </ul>
            <h1 class="logo l50"><a href="<?=$root?>/">감성커피</a></h1>
            <ul id="navigation" class="depth1_ul fs_def t_center">
<?
$depth1_link_query = "SELECT * FROM `".TABLE_LEFT."group` WHERE view3_use = '1' AND view3_setup = '$html_idx' ORDER BY view3_order";
$depth1_result = mysql_query($depth1_link_query);
while($depth1_list = mysql_fetch_assoc($depth1_result)) {
    $depth2_link_query = "SELECT * FROM `".TABLE_LEFT."board` WHERE view3_use = '1' AND view3_setup = '$html_idx' AND view3_group_idx = '".$depth1_list['view3_idx']."' ORDER BY view3_order";
    $depth2_result = mysql_query($depth2_link_query);
    unset($depth1_link);
    while($depth2_list = mysql_fetch_assoc($depth2_result)) {
        switch($depth2_list['view3_style']) {
            case 'html':
                if(file_exists(ROOT_INC.'/html/'.$depth2_list['view3_link'])) {
                    $depth1_link = $root.'/html/'.$depth2_list['view3_link'];
                }
                break;
            case 'board':
                $depth1_link = BOARD.'/index.php?board='.$depth2_list['view3_link'];
                break;
            case 'http':
                $depth1_link = $depth2_list['view3_link'].'" target="_blank';
                break;
            case 'url':
                $depth1_link = $depth2_list['view3_link'];
                break;
            default:
                if(file_exists(ROOT_INC.'/html/'.$depth2_list['view3_link'])) {
                    $depth1_link = $root.'/html/'.$depth2_list['view3_link'];
                }
        }
        if($depth1_link) {
            if($depth2_list['view3_sca']) {
                if(strpos($depth1_link, '?') > -1) $depth1_link .= '&amp;sca='.$depth2_list['view3_sca'];
                else $depth1_link .= '?sca='.$depth2_list['view3_sca'];
            }
            if($depth1_list['view3_order_css'] == $gnb_index) $group_list['front_link'] = $depth1_link;
            break;
        }
    }
?>
                <li class="depth1_li depth1_li<?=$depth1_list['view3_order_css']?><?if($depth1_list['view3_order_css'] == $gnb_index){echo ' on';}?>">
                    <a href="<?=$depth1_link?>" class="depth1_a"><?=strip_tags(html_entity_decode($depth1_list['view3_title_02']))?></a>
                </li>
<?
}
?>
            </ul>
            <button type="button" class="stm_open bindSitemapSpread abs open"></button>
        </div>
    </div>
    <!-- //헤더 end -->
