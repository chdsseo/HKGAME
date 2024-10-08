$(function(){
	//slideUnLock
	let isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			if(isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()) {
				return true;
			} else {
				return false;
			}
		}
	};

	// 依裝置給監聽事件
	let md, mu, mv;
	if(isMobile.any()) {
		md = 'touchstart';
		mu = 'touchend';
		mv = 'touchmove';
	} else {
		md = 'mousedown';
		mu = 'mouseup';
		mv = 'mousemove';
	}

	let $captchaArea = document.querySelector('.captchaArea');
	// create
	let sliderBtnEle = document.createElement('button');
	sliderBtnEle.type = 'button';
	sliderBtnEle.className = 'sliderBtn';
	$captchaArea.appendChild(sliderBtnEle);

	// 滑動開關
	let captchaSW = 0;
	// 點擊初始值
	let clickOrigin = 0;
    let sliderPercent = 0.75; //滑動比例即可解鎖
	let $sliderBtn = document.querySelector('.sliderBtn');

	// addEventListener
	$sliderBtn.addEventListener(md, function(e){
		e.stopPropagation();
		if(!$captchaArea.classList.contains('unlocked')) {
			captchaSW = 1;
			clickOrigin = isMobile.any() ? Math.floor(e.touches[0].clientX - $captchaArea.getBoundingClientRect().left) : e.offsetX - 1;
			$captchaArea.classList.add('unlocking');
		}
	});

	$captchaArea.addEventListener(mu, function(){
		if(captchaSW === 1) {
			initial();
		}
	});

	$captchaArea.addEventListener(mv, function(e){
		if(captchaSW === 1) {
				// 在區塊滑動值
			let caLeft = Math.round($captchaArea.getBoundingClientRect().left);
			let sliderRangeX = isMobile.any() ? Math.floor(e.touches[0].clientX - caLeft) : e.clientX - caLeft;
			// 滑動目標
			let sliderObj = $captchaArea.clientWidth - $sliderBtn.clientWidth;
			// 滑動距離
			let sliderDistance = sliderRangeX - clickOrigin;
			if (sliderDistance > (sliderObj * sliderPercent) ) {
				// 滑到目標
				sliderDistance = sliderObj;
				captchaSW = 0;
				$captchaArea.classList.remove('unlocking');
				$captchaArea.classList.add('unlocked');
				unlocked();
			} else if (sliderDistance < 0) {
				sliderDistance = 0;
				initial();
			}
			$sliderBtn.setAttribute('style', 'left:'+sliderDistance+'px;');
		}
	});

	document.addEventListener(mv, function(e){
		if(captchaSW === 1) {
			let caTop = Math.round($captchaArea.getBoundingClientRect().top);
			let touchY = isMobile.any() ? e.touches[0].clientY : e.clientY;
			if (touchY < caTop || touchY > caTop + $captchaArea.clientHeight) {
				initial();
			}
		}
	});

	function initial() {
		captchaSW = 0;
		clickOrigin = 0;
		$captchaArea.classList.remove('unlocking');
		if(!$captchaArea.classList.contains('unlocked')) {
			$sliderBtn.removeAttribute('style');
		}
	}
});