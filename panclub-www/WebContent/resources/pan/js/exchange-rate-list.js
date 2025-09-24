
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;




var today = new Date();
let yearAgo = new Date(today.getTime() - (730 * 24 * 60 * 60 * 1000)); // 2년전부 오늘까지
var picker = tui.DatePicker.createRangePicker({
	language: 'ko',
	startpicker: {
		date: today,
		input: '#startpicker-input',
		container: '#startpicker-container'
	},
	endpicker: {
		date: today,
		input: '#endpicker-input',
		container: '#endpicker-container'
	}
});


$(document).ready(function() {


	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);


	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if (document.location.hash) {
		var HashLocationName = document.location.hash;
		HashLocationName = decodeURI(HashLocationName.replace('#info', '')); //decodeURI 한글깨짐처리 

		var info = HashLocationName.split("!");

		scrollYN = "Y";
		//fnViewType(info[11]);
		//f_category_sub(info[0],info[1],info[2],info[3],info[4],info[5],info[6],info[7],info[8],info[9],info[10],info[11],info[12],info[13]);

		var page = info[0];
		var custType = info[1];
		var custCode = info[2];
		var custName = info[3];
		var bizNo = info[4];
		var validYN = info[5];

		//console.log("HashLocationName:"+HashLocationName);
		$("#custType").val(custType);
		$("#custCode").val(custCode);
		$("#custName").val(custName);
		$("#bizNo").val(bizNo);
		$("#validYN").val(validYN);


	} else {

	}

	$(document).keypress(function(e) {
		if (e.which == 13) {
			$('#btnFind').click();
		}
	});

	$("#btnFind").click(function() {
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;


		//alert("등록버튼");
		findDataToServer("/base/exchange-rate-list", 1);
	});

	// 데이터 요청, 요청 성공 시 AUIGrid 에 데이터 삽입합니다.
	//requestData("./data/normal_500.json");
});



// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};




// 칼럼 레이아웃 작성
var columnLayout = [
	{ dataField: "refdate", headerText: "기준일자" }
	, { dataField: "code", headerText: "외환코드" }
	, { dataField: "codeName", headerText: "외환코드명" }
	, { dataField: "buyingPrice", headerText: "현찰 살 때" }
	, { dataField: "sellingPrice", headerText: "현찰 팔 때 " }


];



// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {

	var auiGridProps = {
		editable: true,

		// 상태 칼럼 사용
		//showStateColumn : true
		// 페이징 사용		
		usePaging: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		pageRowCount: 50,

		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,
		enableCellMerge: true,
		enableFilter: true,

		showStateColumn: true,

		selectionMode: "multipleCells",
		enableFilter: true,


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


	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function(event) {
		currentPage = event.currentPage;
	});

	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function(event) {



		//

		//post형식으로 거래처등록으로 넘기기
		let f = document.createElement('form');

		let obj;
		obj = document.createElement('input');
		obj.setAttribute('type', 'hidden');
		obj.setAttribute('name', 'custCode');
		obj.setAttribute('value', event.item.custCode);

		f.appendChild(obj);
		f.setAttribute('method', 'post');
		f.setAttribute('action', '/base/cust-up');
		document.body.appendChild(f);
		f.submit();

	});

}


function findDataToServer(url, page) {
	var list = [];
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var code = $("#code").val();
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"sYmd": sYmd,
			"eYmd": eYmd,
			"code": code
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.exRateList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				for (i = 0; i < data.exRateList.length; i++) {

					list.push({
						refdate: data.exRateList[i].refdate
						, code: data.exRateList[i].code
						, codeName: data.exRateList[i].codeName
						, sellingPrice: data.exRateList[i].sellingPrice
						, buyingPrice: data.exRateList[i].buyingPrice

					});

				}
				AUIGrid.setGridData("#grid_wrap", list);
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

// 코드(코드명) 조회
function findDataToServer2(url) {
	var list = []; //자바스크립트 배열선언
	var listS;
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {
			if (data.codeList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {
				var j = 0;
				for (i = 0; i < data.codeList.length; i++) {
					if (data.codeList[i].mCode == "1000") {
						code = data.codeList[i].code;
						codeName = data.codeList[i].codeName;

						list[j] = { "code": code, "value": codeName };
						j = j + 1;
					}
				}

			}

			listS = JSON.stringify(list); //JSON 형식을 변환해줌!!!




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

	return listS; // 리턴을 바깥에서 해야함 

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


// PDF 내보내기(Export), AUIGrid.pdfkit.js 파일을 추가하십시오.
function exportPdfClick() {

	// 완전한 HTML5 를 지원하는 브라우저에서만 PDF 저장 가능( IE=10부터 가능 )
	if (!AUIGrid.isAvailabePdf(myGridID)) {
		alert("PDF 저장은 HTML5를 지원하는 최신 브라우저에서 가능합니다.(IE는 10부터 가능)");
		return;
	}

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

};




function addRow(grid, rowPos) {
	var item = new Object();

	AUIGrid.addRow(myGridID, item, rowPos);
};
function removeRow() {

	AUIGrid.removeRow(myGridID, "selectedIndex");
};



function checkItems() {

	// 추가된 행 아이템들(배열)
	var addedRowItems = AUIGrid.getAddedRowItems(myGridID);

	// 수정된 행 아이템들(배열) : 진짜 수정된 필드만 얻음.
	var editedRowItems = AUIGrid.getEditedRowColumnItems(myGridID);

	// 수정된 행 아이템들(배열) : 수정된 필드와 수정안된 필드 모두를 얻음.
	//var editedRowItems = AUIGrid.getEditedRowItems(myGridID); 

	// 삭제된 행 아이템들(배열)
	var removedRowItems = AUIGrid.getRemovedItems(myGridID);

	var i, len, name, rowItem;
	var str = "";

	if (addedRowItems.length > 0) {
		str += "---추가된 행\r\n";
		for (i = 0, len = addedRowItems.length; i < len; i++) {
			rowItem = addedRowItems[i]; // 행아이템
			// 전체 조회
			for (var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";
			}
			str += "\r\n";
		}
	}

	if (editedRowItems.length > 0) {
		str += "---수정된 행\r\n";
		for (i = 0, len = editedRowItems.length; i < len; i++) {
			rowItem = editedRowItems[i]; // 행아이템

			// 전체 조회
			for (var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";
			}
			str += "\r\n";
		}
	}

	if (removedRowItems.length > 0) {
		str += "---삭제된 행\r\n";
		for (i = 0, len = removedRowItems.length; i < len; i++) {
			rowItem = removedRowItems[i]; // 행아이템
			// 전체 조회
			for (var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";
			}
			str += "\r\n";
		}
	}

	$("#desc_info").html("추가 개수 : " + addedRowItems.length + ", 수정 개수 : " + editedRowItems.length + ", 삭제 개수 : " + removedRowItems.length);


	if (str == "")
		str = "변경 사항 없음";

	alert(str);
}


// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;


//다이얼로그창 선택하는 경우 그리드에 디스플레이 정동근 추가
function updateGridRow() {
	var mCodeSel = $("#mCode option:selected"); //$("#memberSel option:selected").text();
	var mCode = mCodeSel.val();
	var mName = mCodeSel.attr('mname');

	//console.log(currentRowIndex);
	//console.log(decodeURI(mName));

	var item = {};
	item.divisionCode = mCode; // $("#name").val();
	item.divisionName = decodeURI(mName); //$("#country").val();
	//item.memo = '';

	AUIGrid.updateRow(myGridID, item, currentRowIndex);

	var dialog;
	dialog = $("#dialog-form");


	dialog.dialog("close");
}







