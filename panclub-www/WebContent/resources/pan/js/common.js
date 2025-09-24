var _SPINNER = null;    // 로딩바 객체 변수

/* 로딩바 보이기 */
function setStartSpinner() {

    var opts = {
          lines: 13                // The number of lines to draw
        , length: 10             // The length of each line
        , width: 12             // The line thickness
        , radius: 42             // The radius of the inner circle
        , scale: 0.4                 // Scales overall size of the spinner 원본 0.8
        , corners: 1             // Corner roundness (0..1)
        , color: '#69a2e7'         // #rgb or #rrggbb or array of colors
        , opacity: 0.25         // Opacity of the lines
        , rotate: 0             // The rotation offset
        , direction: 1             // 1: clockwise, -1: counterclockwise
        , speed: 1                 // Rounds per second
        , trail: 60             // Afterglow percentage
        , fps: 20                 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 1000000             // The z-index (defaults to 2000000000)
        , className: 'spinner'     // The CSS class to assign to the spinner
        , top: '30%'             // Top position relative to parent
        , left: '50%'             // Left position relative to parent
        , shadow: false         // Whether to render a shadow
        , hwaccel: false         // Whether to use hardware acceleration
        , position: 'fixed'     // Element positioning
    };
 
    var target = document.getElementById("spinner");
    if (_SPINNER == null) {
        _SPINNER = new Spinner(opts).spin(target);
    }
}


/* 로딩바 숨기기 */
function setStopSpinner() {
 	
   if (_SPINNER != null) {
        _SPINNER.stop();
        _SPINNER = null;
    }
}



//단어의 공백제거
function spaceDel(txt) {

	var a = txt.replace(/(^\s*)|(\s*$)/, '');
	return a ;

}    


// GET 방식으로 파라미터 받기
var getParameters = function (paramName) {
	// 리턴값을 위한 변수 선언
	var returnValue;
	
	// 현재 URL 가져오기
	var url = location.href;
	
	// get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔
	var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
	
	// 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
	for (var i = 0; i < parameters.length; i++) {
		var varName = parameters[i].split('=')[0];
		if (varName.toUpperCase() == paramName.toUpperCase()) {
			returnValue = parameters[i].split('=')[1];
			return decodeURIComponent(returnValue);
		}
	}
};

//숫자 한글롷 표기: val은 반드시 문자형으로 넘겨받아야
function _cf_numToKor(val){
    var numKor = new Array("", "일", "이", "삼", "사","오","육","칠","팔","구","십");                                  // 숫자 문자
    var danKor = new Array("", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천");    // 만위 문자열
    var result = "";
    
    if(val && !isNaN(val)){
        // CASE: 금액이 공란/NULL/문자가 포함된 경우가 아닌 경우에만 처리
       
        for(var i = 0; i < val.length; i++) {
            var str = "";
            var num = numKor[val.charAt(val.length - (i+1))];
            if(num != "")   str += num + danKor[i];    // 숫자가 0인 경우 텍스트를 표현하지 않음
            switch(i){
                case 4:str += "만";break;     // 4자리인 경우 '만'을 붙여줌 ex) 10000 -> 일만
                case 8:str += "억";break;     // 8자리인 경우 '억'을 붙여줌 ex) 100000000 -> 일억
                case 12:str += "조";break;    // 12자리인 경우 '조'를 붙여줌 ex) 1000000000000 -> 일조
            }
			
            result = str + result;
        }
        
        // Step. 불필요 단위 제거
        if(result.indexOf("억만") > 0)    result = result.replace("억만", "억");
        if(result.indexOf("조만") > 0)    result = result.replace("조만", "조");
        if(result.indexOf("조억") > 0)    result = result.replace("조억", "조");
        
        result = result + "원정";
    }
    
    return result ;
}

//부가세 계산 :결과는 공급가^부가세
function _cf_vat(vatYN,price) {

	 var SAL_AMT   = 0;
	 var SAL_PRICE = 0;
	 var SAL_VAT   = 0;
	
	 SAL_AMT = price; // 판매금액
	
	 if (vatYN == 'Y') { // 부가세포함일경우	 
		  SAL_VAT   = ((SAL_AMT/1.1)*0.1);    // 부가세(VAT)
		  SAL_PRICE = Math.round(SAL_AMT - SAL_VAT); // 단가(반올림)
		  SAL_VAT   = Math.round(SAL_VAT);    // 부가세(반올림)
	 } else if (vatYN == 'N') {// 부가미세포함일경우	 
		  SAL_VAT = 0;
		  SAL_PRICE = SAL_AMT;
	 }
	
	return SAL_PRICE + "^" + SAL_VAT;
	 //document.search_form.SAL_VAT.value = SAL_VAT;
	 //document.search_form.SAL_PRICE.value = SAL_PRICE;
}


//,형식(33,333,333)
function _cf_comma(obj){
	//var  s = parseFloat(obj.replace(/\,/g,""));
	var ns = obj.toString();
	var dp;
	
	if(isNaN(ns))
	return "";
	
	dp = ns.search(/\./);
	
	if(dp<0) 
	dp = ns.length;
	
	dp-=3;
	while(dp>0)
	{
		ns = ns.substr(0,dp)+","+ns.substr(dp);
		dp-=3;
	}
	//obj.value = ns;
	return ns;
}


// 영문대문자만 허용
function _cf_onlyUpper(obj) {
	
    $(obj).keyup(function(){		
         $(this).val($(this).val().toUpperCase().replace(/[^A-Z]/g,""));
    }); 
}

//숫자만
function _cf_onlyNumber(obj) {
    $(obj).keyup(function(){
         $(this).val($(this).val().replace(/[^0-9]/g,""));
    }); 
}

//공백, null  등 체크
var isEmpty = function(value){
  if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
    return true
  }else{
    return false
  }
};
