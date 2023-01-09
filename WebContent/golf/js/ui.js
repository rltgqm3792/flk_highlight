$(function(){

	/* 요소별 */
	/*if( $('.lnb_container').length ){
		sports.lnb.init();
	}
	if( $('.selectBox01').length ){
		sports.selectBox.init('.selectBox01');
	}
	if( $('.board_type01').length ){
		sports.toggleOpen.whole('.board_type01 .b_header .btnOpen', '.item');
	}*/
	/*if( $('.search_type01 .txtEntry01').length ){
		sports.formFocus.input('.search_type01 .txtEntry01');
	}*/
	if( $('.selectBox01').length ){
		sports.selectBox.basic.init('.selectBox01');
	}
	if( $('.selectBox02').length ){
		sports.selectBox.style.init('.selectBox02');
		sports.autoClose('.selectBox02', 'active');
	}
	if( $('.fileFind_type01').length ){
		sports.fileFind.init('.fileFind_type01');
	}
	/*if( $('.videoModify_type01').length ){
		sports.videoModify.init('.videoModify_type01');
	}*/
	
	
});



// 스크롤바 여부 체크
$.fn.hasScrollBar = function() {
	return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0) || (this.prop("scrollHeight") > this.prop("clientHeight"));
};

var sports = {
	/* tab */
	tab: {
		init: function(wrap, index){

			var _this = this;
			var $wrap = $(wrap);
			var menuLi = wrap + ' > ._tabList li';
			var $menuLi = $(menuLi);
			var $tabCont = $wrap.find('._tabContent');

			// init
			if( !index ){
				var index = 0;
			}
			_this.movement(index, $wrap, $menuLi, $tabCont);

			// 동작
			$(document).on('click', menuLi + ':not(.dis) a' , function(){
				var $wrap = $(this).closest(wrap);
				var idx = $menuLi.index( $(this).parent() );
				_this.movement(idx, $wrap, $menuLi, $tabCont);
				return false;
			});
		},
		movement: function(idx, $wrap, $menuLi, $tabCont){
			// var $menuLi = $wrap.children(tab).find('li');
			// var $tabCont = $wrap.find(cont);
			$menuLi.removeClass('on');
			$menuLi.eq(idx).addClass('on');
			$tabCont.hide();
			$tabCont.eq(idx).show();
		},
	},
	/* select */
	selectBox: {
		basic: {
			init: function(el){
				var _this = this;
				
				// 초기값 셋팅
				// _this.update(el);

				// 셀렉트 선택
				$(document).on('change', el + ' select', function(){
					_this.movement( el, $(this) );
				});
			},
			movement: function(el, $this, initFlag){
				// console.log(el, $this, initFlag);
				var $value = $this.closest(el).find('.valTxt');
				if( initFlag && $value.find('.hint').length ){
					return false;
				}
				$value.text( $this.find('option:selected').text() );
			},
			update: function(el){
				var _this = this;
				$(el).find('select').each(function(idx){
					_this.movement( el, $(this), true );
				});
			},
		},
		style: {
			init: function(el){
				var _this = this;

				// 초기값 셋팅
				// _this.setting(el);

				// 셀렉트 선택
				$(document).on('click', el + ' .s_value', function(){
					$(el).removeClass('active');
					$(this).closest(el).toggleClass('active');
				});
				$(document).on('click', el + ' .s_list button', function(){
					_this.movement( el, $(this) );
				});
			},
			/*setting: function(el){
				var _this = this;
				$(el).find('select').each(function(idx){
					_this.movement( el, $(this), true );
				});
			},*/
			movement: function(el, $this, initFlag){
				var $wrap = $this.closest(el);
				var $value = $wrap.find('.s_value');
				var $list = $wrap.find('.s_list');
				/*if( initFlag && $list.find('li.on').length ){
					return false;
				}*/
				$value.text( $this.text() );
				$list.find('li').removeClass('on');
				$this.closest('li').addClass('on');
				$wrap.removeClass('active');
			}
		},
	},
	/* Toggle Open */
	toggleOpen: {
		oneself: function(el){
			$(document).on('click', el, function(){
				$(this).toggleClass('open');
				return false;
			});
		},
		whole: function(el, wrap){
			console.log(el)
			$(document).on('click', el, function(){
				$(this).closest(wrap).toggleClass('open');
				return false;
			});
		},
	},
	/* 다른 곳 클릭하면 닫기 */
	autoClose: function(trg, className) {
		$(document).click(function (e) {
			var $trg = $(trg);
			var _className;
			if( !className ){
				_className = 'open';
			} else {
				_className = className;
			}
			if (!$trg.is(e.target) && $trg.has(e.target).length === 0) {
				$trg.each(function () {
					var $this = $(this);
					if ($this.hasClass(_className)) {
						$this.removeClass(_className);
					}
				})
			}
		});
	},
	/* 팝업 */
	popup: function(el){
		var $pop = $(el);
		var isOpen = $pop.hasClass('visible');

		if( isOpen ){ // 닫힘
			// alert(scrlTop);
			$pop.removeClass('visible');
			$('html,body').css('overflow','visible');
			setTimeout(function(){$('html').scrollTop(scrlTop)}, 10);
		} else { // 열림
			scrlTop = $('html').scrollTop();
			// alert(scrlTop);
			$pop.addClass('visible');
			$('html,body').css('overflow','hidden');
		}
	},
	videoModify: {
		init: function(el){
			this.scrollEvt(el);
		},
		scrollEvt: function(el){
			var $listBox = $(el).find('.top_outer .list_content .list_wrap .listBox');

			//
			if( $listBox.hasScrollBar() ){
				console.log('스크롤바있음');
			} else {
				console.log('스크롤바없음');
			}

			// 바닥에 닿으면 그라데이션 사라지기
			$listBox.scroll(function() {
				var $this = $(this);
				var scrollTop = $this.scrollTop();
				var innerHeight = $this.height();
				var scrollHeight = $this.find('.inner').height();
				// console.log(scrollTop, innerHeight, scrollHeight);
				/*if (scrollTop + innerHeight >= scrollHeight-25) {
					console.log('바닥');
				} else {
					console.log('바닥아님');
				}*/
			});
		}
	},
	fileFind: {
		init: function(el){
			if( $(el).find('.txtEntry01').length ){
				this.movement(el);
			}
		},
		movement: function(el){
			$(el).find('input[type="file"]').on('change', function(){
				$(this).closest(el).find('.txtEntry01 input').val( $(this).val() );
			});
		},
	},
	/*formFocus: {
		input: function(el){
			$(document).on('focus', el+' input', function(){
				$(this).closest(el).addClass('focus');
			});
			$(document).on('focusout', el+' input', function(){
				$(this).closest(el).removeClass('focus');
			});
		},
	}*/
}





var _ScrlOption_x = {
	// theme: "light",
	axis: 'x',
	// scrollbarPosition: 'outside',
	horizontalScroll: true,
	autoHideScrollbar: false,
	advanced: {
		autoExpandHorizontalScroll: true,
		updateOnContentResize: true,
		updateOnImageLoad: true,
		updateOnSelectorChange: 'ul',
		updateOnSelectorChange: 'ul li',
	},
};
var _ScrlOption_y = {
	// theme: "light",
	axis: 'y',
	scrollbarPosition: 'outside',
	autoHideScrollbar: false,
	advanced: {
		autoExpandHorizontalScroll: true,
		updateOnContentResize: true,
		updateOnImageLoad: true,
		updateOnSelectorChange: 'ul',
		updateOnSelectorChange: 'ul li',
	},
};

