var datepicker = new tui.DatePicker('#wrapper', {
	language: 'ko',
	date: new Date(),
	input: {
		element: '#notiYmd',
		format: 'yyyy-MM-dd'
	}
});

$(document).ready(function() {
	
	//console.log("notice in ");
	//var srch = $("#srch").val();
	//console.log("srch:"+srch);
	//console.log("title"+title);
	
	var noticeNo = $("#noticeNo").val();
	//console.log ("noticeNo"+noticeNo);
   if (noticeNo != 0 && noticeNo != "") {
	   //console.log("nnno:"+noticeNo);
  		findDataToServer("/base/notice-list");
  	}else{
		$("#noticeNo").val("");
	}	
	var fixYN = $("#fixYN").val();
	if (fixYN =="Y"){
		$("input:checkbox[id='fixYN']").prop("checked", true) ;
		$("#selfixSeq").show();
	}else{
			$("input:checkbox[id='fixYN']").prop("checked", false); 
	}
	
	var validYN = $("#validYN").val();
	if (validYN =="Y"){
		$("input:checkbox[id='validYN']").prop("checked", true) ;}
		else{
			$("input:checkbox[id='validYN']").prop("checked", false) ;
		}
	
	
 
//  console.log("nno:"+noticeNo);
 // return; 

//수정 버튼 활성화	
	//if ($("#noticeNo1").val() != 0){
	if (noticeNo != 0  && noticeNo != ""){
		//console.log("check in");
		document.getElementById('btnUpt').classList.toggle('disabled'); 
		document.getElementById('btnDel').classList.toggle('disabled');
		document.getElementById('btnReg').classList.toggle('disabled'); 
	}
		
	
		
	$("#supplyInfo-title").css("display", "none");
	$("#supplyInfo-input").css("display", "none");
	//$("#noticeNo").val(createNoticeNo());

   
	//textarea 높이 자동설정
	$('textarea').on('keyup', function(e) {
		$(this).css('height', 'auto');
		$(this).height(this.scrollHeight - 15);
	});

/*	// 파일 첨부하기
	$("#uploadBtn").on("click", function(e) {
		var formData = new FormData();
		var inputFile = $("input[name='uploadFile']");
		var files = inputFile[0].files;
		console.log(files);
	}

	)*/

	//등록버튼 활성화, 수정/삭제 활성화
	//document.getElementById('btnUpt').classList.toggle('disabled'); 
	//document.getElementById('btnDel').classList.toggle('disabled');

	$("#btnReg").click(function() {
		//alert("등록버튼");
		updateDataToServer("/base/noticeAdd", "ADD");
	});
	$("#btnUpt").click(function() {
		//alert("수정버튼");
		console.log("noticeNo"+noticeNo)
		updateDataToServer("/base/noticeAdd", "UPT");
	});
	$("#btnDel").click(function() {
		//alert("삭제버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.주문을 삭제하시겠습니까?")) {
			updateDataToServer("/base/noticeAdd", "DEL");
		}
	});

//var contents = $("#contents").val().replace("\r\n","<br>");
});



//고정버튼 선택 시 고정순번 정하기 	
$("#fixYN").click(function() {
	if ($("#fixYN").is(":checked") == true && $("#selfixSeq").css("display") == "none") {
		$("#selfixSeq").show();
	}
	else { $("#selfixSeq").hide(); }
})

/*function getItem(){
 $("#fixSeq option:selected").val()
 console.log($("#fixSeq option:selected").val())
}*/

/*	function chk(){	
		var noticeNo = $("#noticeNo1").val();
		if (noticeNo > 0){
		findDataToServer("/base/notice-list");}
		else { location.href= "/base/notice-up"};
	}
*/





// 데이터 서버로 보내기

