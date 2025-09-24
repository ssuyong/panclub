
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function() {


	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);

	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if (document.location.hash) {
		var HashLocationName = document.location.hash;
		HashLocationName = decodeURI(HashLocationName.replace('#info', '')); //decodeURI 한글깨짐처리 

		var info = HashLocationName.split("!");

		scrollYN = "Y";

		var page = info[0];
		var makerCode = info[1];
		var itemNo = info[2];
		var itemName = info[3];
		var itemId = info[4];
		var classCode = info[5];


	
		$("#makerCode").val(makerCode);
		$("#itemNo").val(itemNo);
		$("#itemName").val(itemName);
		$("#itemId").val(itemId);
		$("#classCode").val(classCode);

		findDataToServer("/base/item-list", page);
	}


	//제조사코드에 셋팅
	findSrchCode("/base/code-list")
	/*
$('#makerCode').chosen({
	  no_results_text: "검색 결과가 없습니다"
	  , width: "200px"
});
*/

	$("#btnFind").click(function() {
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var makerCode_val = $("#makerCode").val();
		var itemNo_val = $("#itemNo").val();
		var itemName_val = $("#itemName").val();
		var itemId_val = $("#itemId").val();
		var classCode_val = $("#classCode").val();

		document.location.hash = '#info' + currentPage + "!" + makerCode_val + "!" + itemNo_val + "!" + itemName_val + "!" + itemId_val + "!" + classCode_val;

		findDataToServer("/base/item-list", 1);

	});
	$("#btnPrint").click(function() {	
	 printBarcode();	
	});

});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};

// 칼럼 레이아웃 작성
var columnLayout = [
	{ dataField: "cust_origin", headerText: "거래처코드_저장", visible: false }
	, { dataField: "cust", headerText: "거래처", width: 140, editable: false }
	, { dataField: "shareYN", headerText: "공유부품", width: 56 }
	,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
	, { dataField: "itemId", headerText: "부품ID", width: 80 }
	//,{ dataField : "itemCode",   headerText : "상품코드", width: 120} 
	, { dataField: "itemNo", headerText: "품번", width: 120 }
	, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
	, { dataField: "itemName", headerText: "부품명", style: "left", width: 120 }
	, { dataField: "itemNameEn", headerText: "영문부품명", style: "left", width: 120 }
	, { dataField: "makerCode", headerText: "제조사코드", width: 68 }
	, { dataField: "makerName", headerText: "제조사명", width: 100 }
	//,{ dataField : "genuineYN",      headerText : "정품여부"    }
	, { dataField: "class", headerText: "클래스" }
	, { dataField: "consign", headerText: "수탁거래처" }
	, { dataField: "stockQty", headerText: "재고수량", dataType: "numeric", formatString: "#,##0" }
	, { dataField: "stockPlace", headerText: "재고위치" }
	, { dataField: "itemExchangeId", headerText: "호환Id" }
	, { dataField: "centerPrice", headerText: "센터가", dataType: "numeric", formatString: "#,##0" , style: "right"}
	, { dataField: "inPrice", headerText: "입고단가", dataType: "numeric", formatString: "#,##0" , style: "right"}
	, { dataField: "salePrice", headerText: "판매단가", dataType: "numeric", formatString: "#,##0" , style: "right"}
	, { dataField: "regUserId", headerText: "등록자id" }
	, { dataField: "regYmd", headerText: "등록일자" }
	, { dataField: "uptUserId", headerText: "수정자id" }
	, { dataField: "uptYmd", headerText: "수정일자" }
	, { dataField: "immediateRlYN", headerText: "주문즉시출고" }
	, { dataField: "productYear", headerText: "생산년도" }
	, { dataField: "home", headerText: "원산지" }
	, { dataField: "equipPlace", headerText: "장착위치" }
	, { dataField: "color", headerText: "색상" }
	, { dataField: "shine", headerText: "광택" }
	, { dataField: "weight", headerText: "무게(Weight)" }
	, { dataField: "cbm", headerText: "CBM" }
	, { dataField: "width", headerText: "가로(Width)" }
	, { dataField: "depth", headerText: "세로(Depth)" }
	, { dataField: "height", headerText: "높이(Height)" }

];

// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {

	var auiGridProps = {
		
		//editable: true,

		// 상태 칼럼 사용
		//showStateColumn: true,

		// 페이징 사용		
		usePaging: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		pageRowCount: 50,

		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,

		selectionMode: "multipleCells",


		enableFilter: true,
		
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,

		/*
		
		// 행 고유 id 에 속하는 필드명 (필드의 값은 중복되지 않은 고유값이여야 함)
		rowIdField : "mgrIdx",
		
		
		//softRemoveRowMode 적용을 원래 데이터에만 적용 즉, 새 행인 경우 적용 안시킴
		softRemovePolicy :"exceptNew",
		
		// 칼럼 끝에서 오른쪽 이동 시 다음 행, 처음 칼럼으로 이동할지 여부
		wrapSelectionMove : true,
		
		// 읽기 전용 셀에 대해 키보드 선택이 건너 뛸지 여부 (기본값 : false)
		skipReadonlyColumns : true,
		
		// 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
		enterKeyColumnBase : true,
		
		// selectionChange 이벤트 발생 시 간소화된 정보만 받을지 여부
		// 이 속성은 선택한 셀이 많을 때 false 설정하면 퍼포먼스에 영향을 미칩니다.
		// selectionChange 이벤트 바인딩 한 경우 true 설정을 권합니다.
		simplifySelectionEvent : true */
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

	// 에디팅 시작 이벤트 바인딩
	// 에디팅 정상 종료 직전 이벤트 바인딩
	// 에디팅 정상 종료 이벤트 바인딩
	// 에디팅 취소 이벤트 바인딩
	//AUIGrid.bind(myGridID, ["cellEditBegin", "cellEditEndBefore", "cellEditEnd", "cellEditCancel"], auiCellEditingHandler);

	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function(event) {
		currentPage = event.currentPage;
	});

	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function(event) {

		  
		if (event.columnIndex < 7) {   //칼럼이 공장품번까지만 더블클릭한 경우에 넘어가도록..
			//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
			var makerCode_val = $("#makerCode").val();
			var itemNo_val = $("#itemNo").val();
			var itemName_val = $("#itemName").val();
			var itemId_val = $("#itemId").val();
			var classCode_val = $("#classCode").val();

			document.location.hash = '#info' + currentPage + "!" + makerCode_val + "!" + itemNo_val + "!" + itemName_val + "!" + itemId_val + "!" + classCode_val;
			//

			//post형식으로 거래처등록으로 넘기기
			let f = document.createElement('form');

			let obj;
			obj = document.createElement('input');
			obj.setAttribute('type', 'hidden');
			obj.setAttribute('name', 'itemId');
			obj.setAttribute('value', event.item.itemId); //event.value에서 수정 장윤상

			f.appendChild(obj);
			f.setAttribute('method', 'post');
			f.setAttribute('action', '/base/item-up');
			document.body.appendChild(f);
			f.submit();
		}
	});

}


