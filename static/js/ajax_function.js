	function  jq_post(url_link,qstr,divname,loadingname){
		$.ajax(
		{
		url:url_link,
		type:"post",
		data:qstr,
		cache:false,
		dataType:"text",
		success:	function(mydata){
			//alert(mydata);
				$("#"+divname).html(mydata);
				$('#'+loadingname).hide();
			}
		});
	}
	//noloading
	function  jq_post_noloading(url_link,qstr,divname){
		$.ajax(
		{
		url:url_link,
		type:"post",
		data:qstr,
		cache:false,
		dataType:"text",
		success:	function(mydata){
				$("#"+divname).html(mydata);
				//$('#'+loadingname).hide();
			}
		});
	}
	//meta push META專用 copy
	function  jq_ajax_metacopy(url_link,qstr,data){
		$.ajax(
		{
		url:url_link,
		type:"post",
		data:qstr,
		cache:false,
		dataType:"text",
		success:	function(mydata){
				$(data).parent().parent().find('li textarea').val(mydata);
			}
		});
	}
	//noloading top
	function  jq_post_block(url_link,qstr,divname,loading_name){
		width=$('#'+loading_name).css('width').replace("px","");
		height=$('#'+loading_name).css('height').replace("px","");
		$.blockUI({
		message:$('#'+loading_name),
			css:{ 
			cursor:'default',
			backgroundColor:'',
			border:'0px',
			width: width + 'px',
			height:height+ 'px',
			padding:'0px',
			top:($(window).height()-height)/2 + 'px',
			left:($(window).width()-width)/2 + 'px'
			}
		});
		$.ajax(
		{
		url:url_link,
		type:"post",
		data:qstr,
		cache:false,
		dataType:"text",
		success:	function(mydata){
				$("#"+divname).html(mydata);
				//$('#'+loadingname).hide();
				$.unblockUI();
			}
		});
	}