function updateDataToServer(url, workingType) {

	//var workingType;
	var notiYmd = $("#notiYmd").val();
	//var regUserId = $("#regUserId").val();
	var title = $("#title").val();
	//var contents = $("#contents").val();
	var contents = $("#contents").val();//.replace(/(\n|\r\n)/g,'<br>');
	var noticeNo = $("#noticeNo").val();
	/*
	if ($("#noticeNo").text() != '') {
		workingType = "UPT"
		noticeNo = $('#noticeNo').val();
	} else {
		workingType = "ADD"
		//noticeNo = createNoticeNo();
	}
	
	var fixYN = [];
	$("input[name='fixYN']:checked").each(function(i) {
		fixYN.push($(this).val());
	});
*/
	var fixYN = "N";
	if ($("#fixYN").is(":checked") == true) {
		fixYN = "Y";
	}
	var validYN = "N";
	if ($("#validYN").is(":checked") == true) {
		validYN = "Y";
	}
	
	var fixSeq = $("#fixSeq option:selected").val();

	if (title == '' || title == null) { alert("제목은 필수 입력해야 합니다."); $("#title").focus(); return; }
	if (contents == '' || contents == null) { alert("내용은 필수 입력해야 합니다."); $("#contents").focus(); return; }

	var data = {};

	data.workingType = workingType;
	data.noticeNo = noticeNo;
	data.notiYmd = notiYmd;
	//data.regUserId = regUserId;
	data.title = title;
	data.contents = contents;
	data.fixYN = fixYN;
	data.fixSeq = fixSeq;
	data.validYN = validYN;
    
	//console.log("data:" + JSON.stringify(data));
	//console.log("url:" + url);

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		//data: JSON.stringify(data),
		data: JSON.stringify(data),
		success: function(data) {
			//alert("성공:"+data.success);
			// console.log("data.estiNo:"+data.estiNo);
			alert(data.result_code + ":" + data.result_msg);
			location.href = "/base/notice-list?srch=Y";
			//alert(data.estiNo)
			//location.reload();

		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

};


//function getItem(){
//	$("#fixSeq option:selected").val()
//	console.log($("#fixSeq option:selected").val())
//}
//


/*function createNoticeNo() {
	var lastNoticeNo = findLastNoticeNo();
	let newNoticeNo = lastNoticeNo + 1;

	return newNoticeNo;
}*/

/*function findLastNoticeNo() {
	var No;
	var url = "/base/notice-list";
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.noticeList.length == 0) {
				No = "11112233001"
			} else {
				No = data.noticeList[data.noticeList.length - 1].noticeNo;
			}
		},
		error: function(x, e) {
			if (x.status == 0) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)');
			} else if (x.status == 404) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Requested URL not found.)');
			} else if (x.status == 500) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Internel Server Error.)');
			} else if (e == 'parsererror') {
				alert('시간경과로 로그아웃되었습니다.\n재로그인 후  다시 조회하세요.\n(Error.nParsing JSON Request failed.)');
			} else if (e == 'timeout') {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Request Time out.)');
			} else {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Unknow Error.n' + x.responseText + ')');
			}
		}
	});
	return No;
}*/

//  조회
function findDataToServer(url, page) {
	//console.log("find in ");
	//var noticeNo = $("#noticeNo1").val();
	var noticeNo = $("#noticeNo").val();


	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"noticeNo": noticeNo,
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			//console.log("lengh:"+data.length);
			if (data.noticeList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				title = data.noticeList[0].title;
				fixYN = data.noticeList[0].fixYN;
				notiYmd = data.noticeList[0].notiYmd;	
				contents = data.noticeList[0].contents;	
				uptYmd = data.noticeList[0].uptYmd;			
				regUserName= data.noticeList[0].regUserName;
				fixSeq = data.noticeList[0].fixSeq;	
				validYN = data.noticeList[0].validYN;	
				//console.log("fixSeq1111111 : " + data.noticeList[0].fixSeq )

				$("#title").val(title);
				$("#fixYN").val(fixYN);
				$("#notiYmd").val(notiYmd);
				$("#contents").val(contents);
				$("#uptYmd").val(uptYmd);
				$("#regUserName").val(regUserName);
				$("#fixSeq").val(fixSeq);
				$("#validYN").val(validYN);
				

			}
		},
		error: function(x, e) {
			if (x.status == 0) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)');
			} else if (x.status == 404) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Requested URL not found.)');
			} else if (x.status == 500) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Internel Server Error.)');
			} else if (e == 'parsererror') {
				alert('시간경과로 로그아웃되었습니다.\n재로그인 후  다시 조회하세요.\n(Error.nParsing JSON Request failed.)');
			} else if (e == 'timeout') {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Request Time out.)');
			} else {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Unknow Error.n' + x.responseText + ')');
			}
		}
	});

}







