
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function() {
	


	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);

findDataToServer("/base/notice-list", 1);

	var srch = $("#srch").val();
	//console.log("srch:"+srch);
	if (srch == "Y") {
		findDataToServer("/base/notice-list", 1);
	}


	/*$("#btnFind").click(function() {
		//alert("등록버튼");
		findDataToServer("/base/notice-list", 1);*/
		
		
	});


// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};
                  




// 칼럼 레이아웃 작성
var columnLayout = [
	//{ dataField: "noticeNo", headerText: "글번호", width: 380 }
	{ dataField: "fixYNCode", headerText: "구분코드", width: 0}
	,{ dataField: "fixYNName", headerText: "구분", width: 130 }
	,{ dataField: "title", headerText: "제목", width: 885, style:"left" }
	//, { dataField: "contents", headerText: "내용", width: 824 }
	, { dataField: "notiYmd", headerText: "공지일자", width: 325 }
	, { dataField: "regUserName", headerText: "작성자", width: 300 }
	, { dataField: "validYN", headerText: "게시여부", width: 0 }

];



// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {

	var auiGridProps = {
		//editable : true,			

		// 상태 칼럼 사용
		//showStateColumn : true
		// 페이징 사용		
		usePaging: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		pageRowCount: 50,

		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,
		enableFilter: true,

		selectionMode: "multipleCells",

	};


	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);

	var rowPos = 'first';

	// 선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell;

		// 하단에 행인덱스, 헤더 텍스트, 수정 가능여부 출력함.
		//document.getElementById("selectionDesc").innerHTML = "현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ) : editable : " + primeCell.editable + ", 행 고유값(PK) : " + primeCell.rowIdValue;
	});

	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function(event) {
		currentPage = event.currentPage;
	});
	
	// $(fixIco).attr("src", "img/important.png");
	
	

	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function(event) {
		var noticeNo = event.item.noticeNo;
		if (1 == 1) {
			//console.log("contents:"+contents); 
			$.fancybox.open({
				href: '/base/noticeView?noticeNo=' + noticeNo,
			              	type: 'iframe',
				width: '90%',
				height: '90%',
				padding: 0,
				fitToView: false,
				autoSize: false,
				modal: true
			});
		}
	});
}

function findDataToServer(url, page) {
	var list = [];
	var title = $("#title").val();
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"title": title,
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			if (data.noticeList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				for (i = 0; i < data.noticeList.length; i++) {
					//console.log("noticeList : " + JSON.stringify(data.noticeList));			
			
					var fixYNN='';
					if (data.noticeList[i].fixYN=='Y'){
						fixYNN = "[중요]"
					}else{data.noticeList[i].fixYN=='N'
						fixYNN=""
					}; 
					
					
					list.push({
						noticeNo: data.noticeList[i].noticeNo
						,title: data.noticeList[i].title
						,fixYNCode: data.noticeList[i].fixYN
						,fixYNName: fixYNN
						,notiYmd: data.noticeList[i].notiYmd
						,regUserName: data.noticeList[i].regUserName
						, contents: data.noticeList[i].contents
						, regYmd: data.noticeList[i].regYmd
						,uptYmd: data.noticeList[i].uptYmd
						,regUserName: data.noticeList[i].regUserName
						,validYN: data.noticeList[i].validYN
					});
					
								}
				AUIGrid.setGridData("#grid_wrap", list);
				//console.log("list page:"+page);
				// 해당 페이지로 이동
				if (page > 1) {
					AUIGrid.movePageTo(myGridID, Number(page));
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


// AUIGrid 의 현재 칼럼 레이아웃을 얻어 보관합니다.
// 데모에서는 HTML5의 localStrage 를 사용하여 보관합니다.
// 만약 DB 상에 보관하고자 한다면 해당 정보를 Ajax 요청으로 코딩하십시오.
function saveColumnLayout() {

	// 칼럼 레이아웃 정보 가져오기
	var columns = AUIGrid.getColumnLayout(myGridID);

	if (typeof (Storage) != "undefined") { // Check browser support
		var columnStr = JSON.stringify(columns);
		var rowPos = AUIGrid.getRowPosition(myGridID); // 수직 스크롤 값
		var hPos = AUIGrid.getProp(myGridID, "hScrollPosition"); // 수평 스크롤 값(픽셀)

		localStorage.setItem("auigridLayout", columnStr);
		localStorage.setItem("auigridRow", rowPos);
		localStorage.setItem("auigridCol", hPos);

		//alert("현재 그리드의 상태가 보관되었습니다.\r\n브라우저를 종료하거나 F5 로 갱신했을 때 현재 상태로 그리드가 출력됩니다.");
	} else {
		//alert("localStorage 를 지원하지 않는 브라우저입니다.");
		return;
	}
};



// PDF 내보내기 속성
var exportProps = {

	// 폰트 지정
	fontPath: "/resources/pdfkit/jejugothic-regular.ttf",

	// 저장하기 파일명
	fileName: "거래처 내역",

	// 헤더 내용
	headers: [{
		text: "", height: 20 // 첫행 빈줄
	}, {
		text: "거래처 내역", height: 24, style: { fontSize: 20, textAlign: "center", underline: true, background: "#DAD9FF" }
	}, {
		text: "작성자 : 에이유아이", style: { textAlign: "right" }
	}, {
		text: "작성일 : 2022. 03. 29", style: { textAlign: "right" }
	}, {
		text: "", height: 5, style: { background: "#555555" } // 빈줄 색깔 경계 만듬
	}],

	// 푸터 내용
	footers: [{
		text: "", height: 5, style: { background: "#555555" } // 빈줄 색깔 경계 만듬
	}, {
		text: "참고 : 문의 사항은 전산팀으로 연락 하십시오.", style: { fontSize: 15, color: "#2F9D27" }
	}, {
		text: "Copyright © AUISoft", height: 24, style: { textAlign: "right", color: "#ffffff", background: "#222222" }
	}]
};

// 내보내기 실행
//AUIGrid.exportToPdf(myGridID, exportProps);
AUIGrid.exportToPdf(myGridID, {
	// 폰트 경로 지정 (반드시 지정해야 함)
	fontPath: "/resources/pdfkit/jejugothic-regular.ttf"
});



