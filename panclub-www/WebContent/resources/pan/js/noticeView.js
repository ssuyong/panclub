$(document).ready(function() {

findDataToServer("/base/notice-list", 1);


	$("#btnClose").click(function() {
		//console.log("닫기");
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	
		$("#btnEdit").click(function() {
		var noticeNo = document.getElementById("noticeNo").value;
		//console.log("noticeNo" + noticeNo);
		parent.location.href= "/base/notice-up?noticeNo=" + noticeNo;
	});
	
	
	

});


function findDataToServer(url, page) {
//console.log("find in ");
	var list = [];
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
				contents = data.noticeList[0].contents;
				regYmd = data.noticeList[0].regYmd;			
				regUserName= data.noticeList[0].regUserName;
				var regUserId = data.noticeList[0].regUserId;
				var logUserId = data.noticeList[0].logUserId;


				$("#title").val(title);
				$("#contents").val(contents);
				$("#regYmd").val(regYmd);
				$("#regUserName").val(regUserName);
				//console.log("regUserId"+regUserId );
				//console.log( "logUserId"+ logUserId);
				
				
				if ( regUserId == logUserId ){
					$("#btnEdit").css("display", "block");  
				}else {
					$("#btnEdit").css("display", "none");
				}
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



