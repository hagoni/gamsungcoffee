<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
if(!defined('_VIEW3BOARD_'))exit;
######################################################################################################################################################
?>
<script type="text/javascript">
var placeSearch = '<?=$view3_search?>';
var fieldList = '<?=$view3_select?>';
</script>
<script src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=5avq6azn26&amp;submodules=geocoder"></script>
<script src="<?=$root?>/plug_in/mcustomscrollbar/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="<?=BOARD?>/<?=$view3_skin?>/js/Geomap.js?<?=$time?>"></script>

<?
include_once(BOARD_INC.'/view3_map_00/top_list.php');
?>

<div class="place_find_container">
    <div id="placeModalContainer"></div>
    <div id="placeFindWrap" class="place_find_wrap">
        <ul class="place_find_tabs">
            <li class="on"><a href="#none">직접검색</a></li>
            <li><a href="#none">지역검색</a></li>
        </ul>
        <ul class="place_find_cons">
            <li class="place_find_type1">
                <div class="place_find_head">
                    <form class="placefindbyname" onsubmit="return false;">
                        <fieldset>
                            <legend class="indent">매장 검색</legend>
                            <label for="placeName">매장명 또는 주소</label>
                            <input type="text" name="placeName" id="placeName" class="place_name">
                            <input type="submit" class="place_btn" id="btnFindSubmit">
                        </fieldset>
                    </form>
                </div>
            </li>
            <li class="place_find_type2" style="display:none">
                <div class="place_find_head">
                    <div class="col1 cols select">
                        <button type="button" id="local1Button">광역시/도</button>
                        <div id="local1ListWrap" class="local_list_wrap">
                            <ul id="local1" class="local_select">
                                <li><a href="#none">전체</a></li>
                                <li><a href="#none" data-value="서울">서울</a></li>
                                <li><a href="#none" data-value="부산">부산</a></li>
                                <li><a href="#none" data-value="대구">대구</a></li>
                                <li><a href="#none" data-value="인천">인천</a></li>
                                <li><a href="#none" data-value="광주">광주</a></li>
                                <li><a href="#none" data-value="대전">대전</a></li>
                                <li><a href="#none" data-value="울산">울산</a></li>
                                <li><a href="#none" data-value="세종">세종</a></li>
                                <li><a href="#none" data-value="경기">경기</a></li>
                                <li><a href="#none" data-value="강원">강원</a></li>
                                <li><a href="#none" data-value="충북">충북</a></li>
                                <li><a href="#none" data-value="충남">충남</a></li>
                                <li><a href="#none" data-value="전북">전북</a></li>
                                <li><a href="#none" data-value="전남">전남</a></li>
                                <li><a href="#none" data-value="경북">경북</a></li>
                                <li><a href="#none" data-value="경남">경남</a></li>
                                <li><a href="#none" data-value="제주">제주</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col2 cols select">
                        <button type="button" id="local2Button">시/군/구</button>
                        <div id="local2ListWrap" class="local_list_wrap">
                            <ul id="local2" class="local_select"></ul>
                        </div>
                    </div>
                    <div class="col3 cols select">
                        <input type="submit" class="place_btn" value="검색">
                    </div>
                </div>
            </li>
        </ul>
<?
$list_query = $main_sql.$view_order;
$result = mysql_query($list_query);
$count = mysql_num_rows($result);
?>
        <div class="place_find_body">
            <p class="place_find_number ellipsis"><strong class="b_ff_h"><?=$count?>개</strong>의 가족점이 검색되었습니다.</p>
            <div class="place_find_result">
                <ol>
<?
$list_i = mysql_num_rows($result);
while($list = mysql_fetch_assoc($result)) {
    if($list['view3_addr_road']) {
        $addr = $list['view3_addr_road']." ".$list['view3_addr_detail'];
    } else {
        $addr = $list['view3_addr_number']." ".$list['view3_addr_detail'];
    }
?>
                    <li>
                        <a href="#none" class="infowindow-opener" data-idx="<?=$list['view3_idx']?>" data-title="<?=$list['view3_title_01']?>">
                            <p class="col1"><?=$list_i?></p>
                            <dl class="col2">
                                <dt><?=$list['view3_title_01']?></dt>
                                <dd><?=$addr?></dd>
                                <dd><?=$list['view3_special_04']?></dd>
                            </dl>
                        </a>
                    </li>
<?
    $list_i--;
}
?>
                </ol>
            </div>
        </div>
    </div>
    <div id="placeLoadMap"></div>
</div>
<script>
new YMotion([
    [
        {el: '.el1_1', set: {width: "0%"}, to: {width: "100%"}, d: 0.6},
    ],
]).activate();
</script>
<?
if($_GET['idx']) {
?>
<script>
$(document).ready(function() {
    var idx = '<?=$_GET['idx']?>';
    $('.infowindow-opener[data-idx="'+ idx +'"]').trigger('click');
    TweenLite.to('html, body', 0.2, {scrollTop: $('.place_find_container').offset().top - $('#headerWrap').height()});
});
</script>
<?}?>
