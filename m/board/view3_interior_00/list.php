<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
if(!defined('_VIEW3BOARD_'))exit;
######################################################################################################################################################
?>
<div class="titles_wrap">
    <p class="box_title">감성 인테리어</p>
    <p class="page_title"><img src="<?=$root?>/img/page/brand/4/page_title.png" alt="따뜻한 감성에 기대어 웃다" class="w100"></p>
    <span class="line"></span>
</div>
<div class="layer1">
    <p class="lyr1_title"><img src="<?=$root?>/img/page/brand/4/lyr1_title.png" alt="" class="w100"></p>
    <div class="lyr1_slide">
        <div class="swiper-container">
            <ul class="swiper-wrapper">
                <li class="swiper-slide"><div class="inner"><img src="<?=$root?>/img/page/brand/4/lyr1_sl1.jpg" alt="" class="w100"></div></li>
                <li class="swiper-slide"><div class="inner"><img src="<?=$root?>/img/page/brand/4/lyr1_sl2.jpg" alt="" class="w100"></div></li>
                <li class="swiper-slide"><div class="inner"><img src="<?=$root?>/img/page/brand/4/lyr1_sl3.jpg" alt="" class="w100"></div></li>
                <li class="swiper-slide"><div class="inner"><img src="<?=$root?>/img/page/brand/4/lyr1_sl4.jpg" alt="" class="w100"></div></li>
            </ul>
        </div>
    </div>
    <ul class="lyr1_paging tab_paging fs_def t_center">
        <li class="swiper-pagination-bullet-active"><a href="#none"></a></li>
        <li><a href="#none"></a></li>
    </ul>
    <p class="lyr1_fs30 sub_text fw_b">
        누구나 공감하는<br>
        <em>감성적인 한글 네온사인</em>
    </p>
    <p class="lyr1_fs24 sub_text">
        ‘넌 지금 커피가 땡긴다’ 같이 트렌디한 한글 네온 사인은<br>
        감성커피로부터 시작되었습니다.
    </p>
    <p class="lyr1_fs30 sub_text fw_b">
        감성을 자극하는<br>
        <em>레트로한 소품 인테리어</em>
    </p>
    <p class="lyr1_fs24 sub_text">
        매장 내에 감성을 자극하는 레트로한 소품을 비치하여<br>
        감성커피만의 아이덴티티를 살렸습니다.
    </p>
</div>
<div class="layer2 bg">
    <div class="lyr2_slide">
        <div class="swiper-container">
            <ul class="swiper-wrapper">
                <li class="swiper-slide"><img src="<?=$root?>/img/page/brand/4/lyr2_sl1.jpg" alt="" class="w100"></li>
                <li class="swiper-slide"><img src="<?=$root?>/img/page/brand/4/lyr2_sl2.jpg" alt="" class="w100"></li>
                <li class="swiper-slide"><img src="<?=$root?>/img/page/brand/4/lyr2_sl3.jpg" alt="" class="w100"></li>
            </ul>
        </div>
    </div>
    <div class="text_box t_center">
        <p class="lyr2_title"><img src="<?=$root?>/img/page/brand/4/lyr2_title.png" alt="" class="w100"></p>
        <p class="sub_text t_center">
            때로는 힘겨웠고 또 즐거웠던 당신의 이야기.<br>
            진심의 마음으로 듣고 진심의 마음으로 답하겠습니다.
        </p>
    </div>
</div>
<p class="int_title"><img src="<?=$root?>/img/page/brand/4/int_title.png" alt="" class="w100"></p>
<!-- board wrapper start -->
<div id="boardWrap">
	<div class="tabmenu_wrap">
	    <ul class="tabmenu fs_def">
			<li<?if($view3_tab == '' || $view3_tab == 'interior'){echo ' class="on"';}?>><a href="<?=BOARD;?>/index.php?<?=get("tab","tab=interior");?>">INTERIOR</a></li>
			<li<?if($view3_tab == 'exterior'){echo ' class="on"';}?>><a href="<?=BOARD;?>/index.php?<?=get("tab","tab=exterior");?>">EXTERIOR</a></li>
		</ul>
	</div>

<?
if($total_data > 0) {
?>

	<div class="interior_slider rel">
		<div class="swiper-container">
			<ul class="swiper-wrapper">
<?
	$sql = $main_sql.$view_order;
	$out_sql = mysql_query($sql);
	while($list = mysql_fetch_assoc($out_sql)) {
		$temp_file_arr = explode('||', $list['view3_file']);
		for($i=0; $i<count($temp_file_arr); $i++) {
		    if($temp_file_arr[$i] == '') continue;
		    $list_img = $temp_file_arr[$i];
			break;
		}
        $file_size = getimagesize(ROOT_INC.'/upload/'.$board.$list_img);
        $list_html = '';
        $list_html .= '<li class="swiper-slide rel">'.PHP_EOL;
        $list_html .= '  <img src="'.BOARD.'/'.$view3_skin.'/img.php?x='.$file_size[0].'&amp;y='.$file_size[1].'" alt="" class="w100">'.PHP_EOL;
        $list_html .= '  <img data-src="'.$pc_upload.'/'.$board.$list_img.'" alt="" class="w100 swiper-lazy">'.PHP_EOL;
        $list_html .= '</li>'.PHP_EOL;
        echo $list_html;
	}
?>
			</ul>
		</div>
		<button type="button" class="interior_btns swiper-prev">이전</button>
		<button type="button" class="interior_btns swiper-next">다음</button>
		<ul class="swiper-paging tab_paging t_center fs_def"></ul>
	</div>

<script>
(function($) {
    doc.ready(function() {
        var swiper = new Swiper($('.lyr2_slide > .swiper-container'), {
            autoplay: {
				delay: 3000
			},
            allowTouchMove: false
        });
        var swiper = new Swiper($('.interior_slider > .swiper-container'), {
            autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
            setWrapperSize: true,
			pagination: {
				el: '.interior_slider .swiper-paging',
				type: 'bullets',
				clickable: true,
				renderBullet: function(index, className) {
					return '<li class="swiper-pagination-bullet"><a href="#none">'+ index +'</a></li>';
			    }
		    },
			navigation: {
				prevEl: '.interior_btns.swiper-prev',
				nextEl: '.interior_btns.swiper-next'
		    },
            preloadImages: false,
            lazy: true
        });
        var swiper = new Swiper($('.lyr1_slide .swiper-container'), {
            autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
            pagination: {
				el: '.lyr1_paging',
				type: 'bullets',
				clickable: true,
				renderBullet: function(index, className) {
					return '<li class="swiper-pagination-bullet"><a href="#none">'+ index +'</a></li>';
			    }
		    }
        });
    });
}(jQuery));
</script>

<?
} else {
    echo '<p class="nodata">게시물이 없습니다.</p>'.PHP_EOL;
}
?>

</div>
<!-- //board wrapper end -->
