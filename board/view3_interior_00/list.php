<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
if(!defined('_VIEW3BOARD_'))exit;
######################################################################################################################################################
?>

<!-- layer1 start -->
<div class="layer1 over_h rel" data-motion-offset="1">
    <div class="page_title_area">
        <div class="titles_wrap">
            <p class="box_title">감성커피 인테리어</p>
            <p class="page_title">
                <img src="<?=$skin_path?>/img/page_title.jpg" alt="따뜻한 감성에 기대어 웃다">
                <span class="grad grad_l el1_0"></span>
                <span class="line line_l"><span class="el1_1"></span></span>
            </p>
        </div>
    </div>
    <p class="lyr1_ttl t_center"><img src="<?=$skin_path?>/img/lyr1_ttl.png" alt="커피를 즐기는 잠깐의 시간이지만 진심을 담은 따뜻한 감성으로 당신을 응원합니다."></p>
    <p class="lyr1_dec abs t_center el1_2"><img src="<?=$skin_path?>/img/lyr1_dec.png" alt="Gamsung Interior"></p>
    <div class="center clearfix">
        <div class="left_area f_left">
            <div class="lyr1_slide">
                <div class="swiper-container">
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide"><img src="<?=$skin_path?>/img/lyr1_sl1.jpg" alt=""></li>
                        <li class="swiper-slide"><img src="<?=$skin_path?>/img/lyr1_sl2.jpg" alt=""></li>
                        <li class="swiper-slide"><img src="<?=$skin_path?>/img/lyr1_sl3.jpg" alt=""></li>
                        <li class="swiper-slide"><img src="<?=$skin_path?>/img/lyr1_sl4.jpg" alt=""></li>
                    </ul>
                </div>
            </div>
            <ul class="lyr1_paging lyr_paging fs_def t_right">
                <li class="swiper-pagination-bullet-active"><a href="#none"></a></li>
                <li><a href="#none"></a></li>
                <li><a href="#none"></a></li>
                <li><a href="#none"></a></li>
            </ul>
        </div>
        <div class="right_area f_right t_center">
            <ul>
                <li>
                    <p class="li_ttl">
                        누구나 공감하는<br>
                        <em>감성적인 한글 네온사인</em>
                    </p>
                    <p class="li_txt">
                        ‘넌 지금 커피가 땡긴다’ 같이 트렌디한 한글 네온 사인은<br>
                        감성커피로부터 시작되었습니다.
                    </p>
                </li>
                <li>
                    <p class="li_ttl">
                        감성을 자극하는<br>
                        <em>레트로한 소품 인테리어</em>
                    </p>
                    <p class="li_txt">
                        매장 내에 감성을 자극하는 레트로한 소품을 비치하여<br>
                        감성커피만의 아이덴티티를 살렸습니다.
                    </p>
                </li>
            </ul>
            <div class="lyr1_img rel">
                <img src="<?=$skin_path?>/img/lyr1_img.jpg" alt="">
                <div class="cloud abs"><img src="<?=$skin_path?>/img/lyr1_cloud.png" alt=""></div>
            </div>
        </div>
    </div>
</div>
<!-- //layer1 end -->
<!-- layer2 start -->
<div class="layer2">
    <div class="lyr2_bg">
        <div class="swiper-container h100">
            <ul class="swiper-wrapper h100">
                <li class="swiper-slide slide1"></li>
                <li class="swiper-slide slide2"></li>
                <li class="swiper-slide slide3"></li>
            </ul>
        </div>
    </div>
    <div class="text_box">
        <ul class="fs_def">
            <li class="el2_1"><img src="<?=$skin_path?>/img/lyr2_w1.png" alt="마"></li>
            <li class="el2_2"><img src="<?=$skin_path?>/img/lyr2_w2.png" alt="음"></li>
            <li class="el2_3"><img src="<?=$skin_path?>/img/lyr2_w3.png" alt="으"></li>
            <li class="el2_4"><img src="<?=$skin_path?>/img/lyr2_w4.png" alt="로"></li>
            <li class="el2_5"><img src="<?=$skin_path?>/img/lyr2_w5.png" alt="쓴"></li>
            <li class="el2_6"><img src="<?=$skin_path?>/img/lyr2_w6.png" alt="글"></li>
            <li class="el2_7"><img src="<?=$skin_path?>/img/lyr2_w7.png" alt="은"></li>
            <li class="el2_8"><img src="<?=$skin_path?>/img/lyr2_w8.png" alt="마"></li>
            <li class="el2_9"><img src="<?=$skin_path?>/img/lyr2_w9.png" alt="음"></li>
            <li class="el2_10"><img src="<?=$skin_path?>/img/lyr2_w10.png" alt="으"></li>
            <li class="el2_11"><img src="<?=$skin_path?>/img/lyr2_w11.png" alt="로"></li>
            <li class="el2_12"><img src="<?=$skin_path?>/img/lyr2_w12.png" alt="전"></li>
            <li class="el2_13"><img src="<?=$skin_path?>/img/lyr2_w13.png" alt="해"></li>
            <li class="el2_14"><img src="<?=$skin_path?>/img/lyr2_w14.png" alt="집"></li>
            <li class="el2_15"><img src="<?=$skin_path?>/img/lyr2_w15.png" alt="니"></li>
            <li class="el2_16"><img src="<?=$skin_path?>/img/lyr2_w16.png" alt="다"></li>
        </ul>
    </div>
    <p class="text t_center">
        때로는 힘겨웠고 또 즐거웠던 당신의 이야기.<br>
        진심의 마음으로 듣고 진심의 마음으로 답하겠습니다.
    </p>