function findDataToServer(url, page) {

	var list = [];
	var sYmd = $("#sYmd").val();
	var eYmd = $("#eYmd").val();
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true) {
		ymdIgnoreYN = "Y";
	}

	var makerCode = $("#makerCode").val();
	var itemNo = $("#itemNo").val();
	var itemName = $("#itemName").val();
	var itemId = 0;
	itemId = $("#itemId").val();
	if (typeof itemId === undefined || itemId == '') {
		itemId = 0;
	}
	var classCode = $("#classCode").val();
	 
 	

	var immediateRlYN = $('input:checkbox[name=immediateRlYN]').is(':checked')?'Y':'N';
	if (spaceDel(itemNo) == '' && spaceDel(itemName) == '' && $("#itemId").val() == '' && immediateRlYN=='N') {
		alert("부품ID 또는 부품번호 또는 부품명에 검색어를 입력하세요.");
		return false;
	}
	if ($("#itemNo").val() != '' && $("#itemNo").val().length < 2) {
		alert("부품번호는 3글자 이상 입력하세요.");
		return false;
	} if ($("#itemName").val() != '' && $("#itemName").val().length < 2) {
		alert("부품명은 2글자 이상 입력하세요.");
		return false;
	}
	 
    setStartSpinner();
 	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"sYmd": sYmd,
			"eYmd": eYmd,
			"ymdIgnoreYN": ymdIgnoreYN,
			"makerCode": makerCode,
			"itemNo": itemNo,
			"itemName": itemName,
			"itemId": itemId,
			"classCode": classCode,
			"immediateRlYN" : immediateRlYN
		},
		//async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.itemList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				let shareYN = "";
				for (i = 0; i < data.itemList.length; i++) {
					var shine = '';
					var itemExchangeId = '';
					 
					if (data.itemList[i].shine == 1) {
						shine = '광택'
					} else if (data.itemList[i].shine == 2) {
						shine = '무광택'
					} else {
						shine = '알수없음'
					}
					if (data.itemList[i].itemExchangeId == 0) {
						itemExchangeId = '없음';
					} else {
						itemExchangeId = data.itemList[i].itemExchangeId;
					}
					//2024.09.30 sg -공유범위(여부)
					if (data.itemList[i].shareYN == 'Y') {
						shineYN = '관계사 공유';
					} else if (data.itemList[i].shareYN == 'A') {
						shineYN = '4car사용업체 공유';
					} else {
						shineYN = '공유 안함';
					}

					list.push({
						cust_origin: data.itemList[i].comCode
						, cust: data.itemList[i].comCode + "-" + data.itemList[i].comName
						, shareYN: shareYN   //2024.09.30 주석 data.itemList[i].shareYN
						, itemId: data.itemList[i].itemId
						//,itemCode: data.itemList[i].itemCode 
						, itemNo: data.itemList[i].itemNo
						, factoryNo: data.itemList[i].factoryNo
						, itemName: data.itemList[i].itemName
						, itemNameEn: data.itemList[i].itemNameEn
						, makerCode: data.itemList[i].makerCode
						, makerName: data.itemList[i].makerName
						//,genuineYN: data.itemList[i].genuineYN 
						, class: data.itemList[i].classCode + " " + data.itemList[i].className
						, consign: data.itemList[i].consignCustCode + " " + data.itemList[i].consignCustName
						, itemExchangeId: itemExchangeId
						, centerPrice: data.itemList[i].centerPrice
						, inPrice: data.itemList[i].inPrice
						, salePrice: data.itemList[i].salePrice
						, regUserId: data.itemList[i].regUserId
						, regYmd: data.itemList[i].regYmd
						, uptUserId: data.itemList[i].uptUserId
						, uptYmd: data.itemList[i].uptYmd
						, immediateRlYN: data.itemList[i].immediateRlYN
						, productYear: data.itemList[i].productYear
						, home: data.itemList[i].home
						, equipPlace: data.itemList[i].equipPlace
						, color: data.itemList[i].color
						, shine: shine
						, weight: data.itemList[i].weight
						, cbm: data.itemList[i].cbm
						, width: data.itemList[i].width
						, depth: data.itemList[i].depth
						, height: data.itemList[i].height
						, stockQty: data.itemList[i].stockQty
						, stockPlace: data.itemList[i].stockPlace
						, className: data.itemList[i].className
						
						
					}); 
					//firstGrid_mst.setData(list); // 그리드에 데이터 설정
				 
				
				}
				AUIGrid.setGridData("#grid_wrap", list);
				
				// 해당 페이지로 이동
				if (page > 1) {
					AUIGrid.movePageTo(myGridID, Number(page));
				}
			}
			
			setStopSpinner();
		},
		error: function(x, e) {
			setStopSpinner();
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


// 데이터 요청 Ajax
function findSrchCode(url) {
	var list = [];

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			mCode: "1000"
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.codeList.length == 0) {
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
			} else {
				//$("#makerCode").append("<option  value='' >---</option>");
				for (i = 0; i < data.codeList.length; i++) {
					code = data.codeList[i].code;
					codeName = data.codeList[i].codeName;
					$("#makerCode").append("<option value='" + code + "' >" + code + " : " + codeName + "</option>");
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


function myCustomFilter1() {  //필터

	// 사용자 필터링 설정
	AUIGrid.setFilter(myGridID, "stockQty", function(dataField, value, item) {
		if (item.stockQty > 0) { return true; }
		else { return false; }
	});
};
function clearMyFilter1() {
	//  필터링 모두 해제
	AUIGrid.clearFilter(myGridID, "stockQty");
};

function myCustomFilter2() {  //필터

	// 사용자 필터링 설정
	AUIGrid.setFilter(myGridID, "cust_origin", function(dataField, value, item) {
		if (item.cust_origin == $("#comCode_save").val()) { return true; }
		else { return false; }
	});
};
function clearMyFilter2() {
	//  필터링 모두 해제
	AUIGrid.clearFilter(myGridID, "cust_origin");
};

function itemExcelAdd() {

	var dialogXls;
	dialogXls = $("#dialogXls-form").dialog({
		autoOpen: false,
		height: 420,
		//minWidth: 500,
		width: "40%",
		modal: true,
		buttons: {
			/* "Create an account": addUser, */
			"닫기": function() {
				dialogXls.dialog("close");
			}
		},
		close: function() {
			$("#batchFile").val("");
		}
	});
	$(".ui-dialog-titlebar-close").html("X");
	dialogXls.dialog("open");
}

function fn_fileDataCall() {
	if ($("#xls_itemNo").val() == '' || $("#xls_itemNo").val() == null) { alert("품번은 필수 입력해야 합니다."); $("#xls_itemNo").focus(); return false; }
	if ($("#xls_centerPrice").val() == '' || $("#xls_centerPrice").val() == null) { alert("센터가는 필수 입력해야 합니다."); $("#xls_centerPrice").focus(); return false; }
	if ($("#xls_sRow").val() == '' || $("#xls_sRow").val() == null) { alert("시작ROW는 필수 입력해야 합니다."); $("#xls_sRow").focus(); return false; }
	

	

	var dialogXls;
	dialogXls = $("#dialogXls-form").dialog({
		autoOpen: false,
		height: 420,
		//minWidth: 500,
		width: "40%",
		modal: true,
		buttons: {
			"닫기": function() {
				dialogXls.dialog("close");
			}
		},
		close: function() {
			$("#batchFile").val("");
		}
	});

	var batchFile = $("#batchFile").val();

	var upload_result_message = "";

	if (batchFile == "" || batchFile == null) {
		alert("올리기할 파일을 선택하세요.");
		return false;
	} else if (!check_file_type(batchFile)) {
		alert("엑셀(.xlxs)  파일만 불러올 수 있습니다.");
		return false;
	}

	if (confirm("올리기 하시겠습니까?")) {

		var list = [];
		//로딩바 시작
		setStartSpinner();
		var options = {
			success: function(data) {
				//로딩바 종료
				setStopSpinner();
				
				alert(data.result_code + " : " + data.result_msg);
				//dialogXls.dialog("close");
			},

			type: "POST"
		};
		$("#addExcelForm").ajaxSubmit(options);


	}
}

//엑셀/텍스트형식인지 여부 판단
function check_file_type(batchFile) {
	var fileFormat = batchFile.split(".");
	if (fileFormat.indexOf("xlsx") > -1) {
		return true;  //엑셀/텍스트 확장자인 경우
	} else {
		return false;  //엑셀/텍스트 확장자 아닌경우
	}
}

//qr코드 출력 
function printBarcode(){
	var itemId = "";
	var reqArr = "";
	var reqArr2 = "";
	var reqArr3 = "";
	
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		itemId = rowItem.item.itemId;
		itemNo =  "["+rowItem.item.itemNo+"]"  ;
		itemName =  rowItem.item.itemName ;
		
		if (i == 0) {
			reqArr = itemId;		
			reqArr2 = itemNo	
			reqArr3 = itemName
		
		}else{
			reqArr = reqArr + "^" +itemId;		
			reqArr2 = reqArr2 + "^" +itemNo;		
			reqArr3 = reqArr3 + "^" +itemName;		
		}

	}
	//comCode =  $("#comCode").val(); 
	
	
	
	//window.open ("/base/rack-list-print?reqArr="+encodeURIComponent(reqArr),"_blank");
	var url = "/base/item-list-print?reqArr=" + encodeURIComponent(reqArr)+ "&reqArr2=" + encodeURIComponent(reqArr2)
					+ "&reqArr3=" + encodeURIComponent(reqArr3)	 ;
	window.open(url, "_blank","width=600,height=400");
}



