<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
if(!defined('_VIEW3BOARD_'))exit;
######################################################################################################################################################
$sql = $main_sql.$view_order;
$res = mysql_query($sql);
$lst = mysql_fetch_assoc($res);
$sub_sql = "select * from ".TABLE_LEFT."branch_map_01 where view3_use = 1 and view3_map_idx = {$lst['view3_idx']} order by view3_title_01 desc";
$sub_res = mysql_query($sub_sql);
$sub_num = mysql_num_rows($sub_res);
$mem_sql = "select * from ".TABLE_LEFT."member where view3_idx = {$lst['view3_member_idx']}";
$mem_res = mysql_query($mem_sql);
$mem_lst = mysql_fetch_assoc($mem_res);
// $sub_lst = mysql_fetch_assoc($sub_res);
// $cnt = 0;
// while ($sub_lst = mysql_fetch_assoc($sub_res)) {
//     if ($sub_lst['view3_use_day'] == '즉시 입실가능') {
//         $cnt++;
//     }
// }
$view_img = explode('||',$lst['view3_file']);
?>
<style>
.store_name{vertical-align:middle;max-width:70.3125vw;font-family:'NotoSansKR-Medium';font-size:7.8125vw;letter-spacing:-0.05em;color:#0fc16b}
.status{vertical-align:middle;height:6.875vw;margin-left:3.125vw;padding:0 3.125vw;background-color:#e9c161;border-radius:8px;font-family:'NotoSansKR-Medium';font-size:3.75vw;line-height:6.875vw;letter-spacing:-0.05em;color:#fff}
.top_slide{width:79.6875vw;height:46.875vw;margin:6.25vw auto 0}
.top_slide .swiper-container{overflow:visible}
.top_slide .swiper-slide{opacity:0.3;width:79.6875vw;height:100%}
.top_slide .swiper-slide.swiper-slide-active{opacity:1}
.top_slide .swiper-slide .img_area{width:75vw;height:100%;margin:0 auto;background-repeat:no-repeat;background-position:center;background-size:cover}
.top_paging{padding:7.8125vw 0}
.top_tab.tabmenu li{width:25vw}
.top_tab.tabmenu li a{background-size:25vw 23.75vw}
.top_tab.tabmenu li:first-child a{background-image:url('../../../m/img/page/find/01/tab1.png')}
.top_tab.tabmenu li:nth-child(3) a{background-image:url('../../../m/img/page/find/01/tab3.png')}
.top_tab.tabmenu li:nth-child(2) a{background-image:url('../../../m/img/page/find/01/tab2.png')}
.top_tab.tabmenu li:last-child a{background-image:url('../../../m/img/page/find/01/tab4.png')}

.tab_conts{padding:7.8125vw 0}

/* tab1 */
.tab_cont1 .tab1_slide .swiper-container{width:66.5625vw;margin:0 auto}
.tab_cont1 .tab1_slide .tab1_btns{position:absolute;top:50%;margin-top:-5.3125vw}
.tab_cont1 .tab1_slide .tab1_btns.btn_prev{left:4.6875vw}
.tab_cont1 .tab1_slide .tab1_btns.btn_next{right:4.6875vw}
.tab_cont1 .tab1_paging{padding:7.8125vw 0}
.tab1_tbl_wrap{padding-left:4.6875vw;overflow-x:scroll}
.tab1_table{width:117.1875vw;table-layout:fixed}
.tab1_table th, .tab1_table td{vertical-align:middle;font-size:3.125vw;text-align:center;letter-spacing:-0.05em}
.tab1_table th{height:9.375vw;background-color:#0fc16b;font-family:'NotoSansKR-Medium';color:#fff}
.tab1_table td{height:8.125vw;border-bottom:1px solid rgba(39,39,39,0.3);color:#666}
.tab1_table td .psb{width:10.9375vw;height:5.625vw;margin:0 auto;border-radius:8px;background-color:#e9c161;font-family:'NotoSansKR-Medium';font-size:3.125vw;letter-spacing:-0.05em;line-height:5.625vw;color:#fff;text-align:center}
.tab_cont1 .tab1_link{display:block;width:39.0625vw;height:10.9375vw;margin:7.8125vw auto;background-color:#0fc16b;text-align:center}
.tab_cont1 .tab1_link span{display:inline-block;vertical-align:middle;font-family:'NotoSansKR-Medium';font-size:3.75vw;line-height:10.9375vw;letter-spacing:-0.05em;color:#fff}
.tab_cont1 .tab1_link .flag{width:4.375vw;line-height:0;margin-right:0.625vw}
.tab_cont1 .text_box{padding:10.9375vw 4.6875vw 10vw;background-color:#fff;box-sizing:border-box}
.tab_cont1 .text_box .box1{margin-bottom:7.8125vw}
.tab_cont1 .text_box .ttl{margin-bottom:2.5vw;font-family:'NotoSansKR-Medium';font-size:4.6875vw;letter-spacing:-0.05em;color:#222}
.tab_cont1 .text_box .text{font-size:3.75vw;line-height:175%;letter-spacing:-0.05em;color:#666}
.tab_cont1 .text_box .text em{font-family:'NotoSansKR-Medium';color:#ed0000}

/* tab2 */
.tab_cont2 .tab2_slide{width:79.6875vw;margin:0 auto}
.tab_cont2 .tab2_slide .swiper-container{overflow:visible}
.tab_cont2 .tab2_slide .swiper-slide{opacity:0.3}
.tab_cont2 .tab2_slide .swiper-slide.swiper-slide-active{opacity:1}
.tab_cont2 .tab2_slide .swiper-slide .img_area{width:75vw;height:46.875vw;margin:0 auto;background-repeat:no-repeat;background-position:center;background-size:cover}
.tab_cont2 .tab2_paging{padding:7.8125vw 0}
.tab_cont2 .ttl{margin:6.875vw 0 5.625vw;font-family:'NotoSansKR-Medium';font-size:5.3125vw;letter-spacing:-0.05em;color:#0fc16b;text-align:center}
.tab_cont2 .icons_box{background-color:#fff}
.tab_cont2 .icon_ul{width:78.125vw;margin:0 auto;padding:4.6875vw 0 1.5625vw}
.tab_cont2 .icon_ul li{position:relative;width:33.3333%;margin-bottom:4.6875vw;text-align:center}
.tab_cont2 .icon_ul .icon_img{width:15.625vw;height:15.625vw;margin:0 auto;background-repeat:no-repeat;background-position:center;background-size:cover}
.tab_cont2 .icon_ul .icon_ttl{font-size:3.125vw;letter-spacing:-0.05em;color:#666}

/* tab3 */
.tab_cont3 .map_area{height:78.125vw;background-color:#aaa}
.tab_cont3 .text_box{padding:12.1875vw 0 11.5625vw;background-color:#222}
.tab_cont3 .text_box li{margin-bottom:5vw}
.tab_cont3 .text_box li:last-child{margin-bottom:0}
.tab_cont3 .text_box .ttl{margin-bottom:1.875vw;font-family:'NotoSansKR-Medium';font-size:4.6875vw;letter-spacing:-0.05em;color:#0fc16b}
.tab_cont3 .text_box .loc_text{font-size:3.75vw;letter-spacing:-0.05em;color:#e3e3e3}

/* tab4 */
.tab4_tabmenu{padding-bottom:3.125vw}
.tab4_tabmenu li:first-child a{background-image:url('../../img/page/find/01/tab4_1.png')}
.tab4_tabmenu li:last-child a{background-image:url('../../img/page/find/01/tab4_2.png')}
.tab_cont4 .faq_list dt{height:12.5vw}
.tab_cont4 .faq_list dt a{display:block;width:100%;height:100%;padding:0 3.125vw;border-bottom:1px solid rgba(0,0,0,0.1);background-repeat:no-repeat;background-position:right 3.125vw center;background-image:url('../img/page/find/01/tab4_arr2.png');background-size:3.4375vw 1.875vw;line-height:12.5vw;font-family:'NotoSansKR-Medium';font-size:4.6875vw;letter-spacing:-0.05em;color:#222;box-sizing:border-box}
.faq_list li.on dt a{background-image:url('../../img/page/find/01/tab4_arr1.png')}
.faq_list dd{display:none;padding:3.125vw;font-size:3.75vw;line-height:175%;letter-spacing:-0.05em;color:#666}
.faq_list li.on dd{display:block}

/* 투어신청하기 폼 */
.prf_pop_container{position:fixed;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);z-index:1000}
.prf_pop_container .prf_pop{width:90.625vw;height:95.9375vw;max-height:calc(100vh - 25vw);overflow:auto;background-color:#fff}
.prf_pop_container .prf_inner{width:90.625vw;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
.pop_close{width:12.5vw;height:12.5vw;display:block;position:absolute;top:-12.5vw;right:0;background:url('../../img/page/profit/pop_close.jpg') no-repeat;background-size:cover}
.prf_pop .pop_title{padding:11.875vw 0 6.5625vw;}
.prf_pop .pop_title img{width:56.25vw;}
.prf_pop .type_txt{margin-bottom:2.1875vw}
.prf_pop .type_txt *{text-align:left;font-size:3.125vw;letter-spacing:-0.05em;color:#666}
.prf_pop .type_txt label{width:11.875vw;line-height:9.375vw}
.prf_pop .type_txt input, .prf_pop .type_txt select{width:54.6875vw;height:9.375vw;padding-left:3.125vw;background:#f8f8f8;border:1px solid #d4d4d4;box-sizing:border-box}
.prf_pop .type_txt select{
-webkit-appearance: none; /* 화살표 없애기 for chrome*/
-moz-appearance: none;    /* 화살표 없애기 for firefox*/
appearance: none;         /* 화살표 없애기 공통*/
background: url('../../img/page/find/01/sel_arr.png') no-repeat 95% 50%; /* 화살표 아이콘 추가 */
background-size:2.5vw;
background-color:#f8f8f8
}
.prf_pop .type_txt select::-ms-expand {
   display: none;         /* 화살표 없애기 for IE10, 11*/
}
.prf_pop .type_chk .chk_label{padding-left:6.25vw;position:relative;text-align:left;font-size:2.9685vw;letter-spacing:-0.05em;line-height:150%;color:#1c1c1c}
.prf_pop .type_chk .chk_label:after{content:"";width:4.6875vw;height:4.6875vw;position:absolute;top:0;left:0;background:url('../../img/page/profit/pop_check.png') no-repeat;background-position:0 0;background-size:100%;}
.prf_pop .type_chk input:checked + .chk_label:after{background-position:0 -4.6875vw}
.prf_pop .type_chk input{width:0;height:0}
.prf_pop .type_chk .btn_policy{padding:0 0.7vw;font-size:3.125vw;font-family:'NotoSansKR-Medium';letter-spacing:-0.05em;line-height:150%;color:#fff;background:#bcbcbc;}
.prf_pop .btn_send{width:58.125vw;height:9.375vw;margin:5.3125vw auto 11.25vw;background:#0fc16b;font-size:3.125vw;font-family:'NotoSansKR-Medium';letter-spacing:-0.05em;color:#fff}
</style>
    <div class="over_h">
        <div class="fs_def t_center">
            <p class="store_name ellipsis"><?=$lst['view3_title_01']?></p>
            <?if ($cnt > 0) {?>
            <p class="status">입실 가능</p>
            <?}else{?>
            <p class="status">입실 가능</p>
            <?}?>
        </div>
        <div class="top_slide">
            <div class="swiper-container h100">
                <ul class="swiper-wrapper h100">
                    <?if ($view_img[3] == "") {?>
                    <li class="swiper-slide swiper-slide-active">
                        <div class="img_area" style="background-image:url('../../../m/img/page/find/01/top_temp.jpg')"></div>
                    </li>
                    <?}else{
                        for ($i=3; $i < 32; $i++) {
                            if ($view_img[$i] == "") break;
                        ?>
                            <li class="swiper-slide">
                                <div class="img_area" style="background-image:url('<?=$request_root?>/upload/map_01<?=$view_img[$i]?>')"></div>
                            </li>
                        <?
                        }
                    }?>
                    <!-- <li class="swiper-slide">
                        <div class="img_area" style="background-image:url('../../../m/img/page/find/01/top_temp.jpg')"></div>
                    </li> -->
                </ul>
            </div>
        </div>
        <ul class="top_paging cmn_paging fs_def t_center">
            <!-- <li class="swiper-pagination-bullet-active"><a href="#none"></a></li>
            <li><a href="#none"></a></li>
            <li><a href="#none"></a></li> -->
        </ul>
        <ul class="top_tab tabmenu fs_def">
            <li class="on"><a href="#none">땅콩 소개</a></li>
            <li><a href="#none">서비스</a></li>
            <li><a href="#none">오시는 길</a></li>
            <li><a href="#none">FAQ</a></li>
        </ul>
        <div class="tab_conts">
            <div class="tab_cont1 tab_cont">
                <?if ($view_img[33] != "") {?>
                    <div class="tab1_slide rel">
                        <div class="swiper-container">
                            <ul class="swiper-wrapper">
                                <?for ($i=33; $i < 62; $i++) {
                                    if ($view_img[$i] == "") break;?>
                                        <li class="swiper-slide"><img src="<?=$request_root?>/upload/map_01<?=$view_img[$i]?>" alt="" class="w100"></li>
                                <?}?>
                                <!-- <li class="swiper-slide"><img src="<?=$root?>/img/page/find/01/tab1_temp.png" alt="" class="w100"></li> -->
                            </ul>
                        </div>
                        <button type="button" class="tab1_btns cmn_btns grn btn_prev">이전</button>
                        <button type="button" class="tab1_btns cmn_btns grn btn_next">다음</button>
                    </div>
                    <ul class="cmn_paging tab1_paging fs_def t_center">
                        <!-- <li class="swiper-pagination-bullet-active"><a href="#none"></a></li>
                        <li><a href="#none"></a></li>
                        <li><a href="#none"></a></li> -->
                    </ul>
                <?}?>
                <div class="tab1_tbl_wrap">
                    <table class="tab1_table">
                        <caption class="indent">방 정보</caption>
                        <colgroup>
                            <col width="15.625vw">
                            <col width="14.0625vw">
                            <col width="9.375vw">
                            <col width="9.375vw">
                            <col width="15.625vw">
                            <col width="15.625vw">
                            <col width="23.4375vw">
                            <col width="14.0625vw">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>호수</th>
                                <th>룸타입</th>
                                <th>성별</th>
                                <th>면적</th>
                                <th>보증금</th>
                                <th>월세</th>
                                <th>입주가능일자</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?if ($sub_num > 0) {
                                while ($sub_list = mysql_fetch_assoc($sub_res)) {?>
                                    <tr>
                                        <td><?=$sub_list['view3_title_01']?>호</td>
                                        <td><?=$sub_list['view3_special_01']?></td>
                                        <td><?=$sub_list['view3_sex']?></td>
                                        <td><?=$sub_list['view3_special_02']?>㎡</td>
                                        <td><?=$sub_list['view3_special_03']?></td>
                                        <td><?=$sub_list['view3_special_04']?></td>
                                        <td><?=$sub_list['view3_use_day']?></td>
                                        <td>
                                        <?if ($sub_list['view3_use_day'] == '즉시 입주가능') {?>
                                            <div class="psb">빈방</div>
                                        <?}?>
                                        </td>
                                    </tr>
                                <?}?>
                            <?} else {?>
                                <tr>
                                    <td colspan="8">등록되어 있는 방이 없습니다.</td>
                                </tr>
                            <?}?>
                            <!-- <tr>
                                <td>301호</td>
                                <td>2인실</td>
                                <td>여성</td>
                                <td>9㎡</td>
                                <td>115,000</td>
                                <td>570,000</td>
                                <td>2019-10-22</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>301호</td>
                                <td>2인실</td>
                                <td>여성</td>
                                <td>9㎡</td>
                                <td>115,000</td>
                                <td>570,000</td>
                                <td>2019-10-22</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>301호</td>
                                <td>2인실</td>
                                <td>여성</td>
                                <td>9㎡</td>
                                <td>115,000</td>
                                <td>570,000</td>
                                <td>2019-10-22</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>301호</td>
                                <td>2인실</td>
                                <td>여성</td>
                                <td>9㎡</td>
                                <td>115,000</td>
                                <td>570,000</td>
                                <td>즉시 입주 가능</td>
                                <td><div class="psb">빈방</div></td>
                            </tr>
                            <tr>
                                <td>301호</td>
                                <td>2인실</td>
                                <td>여성</td>
                                <td>9㎡</td>
                                <td>115,000</td>
                                <td>570,000</td>
                                <td>즉시 입주 가능</td>
                                <td><div class="psb">빈방</div></td>
                            </tr>
                            <tr>
                                <td>301호</td>
                                <td>2인실</td>
                                <td>여성</td>
                                <td>9㎡</td>
                                <td>115,000</td>
                                <td>570,000</td>
                                <td>2019-10-22</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>301호</td>
                                <td>2인실</td>
                                <td>여성</td>
                                <td>9㎡</td>
                                <td>115,000</td>
                                <td>570,000</td>
                                <td>2019-10-22</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>301호</td>
                                <td>2인실</td>
                                <td>여성</td>
                                <td>9㎡</td>
                                <td>115,000</td>
                                <td>570,000</td>
                                <td>2019-10-22</td>
                                <td></td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
                <a href="#none" class="tab1_link" id="tourInquiry">
                    <span class="flag"><img src="<?=$root?>/img/page/find/01/tab1_flag.png" alt="" class="w100"></span>
                    <span>투어 신청하기</span>
                </a>
                <div class="text_box inner">
                    <div class="box1">
                    <p class="ttl">땅콩 소개</p>
                        <p class="text" style="white-space:pre-wrap"><?=$lst['view3_command_01']?></p>
                        <!-- <p class="text">
                            2호선 강남역에 위치한 땅콩 강남1호점은 2개 층 총 22개의 룸으로 운영됩니다. <br>
                            각 룸은 1개의 화장실과 1개의 침실로 온전히 한 사람만을 위한 휴식공간으로 설계되었습니다. <br>
                            건물 옥상에는 데크가 설치된 넓은 테라스가 있어 하늘을 보며 쉴 수 있는 소소한 재미도 있죠. <br>
                            또한 공유 주방은 편안하게 요리를 하고 맛있는 한 끼 식사할 수 있는 공간이 있고 공유 세탁실을 통해 개인 의류를 세탁할 수도 있습니다. <br>
                            편리한 교통으로 자랑하는 역삼1호점은 도보 10분 거리에 2호선 역삼역이 있어 강남지역 또는 지하철로 출퇴근하는 분들에게 최적의 위치겠죠?
                        </p> -->
                    </div>
                    <div class="box2">
                        <p class="ttl">안내사항</p>
                        <p class="text" style="white-space:pre-wrap"><?=$lst['view3_command_02']?></p>
                        <!-- <p class="text">
                            - <em>미성년자 또는 만 37세 이상, 회원 가입시 개인정보가 계약자와 다를 경우 입주 불가능</em><br>
                            - 운영관리비와 선불공과금은 매월 별도 납부 함<br>
                            - '투어신청'은 두 지점까지 가능<br>
                            - '투어신청'은 입주가능일 45일 전부터 가능<br>
                            - '투어가능알림' 신청 후 투어가 가능해질 때 '투어신청가능'으로 SMS 자동문자 발송
                        </p> -->
                    </div>
                </div>
            </div>
            <div class="tab_cont2 tab_cont" style="display:none">
                <?if ($view_img[63] != "") {?>
                    <div class="tab2_slide">
                        <div class="swiper-container">
                            <ul class="swiper-wrapper">
                                <?for ($i=63; $i < 92; $i++) {
                                    if ($view_img[$i] == "") break;
                                    ?>
                                    <li class="swiper-slide swiper-slide-active">
                                        <div class="img_area" style="background-image:url('<?=$request_root?>/upload/map_01<?=$view_img[$i]?>')"></div>
                                    </li>
                                <?}?>
                                <!-- <li class="swiper-slide swiper-slide-active">
                                    <div class="img_area" style="background-image:url('../../img/page/find/01/tab2_sl_temp.jpg')"></div>
                                </li>
                                <li class="swiper-slide">
                                    <div class="img_area" style="background-image:url('../../img/page/find/01/tab2_sl_temp.jpg')"></div>
                                </li>
                                <li class="swiper-slide">
                                    <div class="img_area" style="background-image:url('../../img/page/find/01/tab2_sl_temp.jpg')"></div>
                                </li> -->
                            </ul>
                        </div>
                        <ul class="cmn_paging tab2_paging fs_def t_center">
                            <!-- <li class="swiper-pagination-bullet-active"><a href="#none"></a></li>
                            <li><a href="#none"></a></li>
                            <li><a href="#none"></a></li> -->
                        </ul>
                    </div>
                <?}?>
                <p class="ttl">개인 공간</p>
                <div class="icons_box inner">
                    <ul class="icon_ul fs_def">
                        <?$op_5 = explode("||",$lst['view3_special_05']);?>
                        <li <?if ($op_5[1] == '0' or $op_5[1] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_p1.png')"></div>
                            <p class="icon_ttl">개별 에어컨</p>
                        </li>
                        <li <?if ($op_5[2] == '0' or $op_5[2] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_p2.png')"></div>
                            <p class="icon_ttl">Wi-Fi</p>
                        </li>
                        <li <?if ($op_5[3] == '0' or $op_5[3] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_p3.png')"></div>
                            <p class="icon_ttl">책상&middot;의자(sidiz)</p>
                        </li>
                        <li <?if ($op_5[4] == '0' or $op_5[4] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_p4.png')"></div>
                            <p class="icon_ttl">침대</p>
                        </li>
                        <li <?if ($op_5[5] == '0' or $op_5[5] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_p5.png')"></div>
                            <p class="icon_ttl">개별 옷장</p>
                        </li>
                        <li <?if ($op_5[6] == '0' or $op_5[6] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_p6.png')"></div>
                            <p class="icon_ttl">커튼</p>
                        </li>
                        <li <?if ($op_5[7] == '0' or $op_5[7] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_p7.png')"></div>
                            <p class="icon_ttl">전신거울</p>
                        </li>
                    </ul>
                </div>
                <p class="ttl">공용 공간</p>
                <div class="icons_box inner">
                    <ul class="icon_ul fs_def">
                        <?$op_6 = explode("||",$lst['view3_special_06']);?>
                        <li <?if ($op_6[1] == '0' or $op_6[1] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_s1.png')"></div>
                            <p class="icon_ttl">마사지 체어</p>
                        </li>
                        <li <?if ($op_6[2] == '0' or $op_6[2] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_s2.png')"></div>
                            <p class="icon_ttl">빔프로젝트</p>
                        </li>
                        <li <?if ($op_6[3] == '0' or $op_6[3] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_s3.png')"></div>
                            <p class="icon_ttl">TV, 컴퓨터(프린트)</p>
                        </li>
                        <li <?if ($op_6[4] == '0' or $op_6[4] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_s4.png')"></div>
                            <p class="icon_ttl">스타일러(다리미)</p>
                        </li>
                        <li <?if ($op_6[5] == '0' or $op_6[5] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_s5.png')"></div>
                            <p class="icon_ttl">얼음정수기</p>
                        </li>
                        <li <?if ($op_6[6] == '0' or $op_6[6] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_s6.png')"></div>
                            <p class="icon_ttl">무선청소기</p>
                        </li>
                        <li <?if ($op_6[7] == '0' or $op_6[7] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_s7.png')"></div>
                            <p class="icon_ttl">건조기</p>
                        </li>
                        <li <?if ($op_6[8] == '0' or $op_6[8] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_s8.png')"></div>
                            <p class="icon_ttl">세탁기</p>
                        </li>
                        <li <?if ($op_6[9] == '0' or $op_6[9] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_s9.png')"></div>
                            <p class="icon_ttl">무인택배함</p>
                        </li>
                        <li <?if ($op_6[10] == '0' or $op_6[10] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_s10.png')"></div>
                            <p class="icon_ttl">CCTV</p>
                        </li>
                        <li <?if ($op_6[11] == '0' or $op_6[11] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_s11.png')"></div>
                            <p class="icon_ttl">밥솥</p>
                        </li>
                        <li <?if ($op_6[12] == '0' or $op_6[12] == "") {echo 'style="display:none"';}?>>
                            <div class="icon_img" style="background-image:url('../../img/page/find/01/ico_s12.png')"></div>
                            <p class="icon_ttl">토스트기<br>(조리기구 일체)</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tab_cont3 tab_cont" style="display:none">
                <div class="map_area" id="map_area"></div>
                <ul class="text_box t_center">
                    <li>
                        <p class="ttl">ADDRESS</p>
                        <p class="addr loc_text"><?=$lst['view3_addr_road'].$lst['view3_addr_detail']?></p>
                    </li>
                    <li>
                        <p class="ttl">TEL</p>
                        <p class="tel loc_text"><?=$lst['view3_tel']?></p>
                    </li>
                    <li>
                        <p class="ttl">E-mail</p>
                        <p class="mail loc_text"><?=$mem_lst['view3_email']?></p>
                    </li>
                </ul>
            </div>
            <div class="tab_cont4 tab_cont" style="display:none">
                <!-- <ul class="tab4_tabmenu tabmenu fs_def t_center">
                    <li class="on"><a href="#none">입주 문의</a></li>
                    <li><a href="#none">계약 문의</a></li>
                </ul> -->
                <div class="tab4_conts inner">
                    <div class="tab4_cont1 tab4_cont">
                        <ul class="faq_list">
                            <li class="on">
                                <dl>
                                    <dt><a href="#none" class="ellipsis"><?=$lst['view3_faq_01']?></a></dt>
                                    <dd><?=$lst['view3_faq_command_01']?></dd>
                                    <!-- <dd>
                                        네. 작심하우스는 2030 청춘을 인큐베이팅 한다는 것을 미션으로 론칭된 브랜드로 20~35세의<br>
                                        사회 초년생들에게 입주 기회가 우선적으로 주어집니다.
                                    </dd> -->
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt><a href="#none" class="ellipsis"><?=$lst['view3_faq_02']?></a></dt>
                                    <dd><?=$lst['view3_faq_command_02']?></dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt><a href="#none" class="ellipsis"><?=$lst['view3_faq_03']?></a></dt>
                                    <dd><?=$lst['view3_faq_command_03']?></dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt><a href="#none" class="ellipsis"><?=$lst['view3_faq_04']?></a></dt>
                                    <dd><?=$lst['view3_faq_command_04']?></dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt><a href="#none" class="ellipsis"><?=$lst['view3_faq_05']?></a></dt>
                                    <dd><?=$lst['view3_faq_command_05']?></dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt><a href="#none" class="ellipsis"><?=$lst['view3_faq_06']?></a></dt>
                                    <dd><?=$lst['view3_faq_command_06']?></dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <div class="tab4_cont2 tab4_cont"  style="display:none">
                        <ul class="faq_list">
                            <li class="on">
                                <dl>
                                    <dt><a href="#none" class="ellipsis">입주 조건이 있나요?</a></dt>
                                    <dd>
                                        네. 작심하우스는 2030 청춘을 인큐베이팅 한다는 것을 미션으로 론칭된 브랜드로 20~35세의 사회 초년생들에게 입주 기회가 우선적으로 주어집니다.
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt><a href="#none" class="ellipsis">입주 조건이 있나요?</a></dt>
                                    <dd>
                                        네. 작심하우스는 2030 청춘을 인큐베이팅 한다는 것을 미션으로 론칭된 브랜드로 20~35세의<br>
                                        사회 초년생들에게 입주 기회가 우선적으로 주어집니다.
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt><a href="#none" class="ellipsis">입주 조건이 있나요?</a></dt>
                                    <dd>
                                        네. 작심하우스는 2030 청춘을 인큐베이팅 한다는 것을 미션으로 론칭된 브랜드로 20~35세의<br>
                                        사회 초년생들에게 입주 기회가 우선적으로 주어집니다.
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt><a href="#none" class="ellipsis">입주 조건이 있나요?</a></dt>
                                    <dd>
                                        네. 작심하우스는 2030 청춘을 인큐베이팅 한다는 것을 미션으로 론칭된 브랜드로 20~35세의<br>
                                        사회 초년생들에게 입주 기회가 우선적으로 주어집니다.
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 투어신청하기 팝업 start -->
    <div class="prf_pop_container" style="display:none">
        <div class="prf_inner">
            <a href="#none" class="pop_close"></a>
            <div class="prf_pop">
                <div>
                    <p class="pop_title t_center"><img src="<?=$root?>/img/page/profit/pop_title.png" alt=""></p>
                    <div class="t_center">
                        <form method="post" action="<?=$request_root?>/sms/sms_trans.php" class="form" onsubmit="return false">
                            <input type="hidden" name="send" value="right">
                            <input type="hidden" name="sca" value="tour">
                            <input type="hidden" name="title_01" value="투어 신청">
                            <div class="type_txt fs_def">
                                <label for="name">성함</label>
                                <input type="text" name="name" id="name">
                            </div>
                            <div class="type_txt fs_def">
                                <label for="sex">성별</label>
                                <select name="sex" id="sex">
                                    <option value="">성별을 선택해주세요</option>
                                    <option value="님">남</option>
                                    <option value="여">여</option>
                                </select>
                            </div>
                            <div class="type_txt fs_def">
                                <label for="hp">연락처</label>
                                <input type="text" name="hp">
                            </div>
                            <div class="type_chk fs_def">
                                <input type="checkbox" name="chk_sms_agree" id="chk_sms_agree0">
                                <label for="chk_sms_agree0" class="chk_label">개인정보취급방침을 읽었으며 이에 동의합니다.&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <a href="#none" class="bindPolicyModalOpen btn_policy" data-type="3">전문보기</a>
                            </div>
                            <button type="button" class="bindSmsSubmit btn_send">상담하기</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- //투어신청하기 팝업 end -->
<script>
new Swiper('.top_slide .swiper-container', {
    slidesPerView: 'auto',
    centeredSlides: true,
    loop:true,
    speed: 500,
    autoplay: {
        delay: 3000,
    },
    pagination: {
        el: '.top_paging',
        type: 'bullets',
        clickable: true,
        renderBullet: function(index, className){
            return '<li class="' + className + '"><a href="#none"></a></li>';
        }
    },
});
new Tabbing($('.top_tab'), $('.tab_conts'));
new Tabbing($('.tab4_tabmenu'), $('.tab4_conts'));
new Swiper('.tab1_slide .swiper-container', {
    // loop:true,
    speed: 500,
    autoplay: {
        delay: 3000,
    },
    navigation: {
        nextEl: '.tab1_btns.btn_next',
        prevEl: '.tab1_btns.btn_prev',
    },
    pagination: {
        el: '.tab1_paging',
        type: 'bullets',
        clickable: true,
        renderBullet: function(index, className){
            return '<li class="' + className + '"><a href="#none"></a></li>';
        }
    },
    observer: true,
    observeParents: true,
});
new Swiper('.tab2_slide .swiper-container', {
    // loop:true,
    // slidesPerView: 'auto',
    speed: 500,
    autoplay: {
        delay: 3000,
    },
    pagination: {
        el: '.tab2_paging',
        type: 'bullets',
        clickable: true,
        renderBullet: function(index, className){
            return '<li class="' + className + '"><a href="#none"></a></li>';
        }
    },
    observer: true,
    observeParents: true,
});

(function($) {
    $('#tourInquiry').click(function(){
        $('.prf_pop_container').css('display','block');
    });
    $('.pop_close').click(function(){
        $('.prf_pop_container').css('display','none');
    });
}(jQuery));
</script>
<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=5avq6azn26"></script>
<script>
var position = new naver.maps.LatLng(<?=$lst['view3_addr_y']?>, <?=$lst['view3_addr_x']?>);
var map = new naver.maps.Map('map_area',{
    center: position,
    zoom: 10
});
var markerOptions = {
    position: position,
    map: map,
    icon: '<?=$request_root?>/img/page/find/01/marker.png'
};
var marker = new naver.maps.Marker(markerOptions);
$('.top_tab li:nth-child(3)').click(function(){
    map._onResize();
});
$('.faq_list a').on('click', function(e) {
    var _this = $(this).closest('li');
    var _prev = $('.faq_list .on');
    if(_this.index() !== _prev.index()) {
        _prev.removeClass('on').find('dd').stop().slideUp(100);
        _this.addClass('on').find('dd').stop().slideDown(200);
    }
    e.preventDefault();
});
</script>
