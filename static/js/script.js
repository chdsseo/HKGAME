function mod_data_post(){
	var act;
		act=confirm("確定這些資料要做處理?");
		if(act){
			document.modchk=true;
		}else{
			document.modchk=false;
		}
}

//檢查欄位是否為英文字
function checktexteng(fieldname,msg){
	txt=fieldname.value;
	if(txt!=''){
		if(txt.match(/[^a-z|^A-Z]/g))
		{
			fieldname.focus();
			alert(msg);
			//fieldname.value='';
			//fieldname.focus();
		}
	}
}

function show_day(getdate,pushday){
	 var WeekDay = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
	 if(getdate.value!=''){
	 	pushday.value=WeekDay[parseInt(new Date(getdate.value).getDay())];	
	 }
}
function btn_mod_data_post(formname){
	var act;
	act=confirm("確定要執行?");
	if(act){
		document.forms[formname].submit();
		return true;
	}else{
		$.unblockUI();
		return false;
	}
}
//檢查email格式
function isEmail(email){
	if (email=="") return true;
	reEmail=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
	return reEmail.test(email);
}
//將數字做格式化
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
function checkimgtype(filename,typelist){//檢查圖片格式,filename 是欄位名稱,typelist是可以通過的格式 用 , 分隔
	if(filename=="" || typelist=="") return false;
	var typelist=typelist.toLowerCase().split(',');
	var pass_status=1;//0是no pass 1是 pass
	$('INPUT[name="'+filename+'"]').each(function(index, element) {
		if($(this).val()!=""){
			var filename_chg = $(this).val().toLowerCase();
			chk_type_txt="";
			var  setchk="jpg|gif";
			if(typelist.length>0) setchk="";
			if(typelist.length>0) var chk_type_txt=typelist.join("|");
			if(setchk.length>0) setchk="|"+setchk;
			var re = eval("/\.("+chk_type_txt+setchk+")$/i"); 
			pass_status=0;
			//console.log(re);
			if(re.test(filename_chg))pass_status=1;
			//console.log(pass_status);
		}
    });
	//console.log(pass_status);
	return pass_status;
}
function chk_field_fun(){//檢查欄位格式是否有填寫或是正確
	var error=0;
	var errmsg="";
	$(".formTable input").removeProp("style");
	$(".formTable input[data-fieldtype]").each(function(index, element) {
		//console.log($(this).data("fieldtype")+"-"+$(this).data("enter"));
		if($(this).data("enter")=="1" && $(this).val()==""){
			$(this).css({'border' : '#F00 2px solid'});
			errmsg=errmsg+"<br>--"+$(this).parents('.row').find("label").text().replace("：", "")+"欄位必須填寫"; 
			//console.log($(this).parents('.row').find("label").text());
			error=1;
		}else{
			switch($(this).data("fieldtype")){
				case "email":
				if(! isEmail($(this).val())){
					$(this).css({'border' : '#F00 2px solid'});
					errmsg=errmsg+"<br>--"+$(this).parents('.row').find("label").text().replace("：", "")+"欄位必須填寫正確格式"; 
					//console.log($(this).parents('.row').find("label").text());
					error=1;
				}
				break;
				case "int_number"://整數
				if($(this).val().match(/[^0-9]/g)){ 
					$(this).css({'border' : '#F00 2px solid'});
					errmsg=errmsg+"<br>--"+$(this).parents('.row').find("label").text().replace("：", "")+"欄位必須填寫整數數值"; 
					//console.log($(this).parents('.row').find("label").text());
					error=1;
				}
				break;
				case "float_number"://數值包含小數
				if($(this).val().match(/[^.|^0-9]/g)){ 
					$(this).css({'border' : '#F00 2px solid'});
					errmsg=errmsg+"<br>--"+$(this).parents('.row').find("label").text().replace("：", "")+"欄位必須填寫數值"; 
					//console.log($(this).parents('.row').find("label").text());
					error=1;
				}
				break;
				case "test_eng_num"://檢驗欄位除了數字及英文以外不可有其他符號
				var re = /^[\d|a-zA-Z0-9]+$/;
				if($(this).val()!=''){
					if(! re.test($(this).val())){ 
						$(this).css({'border' : '#F00 2px solid'});
						errmsg=errmsg+"<br>--"+$(this).parents('.row').find("label").text().replace("：", "")+"欄位必須填寫英文字母或數字"; 
						//console.log($(this).parents('.row').find("label").text());
						error=1;
					}
				}
				break;
                case "password_field"://檢驗欄位除了數字及英文以外不可有其他符號
                var re = /([^A-Za-z0-9!_+*]+)/;
                if($(this).val()!=''){
                    if(re.test($(this).val())){
                        $(this).css({'border' : '#F00 2px solid'});
                        errmsg=errmsg+"<br>--"+$(this).parents('.row').find("label").text().replace("：", "")+"欄位必須填寫英文字母或數字(可包含!_+*符號)";
                        //console.log($(this).parents('.row').find("label").text());
                        error=1;
                    }
                }
                break;
				case "file":
				var file_check_type=$(this).data("fileext")!=""?$(this).data("fileext"):"jpg,png,gif,doc,docx,pdf";
				if(! checkimgtype($(this).prop("name"),file_check_type)){
					$(this).css({'border' : '#F00 2px solid'});
					errmsg=errmsg+"<br>--"+$(this).parents('.row').find("label.col-1").text().replace("：", "")+"檔案格式必須為"+file_check_type+""; 
					error=1;
				}
				break;
				case "blink":
				// var uri_pattern = /[-\/\\^$*+?.()|[\]{}]/g;
				var re = /[\/\\^$*';:@&=,%#+?.()|[\]! ]/g;
				var error_chr="";
				var check_arr=$(this).val().match(re);
				if(check_arr){ 
					$(this).css({'border' : '#F00 2px solid'});
					for (var i=0;i<check_arr.length;i++){
						error_chr+=check_arr[i]==" "?"空白符號":check_arr[i]+(i<check_arr.length-1?" , ":"");
					}
					errmsg=errmsg+"<br>--"+$(this).parents('.row').find("label").text().replace("：" , "")+"欄位不得有特殊字元："+error_chr; 
					error=1;
				}
				break;
			}
		}
    });
	if(error==1){
		return errmsg;
	}else{
		return "";
	}
}
function errordialog(msg){
	parent.$("#dialogMask h6").html('<i class="fa fa-exclamation-triangle"></i> 錯誤訊息');
	parent.$("#dialogMask div.Txt").html(msg);
	parent.$(".dialog_top_pop").trigger("click");
}
var msgtimer = 0;
function msgdialog(msg,times=1500){
	if(times>0) window.clearTimeout(msgtimer);
	parent.$("#dialogMask h6").html('<i class="fa fa-exclamation-triangle"></i> 系統訊息');
	parent.$("#dialogMask div.Txt").html(msg);
	parent.$(".dialog_top_pop").trigger("click");
	if(times>0) msgtimer = setTimeout($.unblockUI, times);
}
function checkCreditCard(formValue){
    re = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if (!re.test(formValue.value))
        alert("你的信用卡號碼不符合「xxxx-xxxx-xxxx-xxxx」的格式！");
}
function checkID(formValue){    
	re = /^[AFC][0-9]{9}$/;
    if (!re.test(formValue.value))
        alert("你的身份證號碼格式不對！");
}
function checkMoblie(formValue){
   	re = /^[09]{2}[0-9]{8}$/;
    if (!re.test(formValue)){
        //alert("你的發票號碼格式不對！");
		return false;
	}else{
		return true;	
	}
}
function checkinvoice(formValue){//發票號碼
	re = /^[A-Za-z]{2}[0-9]{8}$/;
    if (!re.test(formValue)){
        //alert("你的發票號碼格式不對！");
		return false;
	}else{
		return true;	
	}
}
function eval_int_number(fieldname){
	if(fieldname.value.match(/[^0-9]/g)){ 
		alert('欄位值必須為數字!!');
		fieldname.value='';
		fieldname.focus();
	}
}
function eval_float_number(fieldname){
	if(fieldname.value.match(/[^.|^0-9]/g)){ 
		alert('欄位值必須為數字!!');
		fieldname.value='';
		fieldname.focus();
	}
}