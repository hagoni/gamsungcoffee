    <div class="bottom_area">
        <!-- 하단 링크 박스 start -->
        <ul class="bottom_links fs_def">
            <li class="fran_link">
                <a href="<?=$root?>/html/fran.html">
                    <div class="bg abs"></div>
                    <span></span>
                </a>
            </li>
            <li class="menu_link">
                <a href="<?=$root?>/html/menu_1.html">
                    <div class="bg abs"></div>
                    <span></span>
                </a>
            </li>
        </ul>
        <!-- //하단 링크 박스 end -->
<?php
include_once('footer.php');
include_once('sitemap.php');
?>
    </div>
</div>

<!-- 가맹문의 바 start -->
<div class="inquiry_bar br_inquiry_bnr">
    <div class="inner_1200 clearfix">
        <form method="post" action="<?=$root?>/sms/sms_trans.php" class="bnr_inquiry" id="directSms1">
            <input type="hidden" name="send" value="right">
            <fieldset>
                <legend class="indent">감성커피 가맹상담문의</legend>
                <div class="clearfix">
                    <div class="type_tel f_left"><img src="<?=$root?>/img/common/inq_tel.png" alt="가맹문의 02-401-1966"></div>
                    <div class="type_txt type_tags f_left">
                        <label for="name0" class="type_txt_label">성함</label>
                        <input type="text" name="name" id="name0" class="input_name sms_name labeling" autocomplete="off">
                    </div>
                    <div class="type_txt type_tags f_left">
                        <label for="hp0" class="type_txt_label">전화번호</label>
                        <input type="text" name="hp" id="hp0" class="input_phone sms_phone labeling" autocomplete="off">
                    </div>
                    <div class="type_select type_tags f_left">
                        <select name="special_03" id="iqr_special" class="legion">
                            <option value="">가맹희망지역</option>
                            <option value="서울">서울</option>
                            <option value="부산">부산</option>
                            <option value="대구">대구</option>
                            <option value="인천">인천</option>
                            <option value="광주">광주</option>
                            <option value="대전">대전</option>
                            <option value="울산">울산</option>
                            <option value="세종">세종</option>
                            <option value="경기">경기</option>
                            <option value="강원">강원</option>
                            <option value="충북">충북</option>
                            <option value="충남">충남</option>
                            <option value="전북">전북</option>
                            <option value="전남">전남</option>
                            <option value="경북">경북</option>
                            <option value="경남">경남</option>
                            <option value="제주">제주</option>
                        </select>
                    </div>
                    <div class="type_chk fs_def f_left">
                        <input type="checkbox" id="chk_sms_agree0" name="chk_sms_agree">
                        <label for="chk_sms_agree0" class="chk_label"><a href="#none" class="btn_policy bindPolicyModalOpen" data-type="3">개인정보취급방침</a><br>동의하기</label>
                    </div>
                    <button type="submit" class="bindSmsSubmit btn_send f_right">문의하기</button>
                </div>
            </fieldset>
        </form>
    </div>
</div>
<!-- //가맹문의 바 end -->

<!-- 하단 가맹문의 바 start -->
<div class="br_btns_wrap">
    <a href="#none" class="br_btn_top">TOP</a>
    <a href="#none" class="br_btn_inq">가맹문의 버튼</a>
</div>

<?
@include_once(ROOT_INC.'/statistics_include.php');
?>

</body>
</html>
