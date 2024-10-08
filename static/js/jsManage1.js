// JavaScript Document
	$(function(){
		
		//submenu
		$('.dropDown').hover(function(){
			$(this).find('.submenu').addClass('show');
		},function(){
			$(this).find('.submenu').removeClass('show');
		});

		
		//mobile menu
		var $m_menu = $('ul.menu').clone();
		var $top_m_menu = "" ;				
		$m_menu.insertAfter('.m_menu .hideBox p.sp_menu').removeClass().addClass('nav').end().append($top_m_menu).children('a').wrap('<li/>').end().find('li.dropDown').each(function(){
			$(this).children('a').removeClass().append('<i class="fa fa-angle-down" />').attr('href','');
		});	
		$('.m_menu').find('ul.subList li').children('b').click(function() {
		$(this).next('.listIns').slideToggle();
		})						
		$('.m_menu').find('a.main').click(function(){
			if(!$(this).parents('.m_menu').hasClass('active')){
				$(this).parents('.m_menu').addClass('active');
				$(this).addClass('show');
				$('.m_menu').find('.mask').fadeIn(100);
				$('.m_menu').find('.hideBox').fadeIn(100);
				$('body').css('overflow','hidden');
				$('.m_menu').find('.mask').click(function(){/*點空白處收起menu*/
					$('.m_menu').removeClass('active');
					$('.m_menu').find('.hideBox').fadeOut();
					$('.m_menu').find('.mask').fadeOut();
				});
			}else{
				$(this).parents('.m_menu').removeClass('active');
				$(this).removeClass('show');
				$('.m_menu').find('.mask').fadeOut();
				$('.m_menu').find('.hideBox').fadeOut();
				$('body').css('overflow','auto');
			}//end if hasClass
						
			return false;
		});
		$('.m_menu').find('li.dropDown').children('a').click(function(){
			$(this).siblings().slideToggle();
			return false;
		});


$('.m_menu').find('li.investother').find('.submenu ul.subList').prepend('<li><a href="http://'+location.hostname+'/igs/investors/">投資人關係首頁</a></li>');
		

		//mobile classLink
		var $clone = $('ul.classLink').clone().removeClass('classLink'),
			  $current_txt = $('ul.classLink').find('.current').text();
		$('ul.classLink').after('<div class="m_classLink"><a class="main"><b></b><i class="fa fa-angle-down"></i></a></div>');
		$('.m_classLink').append($clone).end().find('a.main b').text($current_txt);
		
		$('.m_classLink').click(function(){
			if($(this).hasClass('open')){
				$(this).removeClass('open').find('ul').stop().slideUp(200);
				$(this).find('a.main').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
			}else{
				$(this).addClass('open').find('ul').stop().slideDown(200);
				$(this).find('a.main').find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
			}
		});
		

		//year
		$('.yearLink').each(function() {

			var $yearClone       = $('ul.yearLink').clone().removeClass('yearLink'),
			    $yearCurrent_txt = $('ul.yearLink').find('.current').text();

			$('ul.yearLink').after('<div class="m_yearLink"><a class="main"><b></b><i class="fa fa-angle-down"></i></a></div>');
			$('.m_yearLink').append($yearClone).end().find('a.main b').text($yearCurrent_txt);

		});

		//classYear
		$('.classYear').each(function() {
			var $classCurrent_txt = $('.classYear').find('.current').text();
			$('.classYear').find('a.main b').text($classCurrent_txt);
		});

		

		$('.m_classLink, .m_yearLink, .classYear').click(function(){
			if($(this).hasClass('open')){
				$(this).removeClass('open').find('ul').stop().slideUp(200);
				$(this).find('a.main').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
			}else{
				$(this).addClass('open').find('ul').stop().slideDown(200);
				$(this).find('a.main').find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
			}
		});

		//languageArea
		$(".languageArea").click(function(){
		  $(this).find('ul').slideDown(300);
		  });

		$(".languageArea").mouseleave(function(){
		  $(this).find('ul').slideUp(300);
		  });

		$(".header-languageArea").click(function(){
		  $(this).find('ul').slideDown(300);
		  });

		$(".header-languageArea").mouseleave(function(){
		  $(this).find('ul').slideUp(300);
		  });

		$('.m_menu').find('.m_languageArea').click(function(){
			  $(this).find('ul').slideToggle(500);
		  });


		//mailLink
		$('.contactLink').click(function(){
			if(isMobile){
				var href = $(this).data('mail');
				window.location.href= 'mailto:'+href;
				return false;
			}
		});

		//gotop
		$('.goTop').click(function(){
			$('body,html').stop().animate({scrollTop:0});
			return false;
		});

		
		$(window).load(function() {
			$('.horizontalTable').append('<div class="m_horizontalTable"></div>');
			$('.horizontalTable table tr').each(function() {
				var tdTxt     = $(this).children().first().text(),
					tdWidth   = $(this).children().first().outerWidth(),
				    trHeight  = $(this).outerHeight();
				$('.m_horizontalTable').append('<div class="cloned"' + 'style= width:' + tdWidth + 'px;height:' + trHeight + 'px' + '>' + tdTxt + '</div>');
			})

		});

});