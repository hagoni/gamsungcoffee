<!-- bottom_inquiry start -->
<div class="bottom_inquiry">
    <div class="inner">
        <div class="bottom_form">
            <form method="post" action="<?=$pc?>/sms/sms_trans.php" id="directSms1">
                <input type="hidden" name="send" value="right">
                <fieldset>
                    <legend class="indent">감성커피 가맹상담문의</legend>
                    <div class="over_h">
                        <div class="type_chk f_left">
                            <input type="checkbox" id="chk_sms_agree0" name="chk_sms_agree">
                            <label for="chk_sms_agree0" class="chk_label rel">개인정보수집관련 동의</label>
                        </div>
                    </div>
                    <div class="form_txt">
                        <div class="type_txt f_left">
                            <label for="name0" class="type_txt_label">성함</label>
                            <input type="text" name="name" id="name0" class="input_name sms_name labeling">
                        </div>
                        <div class="type_txt f_left">
                            <label for="hp0" class="type_txt_label">연락처</label>
                            <input type="text" name="hp" id="hp0" class="input_phone sms_phone labeling">
                        </div>
                    </div>
                    <div class="form_txt">
                        <div class="type_txt f_left">
                            <label for="special_03" class="type_txt_label">창업희망지역</label>
                            <input type="text" name="special_03" id="special_03" class="input_name sms_name labeling">
                        </div>
                        <button type="submit" class="bindSmsSubmit btn_send f_left">전송</button>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
</div>
<!-- //bottom_inquiry end -->
<!-- footer start -->
<div class="footer_wrap">
    <div class="footer_in t_center">
        <h1 class="f_bi"><a href="<?=$root?>/">감성커피</a></h1>
        <ul class="policy fs_def">
            <li><a href="#none" class="bindPolicyModalOpen" data-type="0">개인정보처리방침</a></li>
            <li><a href="#none" class="bindPolicyModalOpen" data-type="1">이메일무단수집거부</a></li>
            <li><a href="<?=$root?>/board/index.php?board=map_01&sca=all#1">매장찾기</a></li>
            <li><a href="<?=$root?>/html/fran.html#7">가맹문의</a></li>
        </ul>
        <address>
            사업자 등록번호 215-87-87293<br>
            본사 주소 : 서울시 송파구 중대로12길 9 (가락동122-4)<br>
            T. 02-401-1966&nbsp;&nbsp;&nbsp;&nbsp;F. 02-6937-1192&nbsp;&nbsp;&nbsp;&nbsp;E. b_brothers@naver.com<br>
            COPYRIGHT 2019 BY GAMSUNG COFFEE Co. Ltd. ALL RIGHT RESERVED<br>
        </address>
    </div>
</div>
<!-- //footer end -->
