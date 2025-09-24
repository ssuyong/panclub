
//$(function() {

//	$("#login_auto_lb").click(function() {
//		$(".agree_ck").toggleClass("click_on");
//	});

//	//아이디저장
//	$("#memberid_save_lb").click(function() {
//		$(".agree_ck2").toggleClass("click_on");
//	});

//});

function flogin_submit(f) {
	setStartSpinner();
	//자동로그인 체크값 확인하고 히든에 값 입력
	if ($("#agree_ck").hasClass("click_on")) {
		//alert("자동로그인 체크 O");
		$("#hid_autolog_save").val("SaveOK")
	} else {
		//alert("자동로그인 체크 X");
		$("#hid_autolog_save").val("SaveNO")
	}

	//아이디저장 체크값 확인하고 히든에 값 입력
	//alert("아이디 체크박스");
	if ($("#agree_ck2").hasClass("click_on")) {
		//alert("아이디저장 체크 O");
		$("#hid_memberID_save").val("SaveOK")
	} else {
		//alert("아이디저장 체크 X");
		$("#hid_memberID_save").val("SaveNO")
	}

	return true;
}



function comCodeCheck() {
	var comCod = document.getElementById("comCode").value;
	if (comCod.length < 4 || comCod.length > 20) {
		alert("회사코드는 4~20자리 입니다.");
		console.log(comCod);
		document.getElementById("comCode").value = "";
	}

}


function chkComCode() {
	if (document.getElementById("comCode").value == "") {
		document.getElementById("comCodeAlert").innerText = "회사코드를 입력하세요";
		return false;

	}
}

function openWin() {
	var url = "/signinGuide";
	var title = "";
	var prop = " top= 50px, left= 100px, width= 450px, height= 380px";
	window.open(url, title, prop);
}

/*비밀번호 보이기 설정  */
function togglePw() {
	var upw = document.getElementById("pw1");
	if (upw.type === "password") {
		upw.type = "text";
	}
	else {
		upw.type = "password"
	}
};

// 쿠키로 아이디 저장하기

//var saveIdbtn = document.getElementById("saveId");

/*function saveCookie() {
	if ($('#saveId').is(':checked')) {
		var id = document.getElementById("uid").value;
		setCookie("id", id, 30);
		console.log("id cookie saved");
	} else {
		deleteCookie("id");
		console.log("id cookie deleted");
	}
}
*/

function setCookie(cookieName, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var cookieValue = escape(value)
		+ ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
	document.cookie = cookieName + "=" + cookieValue + "; path=/; expires=" + exdate.toUTCString();
	 var comcodeValue = escape('your_comcode_value') + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
  document.cookie = "comcode=" + comcodeValue + "; path=/; expires=" + exdate.toUTCString();
}


// 쿠키 삭제
function deleteCookie(cookieName) {
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() - 1);
	document.cookie = cookieName + "= " + "; expires="
		+ expireDate.toGMTString();
}

// 쿠키 가져오기
function getCookie(cookieName) {
	cookieName = cookieName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cookieName);
	var cookieValue = '';
	if (start != -1) { // 쿠키가 존재하면
		start += cookieName.length;
		var end = cookieData.indexOf(';', start);
		if (end == -1) // 쿠키 값의 마지막 위치 인덱스 번호 설정 
			end = cookieData.length;
		//console.log("end위치  : " + end);
		cookieValue = cookieData.substring(start, end);
	}
	return unescape(cookieValue);
}          

$(function(){
	//로그인 화면으로 오면 브라우저세션데이터 제거
	sessionStorage.clear()
    /* id 저장 체크박스 기능 추가 */
    var userInputId = getCookie("userInputId");//저장된 쿠기값 가져오기
    var userInputComcode = getCookie("userInputComcode");
    
    $("#uid").val(userInputId); 
    $("#comCode").val(userInputComcode);
    

    if($("#uid").val() != ""){ // 그 전에 ID를 저장해서 처음 페이지 로딩
        $("#saveId").attr("checked", true); // ID 저장하기를 체크 상태로 두기.
    }

    $("#saveId").change(function(){ // 체크박스에 변화가 발생시
        if($("#saveId").is(":checked")){ // ID 저장하기 체크했을 때,
            var userInputId = $("#uid").val();
            setCookie("userInputId", userInputId, 180);
            var userInputComcode = $("#comCode").val();
            setCookie("userInputComcode", userInputComcode, 180);
         
          //6개월 동안 쿠키 보관
        }else{ // ID 저장하기 체크 해제 시,
            deleteCookie("userInputId");
            deleteCookie("userInputComcode");
        }
    });
    
    
    //모바일로그인 체크 상태 변동에 따라 쿠키 생성 / 삭제함
    $("#mobileLogin").change(()=>{
    	if($("#mobileLogin").is(":checked"))	
	    	setCookie("mobileLogin", true , 180);
	    else 
	   		deleteCookie("mobileLogin");  
    });
    //쿠키가 존재하면 쿠키값으로 초기화
    $("#mobileLogin").prop('checked', getCookie("mobileLogin"));

    // ID 저장하기를 체크한 상태에서 ID를 입력하는 경우, 이럴 때도 쿠키 저장.
//    $("#uid").keyup(function(){ // ID 입력 칸에 ID를 입력할 때,
//        if($("#saveId").is(":checked")){ // ID 저장하기를 체크한 상태라면,
//            var userInputId = $("#uid").val();
//            setCookie("userInputId", userInputId, 180); // 6개월 동안 쿠키 보관
//        }
//    });


	//20231207 supi 로그인 버튼 클릭시, 저장하기 체크 되어 있을때만 저장하게 변경
    $("#loginbtn").click(function(){
		if($("#saveId").is(":checked")){ // ID 저장하기를 체크한 상태라면,
            var userInputId = $("#uid").val();
            setCookie("userInputId", userInputId, 180); // 6개월 동안 쿠키 보관
            var userInputComcode = $("#comCode").val();
            setCookie("userInputComcode", userInputComcode, 180); 
        }
	});
});