</div>
<!-- //layer2 end -->

<!-- board wrapper start -->
<div class="over_h">
    <div id="boardWrap">
        <p class="int_ttl t_center"><img src="<?=$skin_path?>/img/int_ttl.png" alt="감성커피 인테리어"></p>
        <ul class="tabmenu fs_def">
    		<li<?if($view3_tab == '' || $view3_tab == 'interior'){echo ' class="on"';}?>><a href="<?=URL_PATH.'?'.get("tab","tab=interior");?>">인테리어</a></li>
    		<li<?if($view3_tab == 'exterior'){echo ' class="on"';}?>><a href="<?=URL_PATH.'?'.get("tab","tab=exterior");?>">익스테리어</a></li>
    	</ul>

<?
if($total_data > 0) {
?>

    	<div class="interior_slider">
    		<div class="swiper-container slider-container">
    			<ul class="swiper-wrapper slider-wrapper">
<?
	$sql = $main_sql.$view_order;
	$out_sql = mysql_query($sql);
	$file = array();
	while($list = mysql_fetch_assoc($out_sql)) {
        $list_file_array = explode('||', $list['view3_file']);
        $list_file = $pc.'/upload/'.$board.$list_file_array[2];
		$file[] = $list_file;
?>
    				<li class="swiper-slide" data-src="<?=$list_file?>">
                        <img src="<?=$list_file?>" alt="" class="w100">
                    </li>
<?
	}
?>
    			</ul>
    		</div>
    	</div>
    	<ul class="interior_paging lyr_paging fs_def t_center">
    	</ul>
<script>
$(document).ready(function() {

    var $swiperItems = $('.interior_slider .swiper-slide');
    new Swiper('.interior_slider > .slider-container', {
        spaceBetween: 50,
		pagination: {
            el: '.interior_paging',
            type: 'bullets',
            clickable: true,
            renderBullet: function(index, className) {
                var html = '';
                html += '<li class="swiper-pagination-bullet">';
                html += '   <a href="#none">';
                html += '   </a>';
                html += '</li>';
                return html;
            }
        }
    });
    new Swiper('.lyr1_slide .swiper-container', {
        setWrapperSize: true,
        speed: 500,
            autoplay: {
            delay: 3000,
        },
        pagination: {
        	el: '.lyr1_paging',
        	type: 'bullets',
        	clickable: true,
        	renderBullet: function(index, className){
        		return '<li class="' + className + '"><a href="#none"></a></li>';
        	}
        },
    });
    new Swiper('.lyr2_bg .swiper-container', {
        setWrapperSize: true,
        speed: 500,
            autoplay: {
            delay: 3000,
        },
        effect: 'fade',
        fadeEffect: {
        	crossFade: true
        },
    });
});
</script>

<?
} else {
    echo '<p class="nodata">게시물이 없습니다.</p>'.PHP_EOL;
}
?>

    </div>
</div>
<!-- //board wrapper end -->
<script>
new YMotion([
    [
        {el: '.el1_0', set: {backgroundPositionX: "0"}, to: {backgroundPositionX: "1099", ease: Back.Power0}, d: 2.6},
        {el: '.el1_1', set: {width: "0%"}, to: {width: "100%"}, d: 0.6, t: '-=0.8'},
        {el: '.el1_2', set: {opacity: 1, y: 0}, to: {opacity: 0, y: 200}, d: 1.2, t: '-=1.4'},
    ],
]).activate();

TweenMax.to($('.cloud'), 1.0, {opacity: 0.6, ease: Bounce.easeOut, repeat: -1, yoyo: true});
</script>