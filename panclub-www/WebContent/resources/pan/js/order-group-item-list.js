
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridID3;
var myGridIDItem;
var myGridIDCust;
var myGridIDCustMgr;
var myGridIDOrder;
// 차량번호 기 견적 체크
/*
let carNo = document.querySelector("#carNo");
carNo.addEventListener("blur", e => {
	$("#existOrderNoti").css("display","inline");
});
*/

function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	//console.log("custcode:: "+ $("#custCode").val());
}

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function() {
	
	
	//console.log("hi");
	
	//관리지점코드에 셋팅
  	branchCodeSelect("/base/code-list");
  	
	$(".aui-grid").focus();
	$("#supplyInfo-title").css("display", "none");
	$("#supplyInfo-input").css("display", "none");

	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);

	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();

	// 데이터 요청, 요청 성공 시 AUIGrid 에 데이터 삽입합니다.
	//requestData("./data/normal_500.json");

	//목록에서 넘어오는 경우
	let orderGroupId = $("#orderGroupId").val();
	if (orderGroupId != '') {
		//alert("custcode:"+custCode);
		findOrderGroup('/order/order-group-list');
	}
		

	//AUIGrid.setSelectionByIndex(myGridID, 0, );


});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [
		{ dataField: "idx", headerText: "idx", width: 100, editable: false, visible: false }
		, { dataField: "orderNo", headerText: "주문번호", width: 86, editable: false }
		, { dataField: "orderGroupId", headerText: "주문그룹ID", width: 86, editable: false }
		, { dataField: "orderSeq", headerText: "주문<br>순번", width: 56, editable: false }
		, {
			headerText: "청구 ",
			children: [
				{ dataField: "clType", headerText: "구분", width: 34 }
				, { dataField: "clReqYN", headerText: "요청", width: 34 }
				, { dataField: "clReqChkYN", headerText: "진행", width: 34 }
				, { dataField: "clYN", headerText: "완료", width: 34 }
				, { dataField: "clIgnYN", headerText: "제외", width: 34 
					,tooltip : {
					        tooltipFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {
								if(item.clIgnYN == 'Y'){
									var str = "<span style='color:#f00;'>제외사유</span>";					     
						            str += "<br>사유1 : " + item.clIgnMemo1;
						            str += "<br>사유2 : " + item.clIgnMemo2;
						            
						            return str;									
								}
					           
					   	}
	   				}
				}
				, { dataField: "clIgnMemo1", headerText: "제외사유1", width: 34 , visible: false}
				, { dataField: "clIgnMemo2", headerText: "제외사유2", width: 34 , visible: false}
			]
		}
		, { dataField : "className",      headerText : "구분", width : 80, editable : false }
		, { dataField: "itemId", headerText: "부품ID", width: 100, editable: false }
		, { dataField : "makerName",      headerText : "제조사명"}
		, { dataField: "itemNo", headerText: "품번", width: 120 } 
		, { dataField: "itemName", headerText: "품명", width: 160, editable: false, style: "left" }
		//, { dataField: "dcExceptYN", headerText: "할인제외", width: 56, editable: false }
		//,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		, {
			headerText: "창고 ",
			children: [
				 { dataField: "whStockCnt", headerText: "보유", editable: false, width: 34, dataType: "numeric", formatString: "#,##0", 
				 styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value>0) {	return "aui-grid-style-rightbold";	}	return "right";	}}
				 ,{ dataField: "workableQty", headerText: "판매가능", editable: false, width: 56, dataType: "numeric", formatString: "#,##0", 
				 styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value>0) {	return "aui-grid-style-rightbold";	}	return "right";	} }
				 ,{ dataField: "ctableQty", headerText: "회수가능", editable: false, width: 56, dataType: "numeric", formatString: "#,##0", 
				 styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value>0) {	return "aui-grid-style-rightbold";	}	return "right";	} }
				 ,{ dataField: "placeableQty", headerText: "발주가능", editable: false, width: 56, dataType: "numeric", formatString: "#,##0", 
				 styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value>0) {	return "aui-grid-style-rightbold";	}	return "right";	} }
			]
		}	 
		, { dataField: "orderCnt", headerText: "주문<br>수량", editable: false, width: 56, dataType: "numeric", formatString: "#,##0", style: "right" }
		, {
			headerText: "요청 ",
			children: [
				 {
					dataField: "stockReqCnt", headerText: "창고사용", width: 56,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; }
				}
				, {
					dataField: "plReqCnt", headerText: "발주", width: 50,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; } 
				}
				, {
					dataField: "storMvReqCnt", headerText: "이동", width: 50, visible: false,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
				}
				, {
					dataField: "rlReqCnt", headerText: "출고", width: 50,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; }
				}
				, {
					dataField: "riCnt", headerText: "반입", editable: false, width: 50,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
				}
				, {
					dataField: "roCnt", headerText: "반출", width: 50,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
				}
				, {
					dataField: "sirCnt", headerText: "재고투입", width: 56,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; }
				}
				// { dataField : "placeReqStatus",     headerText : "발주", width : 50 }
				//,{ dataField : "storUseReqStatus",     headerText : "창고사용", width : 60 }
				//,{ dataField : "storageMoveReqStatus",      headerText : "이동", width : 50, visible : false }
				//,{ dataField : "releaseReqStaus",     headerText : "출고" , width : 50}
				//,{ dataField : "reinStatus",     headerText : "반입", editable : fa............................................................................................................lse , width : 50}
				//,{ dataField : "reoutStatus",     headerText : "반출", width : 50 }
			]
		}
		, {
			headerText: "처리 ",
			children: [
				//{ dataField : "orderCnt",     headerText : "주문", width : 50 }
				 {
					dataField: "stockUseCnt", headerText: "창고사용", width: 56,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; }
				}
//				, {
//					dataField: "placeCnt", headerText: "발주", width: 50,
//					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; }
//				}
//				, {
//					dataField: "placeImportCnt", headerText: "수입품", width: 50,
//					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; }
//				}
				, {
					dataField: "placeCntImport", headerText: "발주(수입)", width: 65,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0" && value != '0(0)') { return "auigrid-color-style-link-darkred"; } return null; }
				}
				, {
					dataField: "whCnt", headerText: "입고", width: 50,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; }
				}
				, {
					dataField: "realReleaseCnt", headerText: "출고", width: 50,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; }
				}
				, {
					dataField: "reinCnt", headerText: "반입", width: 50,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; }
				}
				, {
					dataField: "reoutCnt", headerText: "반출", width: 50,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
				}
				, {
					dataField: "sirChkCnt", headerText: "재고투입", width: 56,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; }
				}
				, {
					dataField: "finalCnt", headerText: "최종", width: 50,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
				}
				
			]
		}
		, { dataField: "unitPrice", headerText: "단가", dataType: "numeric", formatString: "#,##0", style: "right", width: 80 }
		, { dataField: "salePrice", headerText: "할인단가", dataType: "numeric", formatString: "#,##0", style: "right", editable: false, width: 80 }
		, { dataField: "sumPrice", headerText: "합계", editable: false, dataType: "numeric", formatString: "#,##0", style: "right", width: 80 }
		, { dataField: "importPrice", headerText: "수입가", width: 80 }
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 } 
		, { dataField: "memo", headerText: "비고", style: "left" }
		, { dataField: "placeCustCode", headerText: "발주처코드" , visible : false }
		, { dataField: "placeCustName", headerText: "발주(예정)처명", style: "left", editable: false, width: 120 ,  headerTooltip : {
        					show : true,
        					tooltipHtml : '발주요청만된 경우 발주예정처명'
	    	} }
		, { dataField: "orderReqPlaceCustName", headerText: "요청발주처명", style: "left", editable: false, width: 120  }
		, { dataField: "placeUnitPrice", headerText: "발주단가", dataType: "numeric", formatString: "#,##0", style: "right" , visible : false  }
		, { dataField: "taxBillNo", headerText: "세금계산서번호", editable: false, visible : false  }
		, { dataField: "releaseReqYmd", headerText: "출고요청일", width: 80, editable: false }

	];

	// 푸터 설정
	var footerLayout = [
		{ labelText: "∑", positionField: "#base", style: "aui-grid-my-column" },
		{ dataField: "orderCnt", positionField: "orderCnt", operation: "SUM", formatString: "#,##0" },
		{ dataField: "realReleaseCnt", positionField: "realReleaseCnt", operation: "SUM", formatString: "#,##0" },
		{ dataField: "stockReqCnt", positionField: "stockReqCnt", operation: "SUM", formatString: "#,##0" },
		{ dataField: "stockUseCnt", positionField: "stockUseCnt", operation: "SUM", formatString: "#,##0" },
		{ dataField: "placeCnt", positionField: "placeCnt", operation: "SUM", formatString: "#,##0" },
		{ dataField: "whCnt", positionField: "whCnt", operation: "SUM", formatString: "#,##0" },
		{ dataField: "reinCnt", positionField: "reinCnt", operation: "SUM", formatString: "#,##0" },
		{ dataField: "reoutCnt", positionField: "reoutCnt", operation: "SUM", formatString: "#,##0" },
		{ dataField: "finalCnt", positionField: "finalCnt", operation: "SUM", formatString: "#,##0" },

		{ dataField: "unitPrice", positionField: "unitPrice", operation: "SUM", formatString: "#,##0" },
		{ dataField: "salePrice", positionField: "salePrice", operation: "SUM", formatString: "#,##0" },
		{ dataField: "sumPrice", positionField: "sumPrice", operation: "SUM", formatString: "#,##0" },
		//{		dataField: "supplyPrice",		positionField: "supplyPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		//{		dataField: "supplySumPrice",		positionField: "supplySumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{ dataField: "importPrice", positionField: "importPrice", operation: "SUM", formatString: "#,##0" },
		{ dataField: "placeUnitPrice", positionField: "placeUnitPrice", operation: "SUM", formatString: "#,##0" }
	];

	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		selectionMode: "singleRow",
		editable: false,
		// 상태 칼럼 사용
		showStateColumn: true,
		rowIdField: "idx",
		showRowCheckColumn: false,

		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
		
		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,

		//footer 노출
		showFooter: true,

		// 고정칼럼 카운트 지정
		fixedColumnCount: 11,
		showAutoNoDataMessage: false,
		
		showTooltip : true,

		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
		rowCheckableFunction: function(rowIndex, isChecked, item) {
			//console.log("isChecked"+isChecked);
			//if (item.product == "LG G3") { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
			//	return false;
			//}
			return true;
		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		rowCheckDisabledFunction: function(rowIndex, isChecked, item) {
			//if (item.product == "LG G3") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
			//	return false; // false 반환하면 disabled 처리됨
			//}
			return true;
		}
	};


	//var auiGridProps = {};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);


	// 푸터 레이아웃 세팅
	AUIGrid.setFooter(myGridID, footerLayout);

	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);

	/*
	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID, "ready", function(event) {
		// ready 이벤트를 바인딩하여 데이터에 맞게 초기 화면설정 작업을 하십시오.
		console.log("aa");
	});

	// 셀 선택변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		console.log("현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ), 값 : " + primeCell.value);
	});
	*/

	// 그리드 ready 이벤트 바인딩
	//AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);

	// 선택 변경 이벤트 바인딩
	//AUIGrid.bind(myGridID, "selectionChange", auiGridSelectionChangeHandler);
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {
		
		if (event.dataField == "stockReqCnt") { //창고사용요청     
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/storage-use-req-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "stockUseCnt") { // 창고사용    
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/storage-use-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "plReqCnt") { //발주요청2023.08.03    
			var orderGroupId = event.item.orderGroupId
			var sYmd = '2023-07-01';
			var eYmd = '2023-08-03';
			
			var url = '/order/place-req-item-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "placeCnt" || event.dataField == 'placeCntImport') { // 발주    
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/order/place-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "whCnt") { //입고 2023.08.04    
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/wh-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y&itemId='+itemId;
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "rlReqCnt") { //출고요청 2023.08.04    
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			//let doubleClickYN = "Y";
			var url = '/logis/rl-req-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y' + '&doubleClickYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		}else if (event.dataField == "realReleaseCnt") { //  출고    
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/rl-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y' + '&doubleClickYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "riCnt") { //    반입요청 
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/ri-req-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y' + '&doubleClickYN=Y' ;
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "reinCnt") { // 반입     
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/ri-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y' + '&doubleClickYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "roCnt") { //  반출요청   
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/ro-req-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y' + '&doubleClickYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "reoutCnt") { //반출     
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/ro-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y' + '&doubleClickYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "clReqYN") { // 청구요청     
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/order/cl-req-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "clReqChkYN") { // 청구진행    
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/order/cl-group-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "clYN") { // 청구완료    
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/order/cl-group-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "orderNo") { // 2023.10.06     
		    var orderNo = event.item.orderNo;
			var url = '/order/order-up?orderNo=' + orderNo;
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "sirCnt" || event.dataField == "sirChkCnt") { //재고투입   
		    var orderNo = event.item.orderNo;
			var url = '/order/stock-in-req-item-list?orderNo=' + orderNo;
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} 	
	});		
	AUIGrid.bind(myGridID, "mouseover", function (event) {
		
		if (event.dataField == "clIgnYN") { //창고사용요청     
			console.log("check")
		}
	});	
	
	//dataField: "clIgnYN"
};

function auiCellEditingHandler(event) {
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 종료(cellEditEnd) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;

		if (event.dataField == 'itemNo') {
			$("#pop_itemNo").val(event.value);
			$("#pop_itemName").val();
			findItem('/base/item-list');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
		}
	} else if (event.type == "cellEditCancel") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	}
};


// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;

//다이얼로그창 선택하는 경우 그리드에 디스플레이
function updateGridRow() {
	var mCodeSel = $("#mCode option:selected"); //$("#memberSel option:selected").text();
	var mCode = mCodeSel.val();
	var mName = mCodeSel.attr('mname');

	//console.log(mCode);
	//console.log(mName);

	var item = {};
	item.admCode = mCode; // $("#name").val();
	item.admName = mName; //$("#country").val();
	//item.memo = '';

	AUIGrid.updateRow(myGridID, item, currentRowIndex);

	//var dialog;
	//dialog = $( "#dialog-form" );	
	//dialog.dialog("close");
}

// 행 추가, 삽입
function addRow(grid, rowPos) {
	var item = new Object();

	/*
	item.idx = '',
	item.mgrIdx = '', 
	item.name = '', 
	item.position = '', 
	item.role = '', 
	item.phone1 = '', 
	item.phone2 = '', 
	item.email = '', 
	item.validYN = ''
	*/

	// parameter
	// item : 삽입하고자 하는 아이템 Object 또는 배열(배열인 경우 다수가 삽입됨)
	// rowPos : rowIndex 인 경우 해당 index 에 삽입, first : 최상단, last : 최하단, selectionUp : 선택된 곳 위, selectionDown : 선택된 곳 아래
	//AUIGrid.addRow(myGridID, item, rowPos);
	AUIGrid.addRow(myGridID, item, rowPos);


};


// 데이터 서버로 보내기
function updateDataToServer(url, workingType) {

	var orderGroupId = $("#orderGroupId").val();
	var orderNo = $("#orderNo").val();
	var orderType = $(':radio[name="orderType"]:checked').val();
	var custCode = $("#custCode").val();
	var custMgrName = $("#custMgrName").val();
	var custMgrPhone = $("#custMgrPhone").val();
	var supplyCustCode = $("#supplyCustCode").val();
	var supplyCustMgrName = $("#supplyCustMgrName").val();
	var supplyCustMgrPhone = $("#supplyCustMgrPhone").val();
	var carNo = $("#carNo").val();
	var vinNo = $("#vinNo").val();
	var makerCode = $("#makerCode").val();
	var colorCode = $("#colorCode").val();
	var carType = $("#carType").val();
	var dcRate = $("#dcRate").val();
	var dcDspType = $(':radio[name="dcDspType"]:checked').val();
	var agencyFeeRate = $("#agencyFeeRate").val();
	var marginRate = $("#marginRate").val();
	var memo1 = $("#memo1").val();
	var memo2 = $("#memo2").val();
	//필수값 체크
	if (custCode == '') { alert("판매거래처코드는 필수 입력해야 합니다."); $("#custCode").focus(); return; }

	// AUIGrid 에서 추가, 삭제, 수정된 행들 얻기
	// 추가된 행 아이템들(배열)
	var addList = AUIGrid.getAddedRowItems(myGridID);
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowColumnItems(myGridID);
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);

	var isValid1 = AUIGrid.validateGridData(myGridID, ["itemNo", "saleUnitPrice", "cnt"], "품번, 수량, 견적단가 필드는 반드시 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["itemNo", "cnt", "saleUnitPrice"], "품번, 수량, 견적단가 필드는 반드시 유효한 값을 직접 입력해야 합니다.");

	if (isValid1 == false || isValidChanged1 == false) {
		return;
	}

	var data = {};

	if (addList.length > 0) data.orderItemAdd = addList;
	else data.orderItemAdd = [];

	if (updateList.length > 0) data.orderItemUpdate = updateList;
	else data.orderItemUpdate = [];

	if (removeList.length > 0) data.orderItemRemove = removeList;
	else data.orderItemRemove = [];

	data.workingType = workingType;
	data.orderGroupId = orderGroupId;
	data.orderNo = orderNo;
	data.orderType = orderType;
	data.custCode = custCode;
	data.custMgrName = custMgrName;
	data.custMgrPhone = custMgrPhone;
	data.supplyCustCode = supplyCustCode;
	data.supplyMgrName = supplyCustMgrName;
	data.supplyMgrPhone = supplyCustMgrPhone;
	data.carNo = carNo;
	data.vinNo = vinNo;
	data.makerCode = makerCode;
	data.colorCode = colorCode;
	data.carType = carType;
	data.dcRate = dcRate;
	data.dcDspType = dcDspType;
	data.agencyFeeRate = agencyFeeRate;
	data.marginRate = marginRate;
	data.memo1 = memo1;
	data.memo2 = memo2;

	//console.log("data:"+JSON.stringify(data));

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			//alert("성공:"+data.success);
			// console.log("data.estiNo:"+data.estiNo);
			alert(data.result_code + ":" + data.result_msg);
			//alert(data.estiNo)
			//location.reload();


			//post형식으로 페이지 데이터 조회
			let f = document.createElement('form');

			let obj;
			obj = document.createElement('input');
			obj.setAttribute('type', 'hidden');
			obj.setAttribute('name', 'orderNo');
			obj.setAttribute('value', data.orderNo);

			f.appendChild(obj);
			f.setAttribute('method', 'post');
			f.setAttribute('action', '/order/order-up');
			document.body.appendChild(f);
			f.submit();

		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

};


// 추가, 수정, 삭제 된 아이템들 확인하기
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


	// 하단에 정보 출력.
	$("#desc_info").html("추가 개수 : " + addedRowItems.length + ", 수정 개수 : " + editedRowItems.length + ", 삭제 개수 : " + removedRowItems.length);


	if (str == "")
		str = "변경 사항 없음";

	alert(str);
}




function removeRow() {

	//var rowPos = document.getElementById("removeSelect").value;

	AUIGrid.removeRow(myGridID, "selectedIndex");
};


//  조회
function findOrderGroup(url,srchCode) {
	//var orderGroupId = $("#orderGroupId").val();
	var orderGroupId;
	if(srchCode == 1){
		orderGroupId = $("#orderGroupIdSrch").val();
	}else{
		orderGroupId = $("#orderGroupId").val();
	}

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"workingType": "LIST",
			"orderGroupId": orderGroupId
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.orderGroupList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				for (i = 0; i < data.orderGroupList.length; i++) {
					//console.log ("data333333333"+JSON.stringify(data));

					orderGroupId = data.orderGroupList[i].orderGroupId;
					orderType = data.orderGroupList[i].orderType;
					releaseReqYmd = data.orderGroupList[i].releaseReqYmd;
					custCode = data.orderGroupList[i].custCode;
					custName = data.orderGroupList[i].custName;
					custMgrName = data.orderGroupList[i].custMgrName;
					custMgrPhone = data.orderGroupList[i].custMgrPhone;
					supplyCustCode = data.orderGroupList[i].supplyCustCode;
					supplyCustName = data.orderGroupList[i].supplyCustName;
					supplyMgrName = data.orderGroupList[i].supplyMgrName;
					supplyMgrPhone = data.orderGroupList[i].supplyMgrPhone;
					carNo = data.orderGroupList[i].carNo;
					vinNo = data.orderGroupList[i].vinNo;
					colorCode = data.orderGroupList[i].colorCode;
					makerCode = data.orderGroupList[i].makerCode;
					carType = data.orderGroupList[i].carType;
					dcRate = data.orderGroupList[i].dcRate;
					dcDspType = data.orderGroupList[i].dcDspType;
					agencyFeeRate = data.orderGroupList[i].agencyFeeRate;
					marginRate = data.orderGroupList[i].marginRate;
					memo1 = data.orderGroupList[i].memo1;
					memo2 = data.orderGroupList[i].memo2;

					insure1Code = data.orderGroupList[i].insure1Code;
					insure1Name = data.orderGroupList[i].insure1Name;
					insure1MgrName = data.orderGroupList[i].insure1MgrName;
					insure1MgrPhone = data.orderGroupList[i].insure1MgrPhone;
					insure2Code = data.orderGroupList[i].insure2Code;
					insure2Name = data.orderGroupList[i].insure2Name;
					insure2MgrName = data.orderGroupList[i].insure2MgrName;
					insure2MgrPhone = data.orderGroupList[i].insure2MgrPhone;

					insure1AcceptNo = data.orderGroupList[i].insure1AcceptNo;
					insure1AcciRate = data.orderGroupList[i].insure1AcciRate;
					insure2AcceptNo = data.orderGroupList[i].insure2AcceptNo;
					insure2AcciRate = data.orderGroupList[i].insure2AcciRate;
					regUserName = data.orderGroupList[i].regUserName;


					taxType = data.orderGroupList[i].taxType;
					salePrice = data.orderGroupList[i].salePrice;
					taxPrice = data.orderGroupList[i].taxPrice;
					sumPrice = salePrice + taxPrice;

					insure1Fax = data.orderGroupList[i].insure1Fax;
					insure2Fax = data.orderGroupList[i].insure2Fax;
					//sumPriceKor = data.orderList[i].sumPriceKor;    

					if (data.orderGroupList[i].orderType == 1) {
						document.querySelector('input[name="orderType"][value="1"]').checked = true;
						click_orderType(1);
					} else if (data.orderGroupList[i].orderType == 2) {
						document.querySelector('input[name="orderType"][value="2"]').checked = true;
						click_orderType(2);
					}

					if (data.orderGroupList[i].dcDspType == 1) {
						document.querySelector('input[name="dcDspType"][value="1"]').checked = true;
					} else if (data.orderGroupList[i].dcDspType == 2) {
						document.querySelector('input[name="dcDspType"][value="2"]').checked = true;
					}

					branchCode = data.orderGroupList[i].branchCode;

					$("#orderGroupId").val(orderGroupId);
					$("#orderType").val(orderType);
					$("#custCode").val(custCode);
					$("#custName").val(custName);
					$("#custMgrName").val(custMgrName);
					$("#custMgrPhone").val(custMgrPhone);
					$("#supplyCustCode").val(supplyCustCode);
					$("#supplyCustName").val(supplyCustName);
					$("#supplyMgrName").val(supplyMgrName);
					$("#supplyMgrPhone").val(supplyMgrPhone);
					$("#carNo").val(carNo);
					$("#vinNo").val(vinNo);
					$("#colorCode").val(colorCode);
					$("#makerCode").val(makerCode);
					$("#carType").val(carType);
					$("#dcRate").val(dcRate);
					$("#dcDspType").val(dcDspType);
					$("#agencyFeeRate").val(agencyFeeRate);
					$("#marginRate").val(marginRate);
					$("#memo1").val(memo1);
					$("#memo2").val(memo2);

					$("#insure1Code").val(insure1Code);
					$("#insure1Name").val(insure1Name);
					$("#insure1MgrName").val(insure1MgrName);
					$("#insure1MgrPhone").val(insure1MgrPhone);
					$("#insure2Code").val(insure2Code);
					$("#insure2Name").val(insure2Name);
					$("#insure2MgrName").val(insure2MgrName);
					$("#insure2MgrPhone").val(insure2MgrPhone);

					$("#insure1AcceptNo").val(insure1AcceptNo);
					$("#insure1AcciRate").val(insure1AcciRate);
					$("#insure2AcceptNo").val(insure2AcceptNo);
					$("#insure2AcciRate").val(insure2AcciRate);

					$("#taxType").val(taxType);
					$("#salePrice").val(_cf_comma(salePrice));
					$("#taxPrice").val(_cf_comma(taxPrice));
					$("#sumPrice").val(_cf_comma(sumPrice));
					$("#sumPriceKor").val(sumPriceKor);
					
					$("#branchCode").val(branchCode);
                    $("#dataComCode").val(data.orderGroupList[i].comCode);  //2023.07.18 by dataCheck
					$("#regUserName").val(regUserName);

					$("#insure1MgrFax").val(insure1Fax);
					$("#insure2MgrFax").val(insure2Fax);
				}
				//보험사정보없는 경우 보험적용 비활성화
			/*	if ($("#insure1Code").val() == '') {
					document.getElementById('btnClInsure').classList.toggle('disabled');
				}*/

				findOrderGroupItem('/order/orderGroupItemList');
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

//품목 조회
function findOrderGroupItem(url) {
	var list = [];
	var orderGroupId = $("#orderGroupId").val();

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"orderGroupId": orderGroupId
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) { 
			if (data.orderGroupItemList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				data.orderGroupItemList.sort((a,b)=>a.orderNo-b.orderNo || a.dspNo - b.dspNo || parseFloat(a.orderSeq) - parseFloat(b.orderSeq));	//2024.06.18 sg
				for (i = 0; i < data.orderGroupItemList.length; i++) {
					//var placeCnt = data.orderGroupItemList[i].placeCnt;
					//if (placeCnt ==0) {
					//	placeCnt = "";
					//}
					//console.log("data.orderGroupItemList[i].rlReqCnt  : " + data.orderGroupItemList[i].rlReqCnt)
					
					list.push({
						idx: i
						, releaseReqYmd: data.orderGroupItemList[i].releaseReqYmd
						, orderNo: data.orderGroupItemList[i].orderNo
						, orderSeq: data.orderGroupItemList[i].orderSeq
						, orderGroupId: data.orderGroupItemList[i].orderGroupId
						, clType: data.orderGroupItemList[i].clType
						, itemId: data.orderGroupItemList[i].itemId
						, itemNo: data.orderGroupItemList[i].itemNo
						, itemName: data.orderGroupItemList[i].itemName
						, itemNameEn: data.orderGroupItemList[i].itemNameEn
						, storageMoveReqStatus: data.orderGroupItemList[i].storageMoveReqStatus
						, placeReqStatus: data.orderGroupItemList[i].placeReqStatus
						, releaseReqStaus: data.orderGroupItemList[i].releaseReqStaus
						, reinStatus: data.orderGroupItemList[i].reinStatus
						, reoutStatus: data.orderGroupItemList[i].reoutStatus
						, realReleaseCnt: data.orderGroupItemList[i].realReleaseCnt
						, stockReqCnt: data.orderGroupItemList[i].stockReqCnt
						, stockUseCnt: data.orderGroupItemList[i].stockUseCnt
						, placeCnt: data.orderGroupItemList[i].placeCnt
						, reinCnt: data.orderGroupItemList[i].reinCnt
						, reoutCnt: data.orderGroupItemList[i].reoutCnt
						, finalCnt: data.orderGroupItemList[i].finalCnt

						, orderCnt: data.orderGroupItemList[i].orderCnt
						, unitPrice: data.orderGroupItemList[i].unitPrice
						, salePrice: data.orderGroupItemList[i].salePrice
						, sumPrice: data.orderGroupItemList[i].sumPrice
						, placeUnitPrice: data.orderGroupItemList[i].placeUnitPrice
						, placeCustCode: data.orderGroupItemList[i].placeCustCode
						, placeCustName: data.orderGroupItemList[i].placeCustName

						, whStockCnt: data.orderGroupItemList[i].whStockCnt
						, storUseReqStatus: data.orderGroupItemList[i].storUseReqStatus

						, storMvReqCnt: data.orderGroupItemList[i].storMvReqCnt
						, plReqCnt: data.orderGroupItemList[i].plReqCnt
						, rlReqCnt: data.orderGroupItemList[i].rlReqCnt
						, riCnt: data.orderGroupItemList[i].riCnt
						, roCnt: data.orderGroupItemList[i].roCnt

						, clReqYN: data.orderGroupItemList[i].clReqYN
						, clYN: data.orderGroupItemList[i].clYN
						
						, workableQty: data.orderGroupItemList[i].workableQty
						, ctableQty: data.orderGroupItemList[i].ctableQty
						, placeableQty: data.orderGroupItemList[i].placeableQty
						
						, clReqChkYN: data.orderGroupItemList[i].clReqChkYN
						, clYN: data.orderGroupItemList[i].clYN
						
						, taxBillNo: data.orderGroupItemList[i].taxBillNo //230712 yoonsang
						, whCnt: data.orderGroupItemList[i].whCnt  //230801 hsg
						, memo: data.orderGroupItemList[i].memo  //230904 yoonsang
						
						,orderReqPlaceCustName: data.orderGroupItemList[i].orderReqPlaceCustName  //240424 sg
//						,placeImportCnt : data.orderGroupItemList[i].placeImportCnt //수입품
						
						,placeCntImport : `${data.orderGroupItemList[i].placeCnt || 0}(${data.orderGroupItemList[i].placeImportCnt || 0})`  //발주수량(수입품수량)
						,sirCnt :  data.orderGroupItemList[i].sirCnt || 0   // 재고투입요청수량
						,sirChkCnt :  data.orderGroupItemList[i].sirChkCnt || 0 // 재고투입처리수량
						,stoctInNotPlaceCnt :  data.orderGroupItemList[i].stoctInNotPlaceCnt || 0 // 재고투입처리수량
						
						,makerName :  data.orderGroupItemList[i].makerName || ''
						,className :  data.orderGroupItemList[i].className || ''
						,factoryNo :  data.orderGroupItemList[i].factoryNo || ''
						
						, clIgnYN: data.orderGroupItemList[i].clIgnYN					//240911  yoonsang 청구제외 추가
						,clIgnMemo1 : data.orderGroupItemList[i].clIgnMemo1				//240912 yoonsang 청구제외사유
						,clIgnMemo2 : data.orderGroupItemList[i].clIgnMemo2	
						
					});

				}
				AUIGrid.setGridData("#grid_wrap", list);
				//AUIGrid.setColumnSizeList(myGridID, AUIGrid.getFitColumnSizeList(myGridID));  // 셋팅된 데이터에 맞춰서 길이 컬럼 길이 조정해줌
			}
		},
		error: function(x, e) {
			if (x.status == 0) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)'); ㄹ
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


function click_orderType(orderType) {
	if (orderType == 1) {
		$("#supplyCustCode").val("");
		$("#supplyCustName").val("");
		$("#supplyCustAdmName").val("");
		$("#supplyCustAdmPhone").val("");
		$("#supplyInfo-title").css("display", "none");
		$("#supplyInfo-input").css("display", "none");
	} else {
		$("#supplyInfo-title").css("display", "block");
		$("#supplyInfo-input").css("display", "block");
	}
}



// 체크된 아이템 얻기
function placeOrder() {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	var str = "";
	var rowItem;
	var seqArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		seqArr = seqArr + "^" + rowItem.item.orderSeq;
		//str += "row : " + rowItem.rowIndex + ", id :" + rowItem.item.id + ", name : " + rowItem.item.name + "\n";
	}
	//alert(str);
	//location.href = "/_order/_orderAdd?reqNo_array="+reqNo_array+"&seqNo_array="+seqNo_array+"&eventNo_array="+eventNo_array;

	var orderNo = $("#orderNo").val();
	//post형식으로 페이지 데이터 조회
	let f = document.createElement('form');

	let obj;
	obj = document.createElement('input');
	obj.setAttribute('type', 'hidden');
	obj.setAttribute('name', 'orderNo');
	obj.setAttribute('value', orderNo);
	f.appendChild(obj);

	obj = document.createElement('input');
	obj.setAttribute('type', 'hidden');
	obj.setAttribute('name', 'seqArr');
	obj.setAttribute('value', seqArr);
	f.appendChild(obj);

	f.setAttribute('method', 'post');
	f.setAttribute('action', '/order/place-up');
	document.body.appendChild(f);
	f.submit();
}


// 견적 조회
function findEsti(url) {
	var estiNo = $("#estiNo").val();

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"workingType": "LIST",
			"estiNo": estiNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.estiList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				for (i = 0; i < data.estiList.length; i++) {
					estiType = data.estiList[i].estiType;
					custCode = data.estiList[i].custCode;
					custName = data.estiList[i].custName;
					custMgrName = data.estiList[i].custMgrName;
					custMgrPhone = data.estiList[i].custMgrPhone;
					supplyCustCode = data.estiList[i].supplyCustCode;
					supplyCustName = data.estiList[i].supplyCustName;
					supplyCustMgrName = data.estiList[i].supplyCustMgrName;
					supplyCustMgrPhone = data.estiList[i].supplyCustMgrPhone;
					carNo = data.estiList[i].carNo;
					vinNo = data.estiList[i].vinNo;
					colorCode = data.estiList[i].colorCode;
					makerCode = data.estiList[i].makerCode;
					carType = data.estiList[i].carType;
					dcRate = data.estiList[i].dcRate;
					dcDspType = data.estiList[i].dcDspType;
					agencyFeeRate = data.estiList[i].agencyFeeRate;
					marginRate = data.estiList[i].marginRate;
					memo1 = data.estiList[i].memo1;
					memo2 = data.estiList[i].memo2;



					$("#estiType").val(estiType);
					$("#custCode").val(custCode);
					$("#custName").val(custName);
					$("#custMgrName").val(custMgrName);
					$("#custMgrPhone").val(custMgrPhone);
					$("#supplyCustCode").val(supplyCustCode);
					$("#supplyCustName").val(supplyCustName);
					$("#supplyCustMgrName").val(supplyCustMgrName);
					$("#supplyCustMgrPhone").val(supplyCustMgrPhone);
					$("#carNo").val(carNo);
					$("#vinNo").val(vinNo);
					$("#colorCode").val(colorCode);
					$("#makerCode").val(makerCode);
					$("#carType").val(carType);
					$("#dcRate").val(dcRate);
					$("#dcDspType").val(dcDspType);
					$("#agencyFeeRate").val(agencyFeeRate);
					$("#marginRate").val(marginRate);
					$("#memo1").val(memo1);
					$("#memo2").val(memo2);



					//등록버튼 비활성화, 수정/삭제 활성화
					//document.getElementById('btnReg').classList.toggle('disabled'); 
					//document.getElementById('btnUpt').classList.toggle('disabled'); 
					//document.getElementById('btnDel').classList.toggle('disabled');				

				}
				findEstiItem('/order/esti-item-list');
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

//견적품목 조회
function findEstiItem(url) {
	var list = [];
	var estiNo = $("#estiNo").val();
	var seqArr = $("#seqArr").val();

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"estiNo": estiNo,
			"seqArr": seqArr
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.estiItemList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				var item = new Object();
				for (i = 0; i < data.estiItemList.length; i++) {
					//item.mCode = '',
					item.estiNo = data.estiItemList[i].estiNo
						, item.estiSeq = data.estiItemList[i].estiSeq
						, item.itemId = data.estiItemList[i].itemId
						, item.itemNo = data.estiItemList[i].itemNo
						, item.itemName = data.estiItemList[i].itemName
						, item.itemNameEn = data.estiItemList[i].itemNameEn
						, item.cnt = data.estiItemList[i].cnt
						, item.saleUnitPrice = data.estiItemList[i].salePrice
						//,item.saleUnitPrice = data.estiItemList[i].saleUnitPrice 
						//,item.saleDcPrice = data.estiItemList[i].saleDcPrice
						//,item.saleSumPrice = data.estiItemList[i].saleSumPrice
						, item.supplyPrice = data.estiItemList[i].supplyPrice
						, item.supplySumPrice = data.estiItemList[i].supplySumPrice
						, item.importPrice = data.estiItemList[i].importPrice
						, item.memo = data.estiItemList[i].memo
						, item.placeUnitPrice = data.estiItemList[i].placeUnitPrice
						, item.placeCustName = data.estiItemList[i].placeCustName

					AUIGrid.addRow(myGridID, item, "last");

					/*
					list.push({
						 //idx: data.estiItemList[i].estiSeq
						 estiNo: data.estiItemList[i].estiNo 
						,estiSeq: data.estiItemList[i].estiSeq 
						,itemId: data.estiItemList[i].itemId 
						,itemNo: data.estiItemList[i].itemNo 
						,itemName: data.estiItemList[i].itemName
						,itemNameEn: data.estiItemList[i].itemNameEn 
						,cnt: data.estiItemList[i].cnt 
						,salePrice: data.estiItemList[i].salePrice 
						,sumPrice: data.estiItemList[i].sumPrice
						,supplyPrice: data.estiItemList[i].supplyPrice 						
						,supplySumPrice: data.estiItemList[i].supplySumPrice 
						,importPrice: data.estiItemList[i].importPrice 
						,memo: data.estiItemList[i].memo 
						,placeUnitPrice: data.estiItemList[i].placeUnitPrice
						,placeCustName: data.estiItemList[i].placeCustName
					});
					*/
				}
				//AUIGrid.setGridData("#grid_wrap", list);

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

// Element 에 style 한번에 오브젝트로 설정하는 함수 추가
Element.prototype.setStyle = function(styles) {
    for (var k in styles) this.style[k] = styles[k];
    return this;
};


function modal(id) {
    var zIndex = 9999;
    var modal = document.getElementById(id);

    // 모달 div 뒤에 희끄무레한 레이어
    var bg = document.createElement('div');
    bg.setStyle({
        position: 'fixed',
        zIndex: zIndex,
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        // 레이어 색갈은 여기서 바꾸면 됨
        backgroundColor: 'rgba(0,0,0,0.4)'
    });
    document.body.append(bg);

    // 닫기 버튼 처리, 시꺼먼 레이어와 모달 div 지우기
    modal.querySelector('.modal_close_btn').addEventListener('click', function() {
        bg.remove();
        modal.style.display = 'none';
    });

    modal.setStyle({
        position: 'fixed',
        display: 'block',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

        // 시꺼먼 레이어 보다 한칸 위에 보이기
        zIndex: zIndex + 1,

        // div center 정렬
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        msTransform: 'translate(-50%, -50%)',
        webkitTransform: 'translate(-50%, -50%)'
    });
}
//발주요청
function placeReq_test() {
	modal('my_modal');
	return;

	$("#plReq_orderGroupId").val(orderGroupId);
	$("#plReq_ordArr").val(ordArr);
	$("#plReq_seqArr").val(seqArr);
	

	var pop_title = "popupOpener" ;
	
	// 듀얼 모니터 고려한 윈도우 띄우기
	var popWidth ="";
	var popHeight = "";
	if (popWidth == '') {
		var nWidth = "500";
	}else{
		var nWidth = popWidth;
	}
	if (popHeight == '') {
		var nHeight = "300";
	}else{
		var nHeight = popHeight;
	}
	var curX = window.screenLeft;
	var curY = window.screenTop;
	var curWidth = document.body.clientWidth;
	var curHeight = document.body.clientHeight;
	  
	var nLeft = curX + (curWidth / 2) - (nWidth / 2);
	var nTop = curY + (curHeight / 2) - (nHeight / 2);

	nLeft = 100;
	nTop = 50;
	nWidth = curWidth -200
	nHeight = curHeight -100
	var strOption = "";
	strOption += "left=" + nLeft + "px,";
	strOption += "top=" + nTop + "px,";
	strOption += "width=" + nWidth + "px,";
	strOption += "height=" + nHeight + "px,";
	strOption += "toolbar=no,menubar=no,location=no,";
	strOption += "resizable=yes,status=no";
			
	window.open("", pop_title, strOption);
	
	var frmPlReq = document.frmPlReq ;
	frmPlReq.target = pop_title ;
	frmPlReq.action = "/order/place-req-up" ;
	
	frmPlReq.submit() ;
		
	return
	
}	
//발주요청
function placeReq() {

	var orderGroupId = $('#orderGroupId').val();


	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var ordArr = ""
	var seqArr = "";
	var errCnt = 0;

	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		ordArr = ordArr + "^" + rowItem.item.orderNo;
		seqArr = seqArr + "^" + rowItem.item.orderSeq;

		if ((rowItem.item.stockUseCnt + rowItem.item.placeCnt) >= rowItem.item.orderCnt) {
			errCnt = errCnt + 1;
		}
		if(rowItem.item.taxBillNo !=''){
			alert("세금계산서발행건은 더이상 수정할 수 없습니다.");
			return;
		}
	}

	/*
	console.log("A");
	//기발주 체크
	AUIGrid.setProp(myGridID, "rowStyleFunction", function (rowIndex, item) {
			console.log("item.placeReqStatus): "+item.placeReqStatus);
			console.log("item.placeCustCode): "+item.placeCustCode);
		//var alltems =  AUIGrid.getGridData(myGridID);
		//var rowIdField = AUIGrid.getProp(myGridID, "idx");
	   // rowId = rowItem[rowIdField];
		//console.log("rowIndex: "+AUIGrid.isCheckedRowById(myGridID, rowIndex));
		if ( (item.placeReqStatus == 'O' || isEmpty(item.placeCustCode) ==true) && AUIGrid.isCheckedRowById(myGridID, rowIndex) == true ) {
			//console.log("errCnt:"+errCnt);		
			errCnt = errCnt + 1;
			//return "auigrid-err-row-style";
		}
		
		return "";	
	});		
	//AUIGrid.update(myGridID);
	*/

	if (errCnt > 0) {
		alert("주문수량을 초과하였습니다.")
		return;
	}


	// console.log("seqArr:"+seqArr);
	$.fancybox.open({
		href: '/order/place-req-up?orderGroupId=' + orderGroupId + '&ordArr=' + encodeURIComponent(ordArr) + '&seqArr=' + encodeURIComponent(seqArr), // 불러 올 주소
		type: 'iframe',
		width: '90%',
		height: '90%',
		padding: 0,
		fitToView: false,
		autoSize: false,
		modal: true
	});
}

//창고사용요청
function storageUseReq() {	

	var orderGroupId = $('#orderGroupId').val();


	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var ordArr = ""
	var seqArr = "";
	var errCnt = 0;
	var errCnt2 = 0;
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		ordArr = ordArr + "^" + rowItem.item.orderNo;
		seqArr = seqArr + "^" + rowItem.item.orderSeq;

		//console.log("rowItem.item.storUseReqStatus:"+ rowItem.item.storUseReqStatus);
		if (rowItem.item.whStockCnt == 0 && rowItem.item.ctableQty == 0 ) {
			errCnt = errCnt + 1;
		}
		if ((rowItem.item.stockUseCnt + rowItem.item.placeCnt) >= rowItem.item.orderCnt) {
			errCnt2 = errCnt2 + 1;
		}
		if(rowItem.item.taxBillNo !=''){
			alert("세금계산서발행건은 더이상 수정할 수 없습니다.");
			return;
		}
	}

	if (errCnt > 0) {
		alert("창고보유수량이 0개 입니다.")
		return;
	}
	if (errCnt2 > 0) {
		alert("주문수량을 초과하였습니다.")
		return;
	}

	// console.log("seqArr:"+seqArr);
	$.fancybox.open({
		href: '/order/storage-use-req-up?orderGroupId=' + orderGroupId + '&ordArr=' + encodeURIComponent(ordArr) + '&seqArr=' + encodeURIComponent(seqArr), // 불러 올 주소
		type: 'iframe',
		width: '90%',
		height: '90%',
		padding: 0,
		fitToView: false,
		autoSize: false,
		modal: true
	});
}

//이동요청
function storMvReq() {

	var orderGroupId = $('#orderGroupId').val();


	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var ordArr = ""
	var seqArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		ordArr = ordArr + "^" + rowItem.item.orderNo;
		seqArr = seqArr + "^" + rowItem.item.orderSeq;
	}
	// console.log("seqArr:"+seqArr);
	$.fancybox.open({
		href: '/order/stor-mv-req-up?orderGroupId=' + orderGroupId + '&ordArr=' + encodeURIComponent(ordArr) + '&seqArr=' + encodeURIComponent(seqArr), // 불러 올 주소
		type: 'iframe',
		width: '96%',
		height: '90%',
		padding: 0,
		fitToView: false,
		autoSize: false,
		modal: true
	});
}


//출고요청
function rlReq() {

	var orderGroupId = $('#orderGroupId').val();
	
	var rowItem;
	var ordArr = ""
	var seqArr = "";
	var stdClType = ""; //230705

	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		ordArr = ordArr + "^" + rowItem.item.orderNo;
		seqArr = seqArr + "^" + rowItem.item.orderSeq;
		if(rowItem.item.taxBillNo !=''){
			alert("세금계산서발행건은 더이상 수정할 수 없습니다.");
			return;
		}
		
		if (isEmpty(rowItem.item.clType) == true) { 
			alert("청구구분이 적용안된 품목은 선택할 수 없습니다."); return;
		}
		//보험과 일반 같이 요청 불가
		if (i == 0) { stdClType = rowItem.item.clType; }
		if (stdClType != rowItem.item.clType) {
			alert("보험건과 일반건은 같이 출고요청할 수 없습니다.\n청구구분을 확인하세요!"); return;
		}
	}
	//console.log("seqArr : " + seqArr)
	$.fancybox.open({
		href: '/logis/rl-req-up?orderGroupId=' + orderGroupId + '&ordArr=' + encodeURIComponent(ordArr) + '&seqArr=' + encodeURIComponent(seqArr) + '&stdClType=' + encodeURIComponent(stdClType), // 불러 올 주소
		type: 'iframe',
		width: '90%',
		height: '90%',
		padding: 0,
		fitToView: false,
		autoSize: false,
		modal: true
	});
}


//반입요청
function riReq() {
	var orderGroupId = $('#orderGroupId').val();

	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var ordArr = ""
	var seqArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		ordArr = ordArr + "^" + rowItem.item.orderNo;
		seqArr = seqArr + "^" + rowItem.item.orderSeq;
	}
	// console.log("seqArr:"+seqArr);
	$.fancybox.open({
		href: '/logis/ri-req-up?orderGroupId=' + orderGroupId + '&ordArr=' + encodeURIComponent(ordArr) + '&seqArr=' + encodeURIComponent(seqArr), // 불러 올 주소
		type: 'iframe',
		width: '90%',
		height: '90%',
		padding: 0,
		fitToView: false,
		autoSize: false,
		modal: true
	});
}


//반출요청
function roReq() {

	var orderGroupId = $('#orderGroupId').val();

	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var ordArr = ""
	var seqArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		ordArr = ordArr + "^" + rowItem.item.orderNo;
		seqArr = seqArr + "^" + rowItem.item.orderSeq;
	}
	// console.log("seqArr:"+seqArr);
	$.fancybox.open({
		href: '/logis/ro-req-up?orderGroupId=' + orderGroupId + '&ordArr=' + encodeURIComponent(ordArr) + '&seqArr=' + encodeURIComponent(seqArr), // 불러 올 주소
		type: 'iframe',
		width: '90%',
		height: '90%',
		padding: 0,
		fitToView: false,
		autoSize: false,
		modal: true
	});
}


function click_orderType(orderType) {
	if (orderType == 1) {
		$("#supplyCustCode").val("");
		$("#supplyCustName").val("");
		$("#supplyCustAdmName").val("");
		$("#supplyCustAdmPhone").val("");
		$("#supplyInfo-title").css("display", "none");
		$("#supplyInfo-input").css("display", "none");
	} else {
		$("#supplyInfo-title").css("display", "block");
		$("#supplyInfo-input").css("display", "block");
	}
}


//일반청구/보험청구 적용
function clTypeProc(clType) {

	var orderGroupId = $('#orderGroupId').val();

	//보험사가 등록안된건은 보험적용 안되게
	//console.log("보험:"+$("#insure1Code").val());
	//return;
	/*
	if (clType == '보험' && $("#insure1Code").val() == '') {
		alert("보험사정보가 등록안된 주문그룹은 보험적용을 할 수 없습니다.");
		return;
	}*/

	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) { alert("품목을 선택하세요!"); return; }

	var rowItem;
	var ordArr = "";
	var seqArr = "";
	var chkItem = "";
	var err1 = "N";
	var chkItem2 = "";
	var stdClType = checkedItems[0].item.clType;
	var chkChange = 0;
	var minusClYN = "N";
	
	//console.log("checkedItems.length :" + checkedItems.length)
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		ordArr = ordArr + "^" + rowItem.item.orderNo;
		seqArr = seqArr + "^" + rowItem.item.orderSeq;
//;console.log("checkin")
		//기청구된건 체크
		//if (isEmpty(rowItem.item.clType) == false) { chkItem = "N"; }
		/*
		if(rowItem.item.clYN == "Y" && rowItem.item.clType == "일반" && clType == "보험"){
			chkChange = chkChange +1
		}
		*/
		if((rowItem.item.clYN == "Y" && rowItem.item.clType == "일반" && clType == "보험") || ( rowItem.item.taxBillNo != '' && rowItem.item.clType == "일반" && clType == "보험")){
			chkChange = chkChange +1
			//console.log("chkChange : " + chkChange);
		}
		
		
		if (isEmpty(rowItem.item.clType) == false && rowItem.item.clReqYN != "Y") { chkItem = "N"; }
		if (isEmpty(rowItem.item.clType) == true && rowItem.item.clReqYN != "Y") { chkItem = "Y"; }
		if (rowItem.item.clReqYN == "Y" && rowItem.item.clReqChkYN == "" ) { err1 = "Y";}
		
		if(rowItem.item.clReqYN == "Y" && rowItem.item.clReqChkYN == "Y"){
			if(rowItem.item.clType != stdClType){alert("청구구분이 다르면 청구전환을 할 수 없습니다.\n청구구분을 확인하세요!"); chkItem2= "N"; return;}
			else{chkItem2="Y"}
		}
		
		
	}
	//console.log("chkChange : " + chkChange);
	if (chkChange == checkedItems.length) {
		if (!confirm("이미 기결된 청구입니다.\n변경하시겠습니까?")) { return; }
		minusClYN = "Y";
		changeClType('보험');
	} 
	
	if(err1 == "Y" && minusClYN != "Y"){alert("이미 청구요청된 품목은 청구구분을 변경할 수 없습니다!"); return;}

	/*
	if (chkItem == "N") {
		if (!confirm("이미 청구유형이 적용된 품목이 있습니다.\n변경하시겠습니까?")) { return; }
	} else {
		if (!confirm("적용 하시겠습니까?")) { return; }
	}
	*/
	if (chkItem == "N") {
		if (!confirm("이미 청구유형이 적용된 품목이 있습니다.\n변경하시겠습니까?")) { return; }
	} 
	if (chkItem == "Y"){
		if (!confirm("적용 하시겠습니까?")) { return; }
	}
/*
20240326 yoonsang 메모
#보험에서 일반전환 -> 공장부담금으로 처리

1. 공장부담금 -보험청구액 생성 , 공장부담금 +보험청구액 생성
2. -공장부담금은 보험과 같이 청구 후 기결 (ex) 청구액 : +50000 -50000 = 0 / 입금액 0 -> 기결

#일반에서 보험전환(세금계산서끊은경우) ->아래 조건 타면서(주문그룹상세에서 청구구분 일반 -> 보험으로 수정) -일반청구, +보험청구 생성

1. -일반청구 -> - 세금계산서 등록
2. +보험청구 -> 보험사에 청구 후 입금 받고 기결


	if (chkItem2 == "Y" && stdClType =="보험" && clType == "일반") {
		if (!confirm("이미 보험청구로 진행되었습니다.\n일반청구로 전환하시겠습니까?")) { return; }
		else {changeClType("일반");}
	} 


    // 2024.07.04 sg 아래 주석이 풀려 있었으나 ys가 이중으로 돌고 있다고 해서 주석처리
	if (chkItem2 == "Y" && stdClType =="일반" && clType == "보험"){
		if (!confirm("이미 일반청구로 진행되었습니다.\n보험청구로 전환하시겠습니까?")) { return; }
		else {changeClType("보험");}
	}
*/	

	var data = {};
	data.workingType = "CLTYPE_PROC";
	data.orderArr = ordArr;
	data.seqArr = seqArr;
	data.clType = clType;
	data.minusClYN = minusClYN;

	$.ajax({
		url: "/order/clTypeAdd",
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		success: function(data) {
			alert(data.result_code + ":" + data.result_msg);
			location.reload(true);
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});


}


//청구요청
function clReq() {

	var orderGroupId = $('#orderGroupId').val();
	
	let insure1AcceptNo = $('#insure1AcceptNo').val(); // 20231226 yoonsang 접수번호필수로 청구요청하도록
	//let insure2AcceptNo = $('#insure2AcceptNo').val();

/* 20231229 yoonsang 보험건만 적용해야해서 수정
	if (insure1AcceptNo == '') {
		alert("보험사1의 접수번호는 청구하기전 필수입력사항입니다.");
		return;
	}
	*/


	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var ordArr = ""
	var seqArr = "";
	var err1 = "N";
	var err2 = "N";
	//var err3 = "N";
	var chkMinusClCnt = 0;
	var stdClType = "";

	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		ordArr = ordArr + "^" + rowItem.item.orderNo;
		seqArr = seqArr + "^" + rowItem.item.orderSeq;

		//청구구분안된건 체크		
		if (isEmpty(rowItem.item.clType) == true) { err1 = 'Y'; }
		//기요청된건 체크		
		//if (rowItem.item.clReqYN == 'Y' || rowItem.item.clYN == 'Y') { err2 = 'Y'; }
		//if (rowItem.item.clReqYN == 'Y') { err2 = 'Y'; }
		//보험과 일반 같이 요청 불가
		if (i == 0) { stdClType = rowItem.item.clType; }
		//console.log("stdClType: " + stdClType);
		//console.log("clType: " + rowItem.item.clType);
		if (stdClType != rowItem.item.clType) {
			alert("보험청구와 일반청구는 같이 요청할 수 없습니다.\n청구구분을 확인하세요!"); return;
		}
		if (stdClType =='보험' && insure1AcceptNo == '') {
			alert("보험사1의 접수번호는 청구하기전 필수입력사항입니다.");
			return;
		}//20231229 수정
		if (rowItem.item.realReleaseCnt == 0) {
			err2 = "Y"
		}
		//console.log("rowItem.item.reinCnt : " + rowItem.item.reinCnt);
		//console.log("rowItem.item.taxBillNo : " + rowItem.item.taxBillNo);
		if(rowItem.item.reinCnt != 0 && rowItem.item.taxBillNo !=''){
			
			
			chkMinusClCnt++;
		}
		
	}
	if(chkMinusClCnt == checkedItems.length){
		//document.getElementById('btnNewDialog3').classList.toggle('abled');
		var btnNewDialog3 = document.getElementById('btnNewDialog3');
	    btnNewDialog3.classList.remove('disabled');
	    btnNewDialog3.classList.add('abled');
		
	}else {
	    var btnNewDialog3 = document.getElementById('btnNewDialog3');
	    btnNewDialog3.classList.remove('abled');
	    btnNewDialog3.classList.add('disabled');
	}

	if (err1 == 'Y') { alert("청구구분이 적용안된 품목은 선택할 수 없습니다."); return; }
	//if (err2 == 'Y') { alert("이미 청구요청된 건은 선택할 수 없습니다."); return; }
	if(err2 == "Y" && stdClType == '보험'){
		if (!confirm("출고수량이 0인 품목이 있습니다 정말 청구요청하시겠습니까?")){
			return;
		}
	}
	
	if (stdClType == '일반' && rowItem.item.realReleaseCnt == 0) {
	alert("출고수량이 0인 품목이 있습니다. 일반건은 출고가 되어야 청구 가능합니다."); // Display an appropriate message
	return;
}

    openOrderGroupDialog();
    //console.log("sdfsfa");
}

//기청구요청 체크 	
function openOrderGroupDialog() {
	var OrderGroupDialog;
	OrderGroupDialog = $("#dialog-form-orderGroup").dialog({
		//autoOpen: false,
		height: 500,
		//minWidth: 500,
		width: "60%",
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position: { my: "center", at: "center", of: window },
		buttons: {
		},
		close: function() {

		}
	});

	OrderGroupDialog.dialog("open");

	createOrderGroupGrid();

	//console.log("11111");
	findDataToServer("/order/cl-group-list")
}


function createOrderGroupGrid() {
	var columnLayout = [
		  { dataField: "clGroupId", headerText: "청구그룹ID" }
		//, { dataField: "clGroupId", headerText: "청구요청번호" }
		, { dataField: "clType", headerText: "보험/일반" }
		, { dataField: "carNo", headerText: "차량번호" }
		, { dataField: "custName", headerText: "주문처" }
		, { dataField: "insure1Name", headerText: "보험사1" }
		, { dataField: "insure1AcceptNo", headerText: "접수번호" }
		// ,{ dataField : "insure1AcciRate",      headerText : "과실"}
		, { dataField: "insure2Name", headerText: "보험사2" }
		, { dataField: "insure2AcceptNo", headerText: "접수번호" }
		//  ,{ dataField : "insure2AcciRate",      headerText : "과실"}
		, { dataField: "orderGroupId", headerText: "주문그룹ID" }
		, { dataField: "chkYN", headerText: "청구여부" }
		, { dataField: "confYN", headerText: "기결여부" }
		, { dataField: "taxBillNo", headerText: "세금계산서번호" }
	];

	var auiGridProps = {

		usePaging: true,
		pageRowCount: 30,
		showPageRowSelect: true,
		//showStateColumn: true,
		selectionMode: "multipleCells",
		showAutoNoDataMessage : false, 
		
		rowCheckableFunction: function (rowIndex, isChecked, item) {
		/*
			if (item.taxBillNo != "" && item.taxBillNo !=null) { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
				return false;
			}*/
			return true;
		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			/*
			if (item.taxBillNo != "" && item.taxBillNo !=null) { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
				return false; // false 반환하면 disabled 처리됨
			}*/
			return true;
		}
	};

	// 체크박스 칼럼 렌더러 표시 설정
	auiGridProps.showRowCheckColumn = true;

	auiGridProps.showStateColumn = true;

	// 체크박스 대신 라디오버튼 출력함
	auiGridProps.rowCheckToRadio = true;


	myGridID3 = AUIGrid.create("#grid_wrap_orderGroup", columnLayout, auiGridProps);

	var rowPos = 'first';



	AUIGrid.bind(myGridID3, "selectionChange", function(event) {
		var primeCell = event.primeCell;
	});


	var currentPage = 1;
	AUIGrid.bind(myGridID3, "pageChange", function(event) {
		currentPage = event.currentPage;
	});
}



function findDataToServer(url, page) {
	var list = [];

	var orderGroupId = $("#orderGroupId").val();
	var rowItem;
	var ordArr = ""
	var seqArr = "";
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		ordArr = ordArr + "^" + rowItem.item.orderNo;
		seqArr = seqArr + "^" + rowItem.item.orderSeq;
	}

	

	//console.log ("orderGroupId"+orderGroupId);
	//console.log ("checkedItems"+JSON.stringify(checkedItems));
	//console.log("url"+url);
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"orderGroupId": orderGroupId
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			/*
			if (data.reqList.length == 0) { //기청구요청내역이 없는경우 
				$("#dialog-form-orderGroup").dialog("close");
				$.fancybox.open({
									href: '/order/cl-req-up?orderGroupId=' + orderGroupId + '&ordArr=' + encodeURIComponent(ordArr) + '&seqArr=' + encodeURIComponent(seqArr), // 불러 올 주소
									type: 'iframe',
									width: '90%',
									height: '90%',
									padding: 0,
									fitToView: false,
									autoSize: false,
									modal: true
								});
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
			*/
				for (i = 0; i < data.clGroupList.length; i++) {
					//console.log("data" + data.reqList[i].confYN);
					list.push({
						regYmd: data.clGroupList[i].regYmd
						, carNo: data.clGroupList[i].carNo
						, clReqNo: data.clGroupList[i].clReqNo
						, orderGroupId: data.clGroupList[i].orderGroupId
						//,supCustName: data.reqList[i].supCustName 
						, custName: data.clGroupList[i].custName
						, clType: data.clGroupList[i].clType
						, procStep: data.clGroupList[i].procStep
						, billPubli: data.clGroupList[i].billPubli
						, insure1Name: data.clGroupList[i].insure1Name
						, insure1AcceptNo: data.clGroupList[i].insure1AcceptNo
						, insure1AcciRate: Math.round(data.clGroupList[i].insure1AcciRate)  +"%"
						, insure2Name: data.clGroupList[i].insure2Name
						, insure2AcceptNo: data.clGroupList[i].insure2AcceptNo
						, insure2AcciRate:Math.round(data.clGroupList[i].insure2AcciRate)+"%"
						, insure1CollAmt: data.clGroupList[i].insure1CollAmt
						, insure2CollAmt: data.clGroupList[i].insure2CollAmt
						, capitalAmt: data.clGroupList[i].capitalAmt
						, primeAmt: data.clGroupList[i].primeAmt
						, saleAmt: data.clGroupList[i].saleAmt
						, clAmt: data.clGroupList[i].clAmt
						, collectAmt: data.clGroupList[i].collectAmt
						, chkYN: data.clGroupList[i].chkYN
						, confYN: data.clGroupList[i].confYN						
						, clGroupId: data.clGroupList[i].clGroupId
						, taxBillNo: data.clGroupList[i].taxBillNo
					});
				}
				AUIGrid.setGridData(myGridID3, list);
				//console.log("list page:"+page);
				// 해당 페이지로 이동
				if (page > 1) {
					AUIGrid.movePageTo(myGridID, Number(page));
				}
			//}
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


$("#btnCloseDialog").click(function() {

	$("#dialog-form-orderGroup").dialog("close");
});

$("#btnNewDialog").click(function() {
	$("#dialog-form-orderGroup").dialog("close");
	
	var orderGroupId = $("#orderGroupId").val();
	var rowItem   ;
	var ordArr = ""
	var seqArr = "";
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	
		for (var i = 0, len = checkedItems.length; i < len; i++) {
			rowItem = checkedItems[i];
			ordArr = ordArr + "^" + rowItem.item.orderNo;
			seqArr = seqArr + "^" + rowItem.item.orderSeq;
		}
	//console.log("orderGroupId" + orderGroupId);
	//'console.log("checkedItems" + JSON.stringify(checkedItems));
	$.fancybox.open({
		href: '/order/cl-req-up?orderGroupId=' + orderGroupId + '&ordArr=' + encodeURIComponent(ordArr)
					 + '&seqArr=' + encodeURIComponent(seqArr), // 불러 올 주소
		type: 'iframe',
		width: '90%',
		height: '90%',
		padding: 0,
		fitToView: false,
		autoSize: false,
		modal: true
	});
});

$("#btnNewDialog2").click(function() {	
		
	if($("#clReqType").val()==''){
		alert("청구요청구분을 선택해주세요");
		return;
	}else{
		getCheckedRowItems('Y',"ADD");
		$("#dialog-form-orderGroup").dialog("close");
	}
});

$("#btnNewDialog3").click(function() {	
		
	if($("#clReqType").val()==''){
		alert("청구요청구분을 선택해주세요");
		return;
	}else{
		getCheckedRowItems('Y',"MINUS_ADD");
		$("#dialog-form-orderGroup").dialog("close");
	}
});


//청구요청 팝업창에서 선택버튼클릭 
$("#btnRegDialog").click(function() {
		if($("#clReqType").val()==''){
		alert("청구요청구분을 선택해주세요");
		return;
	}else{
		getCheckedRowItems("","ADD");
		$("#dialog-form-orderGroup").dialog("close");
	}
	
});


//주문그룹 선택 시  기존 주문번호 끌고오기  
function getCheckedRowItems(isNew,workingType) {
	//console.log("isNew:"+isNew);
	var checkedItem = AUIGrid.getCheckedRowItems(myGridID3);
	//console.log ("checkedItem" +JSON.stringify(checkedItem));
	//return;
	var orderGroupId = $("#orderGroupId").val();
	var rowItem;
	//var workingType = "ADD";
	var clType1 = ""; //기존청구요청타입
	var clType2 ="" //현재청구요청 타입
	var ordArr = ""
	var seqArr = "";
	var cntArr = "";
	var mm1Arr = "";
	var mm2Arr = "";
	var itemArr = "";
	var uPriArr = "";
	var clReqNo = '' ;
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);	
	var confYN = ""; 
	 var clReqType= $("#clReqType").val();
	 
	var insure1DcRateArr='0';
	var insure1ClPriArr='0';
	var insure2DcRateArr='0';
	var insure2ClPriArr='0';
	var centerPriArr='0'; 
	//var sPriArr='0';
	var sPriArr=""; 
	var expType= $("#expType").val();
	 
	clType2 = checkedItems[0].item.clType ; 
	
	if (checkedItem.length > 0) {
		confYN = checkedItem[0].item.confYN;
	} else {
		confYN = ''
	}
	//console.log("confYN" +confYN);
	//return;
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		ordArr = ordArr + "^" + rowItem.item.orderNo;
		seqArr = seqArr + "^" + rowItem.item.orderSeq;
		cntArr = cntArr +  "^" + rowItem.item.orderCnt;
		uPriArr = uPriArr +  "^" + rowItem.item.unitPrice;
		mm1Arr =mm1Arr  + "^"; 
		mm2Arr =mm2Arr  + "^";
		itemArr =itemArr  + "^"+ rowItem.item.itemId;
		
		insure1DcRateArr= insure1DcRateArr + "^0"; 
		insure1ClPriArr= insure1ClPriArr + "^0";
		insure2DcRateArr= insure2DcRateArr + "^0";
		insure2ClPriArr= insure2ClPriArr + "^0";
		centerPriArr= centerPriArr + "^0";		
		//sPriArr= sPriArr + "^0";
		sPriArr = sPriArr +  "^" + rowItem.item.salePrice;
	}
	
//console.log("checkedItems"+JSON.stringify(checkedItems));		
			
	//console.log("cntArr"+JSON.stringify(cntArr));						
	//console.log("uPriArr"+JSON.stringify(uPriArr));						
	if (checkedItems.length <= 0) {
		alert("청구번호를 선택해주세요");
		return;
	}
	
	
	
	if (isNew=='Y') {
		clReqNo = '';
		clType1 = clType2;
		clGroupId = '';
	}else{
		var rowItem = checkedItem[0].item;
		
		clReqNo = rowItem.clReqNo;
		clType1 = rowItem.clType; 
		clGroupId = rowItem.clGroupId;
		
		if (clType1 != clType2){
			alert( clType2 + "청구는 "+clType1 +"청구요청에 청구가 불가합니다.") ;
			return; 
		}	
	if(confYN == 'Y'){
		alert("이미 기결된 건에는 추가가 불가합니다. \n 새로운 청구요청을 생성해주세요");
		 return;
	}	
		
	}	
	if (clType1=="일반" &&  $("#expType").val()==''){
		alert("일반건은 증빙유형을 선택해주세요");
		return;
		}	
  
  var dataComCode = $("#dataComCode").val();  //2023.07.18 hsg - 데이터 소유
    if ( dataComCode == '' || dataComCode == undefined){
		alert("유효한 데이터가 아닙니다. 재로그하세요.")
		location.reload();
		return;
	}
	 
    
    $.ajax({
	    url : "/order/clReqAdd",
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			//"workingType" : "ADD",
			"workingType" : workingType,
			"orderGroupId" : orderGroupId,
			"clType" : clType1,
						
			"ordArr" : ordArr,    //주문번호
			"seqArr" : seqArr,    //주문순번
			"itemArr" : itemArr,    //발주거래처코드
			"cntArr" : cntArr,    //발주수량    			
			"mm1Arr" : mm1Arr,   //요천번호 
			"mm2Arr" : mm2Arr,    //요청순번
			"uPriArr" : uPriArr
			//,"clTypeArr" : clTypeArr
			,"insure1DcRateArr": insure1DcRateArr 
			,"insure1ClPriArr": insure1ClPriArr
			,"insure2DcRateArr":  insure2DcRateArr
			,"insure2ClPriArr":  insure2ClPriArr
			,"centerPriArr":  centerPriArr			
			,"clGroupId": clGroupId
			,"clReqType": clReqType
			,"sPriArr":  sPriArr
			,"dataComCode" : dataComCode  //2023.07.18 
			,"expType": expType  //증빙유형
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			parent.jQuery.fancybox.close();
			//parent.location.reload(true);
			//parent.location.href = "/order/cl-req-item-list?orderGroupId="+orderGroupId+"&clReqNo="+data.clReqNo;
			parent.location.href = "/order/cl-req-item-list?orderGroupId="+orderGroupId+"&clGroupId="+data.clGroupId;
			//location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
    
    /*  김보경매니저 소스 :디테일만 저장하는것이라서 위에 마스터포함하는 것으로 변경 . 2023.04.25 
	$.ajax({
	    url : "/order/clReqItemAdd",
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : workingType,
			"ordArr" : ordArr,   //요천번호 
			"seqArr" : seqArr,    //요청순번
			"cntArr" : cntArr,    //요청순번
			"uPriArr" : uPriArr,    //요청순번
			"clReqNo" : clReqNo,    //요청순번
			"orderGroupId" : orderGroupId,    //요청순번
			"mm1Arr" :mm1Arr, 
		    "mm2Arr" :mm2Arr,
		    "itemArr" :itemArr 		
		    ,"clGroupId" : clGroupId		
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			//parent.location.reload(true);
			location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});		
	*/	
}


function changeClType(clType){

//console.log("checkin")
	var ordArr = "";
	var seqArr = "";
	var itemArr = "";
	var orderGroupId = '';
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	
	var dataComCode = $("#dataComCode").val();  //2023.07.18 hsg - 데이터 소유
    if ( dataComCode == '' || dataComCode == undefined){
		alert("유효한 데이터가 아닙니다. 재로그하세요.")
		location.reload();
		return;
	}
	
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
			rowItem = checkedItems[i];
			ordArr = ordArr + "^" + rowItem.item.orderNo;
			seqArr = seqArr + "^" + rowItem.item.orderSeq;
			itemArr =itemArr  + "^"+ rowItem.item.itemId;
			orderGroupId = rowItem.item.orderGroupId;
		}
	

	   $.ajax({
		    url : "/order/clReqAdd",
		    dataType : "json",
		    type : "POST",
		    //contentType: "application/json; charset=utf-8",
		    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		    //data : data,
		    data : {
				"workingType" : "CHANGE",
				"orderGroupId" : orderGroupId,
				"clType" : clType,
							
				"ordArr" : ordArr,    //주문번호
				"seqArr" : seqArr,    //주문순번
				"itemArr" : itemArr,
				"dataComCode" : dataComCode

			},
		    success: function(data) {
		        //alert(data.result_code+":"+data.result_msg);
		        //창닫고. 부모창reload
				parent.jQuery.fancybox.close();
				//parent.location.reload(true);
				//parent.location.href = "/order/cl-req-item-list?orderGroupId="+orderGroupId+"&clReqNo="+data.clReqNo;
				parent.location.href = "/order/cl-req-item-list?orderGroupId="+orderGroupId+"&clGroupId="+data.clGroupId;
				//location.reload(true);
		    },
		    error:function(request, status, error){
		        alert("code:"+request.status+"\n"+"error:"+error);
		    }
		});
}


//인쇄 
//href="order/esti-up-print"
$("#print").click(function() {
	var orderGroupId = $("#orderGroupId").val();
	var printRiYN = "";
	var rowItem;
	var ordArr = ""
	var seqArr = "";
	var stdClType = "";
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		ordArr = ordArr + "^" + rowItem.item.orderNo;
		seqArr = seqArr + "^" + rowItem.item.orderSeq;
		if (i == 0) { stdClType = rowItem.item.clType; }		
		}
	//console.log("ordArr"+ordArr);
	//console.log("seqArr"+seqArr);
	//console.log("stdClType"+stdClType);
	
	//반입 출력여부
	var isPrintRiYN = $('input:checkbox[name=printRiYN]').is(':checked');
    if(isPrintRiYN == true){
		printRiYN = 'Y';
	}else{
		printRiYN = 'N';
	}
	//할인율 출력여부
	var printDcYN = "";
	var printDcYN = $('input[name="printDcYN"]:checked').val();
/*	
	var isPrintDcYN = $('input:checkbox[name=printDcYN]').is(':checked');		
	 if(isPrintDcYN == true){
		printDcYN = 'Y';
	}else{
		printDcYN = 'N';
	}
	*/
	/*
	var printNoYN = "";
	var isPrintNoYN = $('input:checkbox[name=printNoYN]').is(':checked');
	
    if(isPrintNoYN == true){
		printNoYN = 'Y';
	}else{
		printNoYN = 'N';
	}	*/
	
	//window.location.href = "/order/esti-up-print?estiNo="+estiNo+"&memoYN="+printMemoYN +"&printDcYN=" + printDcYN+"&printNoYN=" + printNoYN;
	//window.location.href = "/order/esti-up-print?estiNo="+ $("#estiNo").val();
	//console.log("stdClType"+stdClType);
	var url = "/order/order-group-print?orderGroupId=" + orderGroupId + "&printRiYN=" + printRiYN + "&printDcYN=" + printDcYN
						+'&ordArr=' + encodeURIComponent(ordArr)+ '&seqArr=' + encodeURIComponent(seqArr)+ "&stdClType=" + stdClType;
	window.open(url, "_blank");
	
});




$("#btnDownload").click(function() {
	var imgYN = "Y";
	var orderGroupId = $("#orderGroupId").val();
	var printRiYN = "";
	var rowItem;
	var ordArr = ""
	var seqArr = "";
	var stdClType = "";
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		ordArr = ordArr + "^" + rowItem.item.orderNo;
		seqArr = seqArr + "^" + rowItem.item.orderSeq;
		if (i == 0) { stdClType = rowItem.item.clType; }		
		}
	//반입 출력여부
	var isPrintRiYN = $('input:checkbox[name=printRiYN]').is(':checked');
    if(isPrintRiYN == true){
		printRiYN = 'Y';
	}else{
		printRiYN = 'N';
	}
	//할인율 출력여부
	var printDcYN = "";
	/*
	var isPrintDcYN = $('input:checkbox[name=printDcYN]').is(':checked');		
	 if(isPrintDcYN == true){
		printDcYN = 'Y';
	}else{
		printDcYN = 'N';
	}*/
	var printDcYN = $('input[name="printDcYN"]:checked').val();
	
	var url = "/order/order-group-print?orderGroupId=" + orderGroupId + "&printRiYN=" + printRiYN + "&printDcYN=" + printDcYN
						+'&ordArr=' + encodeURIComponent(ordArr)+ '&seqArr=' + encodeURIComponent(seqArr)+ "&stdClType=" + stdClType+ "&imgYN=" + imgYN;
	window.open(url, "_blank");
	
});




//엑셀업로드 버튼 클릭 
function print() {
	
	var dialogPrint;
	dialogPrint = $( "#dialogPrint-form" ).dialog({
	    autoOpen: false,
	    height: 350,
	    //minWidth: 500,
	    width: "30%",
	    modal: true,
	    buttons: {
	      /* "Create an account": addUser, */
	         "닫기": function() {
	        	 dialogPrint.dialog( "close" );
	      }
	    }, 
	    close: function() {
	      //$( "#batchFile" ).val("");	   	
	    }
	  });
	  $(".ui-dialog-titlebar-close").html("X");
	  dialogPrint.dialog( "open" );
}

function printReq() {

	var orderGroupId = $('#orderGroupId').val();

	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var ordArr = ""
	var seqArr = "";
	var err1 = "N";
	var err2 = "N";
	var err3 = "N";
	var stdClType = "";

	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		ordArr = ordArr + "^" + rowItem.item.orderNo;
		seqArr = seqArr + "^" + rowItem.item.orderSeq;

		//청구구분안된건 체크		
		if (isEmpty(rowItem.item.clType) == true) { err1 = 'Y'; }
		if (rowItem.item.clReqYN == 'Y') { err2 = 'Y'; }      
		//보험과 일반 같이 요청 불가
		if (i == 0) { stdClType = rowItem.item.clType; }
		//console.log("stdClType: " + stdClType);
		//console.log("clType: " + rowItem.item.clType);
		if (stdClType != rowItem.item.clType) {
			alert("보험청구와 일반청구는 같이 인쇄할 수 없습니다.\n청구구분을 확인하세요!"); return;
		}
		if (rowItem.item.realReleaseCnt == 0) {
			err2 = "Y"
		}
	}
	if (err1 == 'Y') { alert("청구구분이 적용안된 품목은 선택할 수 없습니다."); return; }	
	print() ;
}

function itemChk() {
	var allItems = AUIGrid.getGridData(myGridID);
		var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
		let rowArr = [];
		
		for (var i = 0, len = allItems.length; i < len; i++) {
			rowItem = allItems[i];
			rowId = rowItem[rowIdField];
			itemNo = AUIGrid.getCellValue(myGridID, i, "itemNo");
			if (itemNo !='' && itemNo !== undefined){
				rowArr.push(itemNo);
			}			
		}
		let rowArr2 = new Set(rowArr);
		let dupYn = false;
		var dupData = "";
		if(rowArr.length !== rowArr2.size){
			//console.log(rowArr);
			//console.log(rowArr2);
			//alert("중복건 존재!");
			for(let i = 0; i < rowArr.length; i++) {
				  const currElem = rowArr[i];
				  
				  for(let j = i+1; j < rowArr.length; j++) {
				    if(currElem === rowArr[j]) {
				      dupYn = true;
				      //break;
				      dupData = dupData + currElem + "^";
				    }
				  }
				  
			}			
 		    if(dupYn)  {
			    errRowStyleFunction(dupData);
			}			
		}else{
			 defaultRowStyleFunction();
			alert('중복건은 없습니다.')
		}
				
}
function errRowStyleFunction(idxArr) {
	// row Styling 함수를 다른 함수로 변경
	AUIGrid.setProp(myGridID, "rowStyleFunction", function (rowIndex, item) {
		var idxSplit = idxArr.split("^");  
		for ( var h in idxSplit ) {
			if (item.itemNo == idxSplit[h]) {
				return "auigrid-err-row-style";
			}
		}

		return "";
	});

	// 변경된 rowStyleFunction 이 적용되도록 그리드 업데이트
	AUIGrid.update(myGridID);
};

//return defult Style 2023.07.10 hsg
function defaultRowStyleFunction(idxArr) {
	// row Styling 함수를 다른 함수로 변경
	AUIGrid.setProp(myGridID, "rowStyleFunction", function (rowIndex, item) {

		return "";
	});

	// 변경된 rowStyleFunction 이 적용되도록 그리드 업데이트
	AUIGrid.update(myGridID);
};


//findSameCarNo_orderGroup 2023.10.10bk
function openOrderGroupIDDialog() {

	var OrderGroupIDDialog;
	OrderGroupIDDialog = $("#dialog-form-orderGroupID").dialog({
		height: 500,
		width: "55%",
		modal: true,
		headerHeight: 40,
		 position: { my: "center", at: "center", of: window },
		buttons: {
		},
		close: function() {
		}
	});

	OrderGroupIDDialog.dialog("open");
	createOrderGroupIdGrid();
	findDataToServer_OrderGroup("/order/order-group-list");
}

function createOrderGroupIdGrid() {
            
	var columnLayout = [ 
	 { dataField : "orderYmd",    headerText : "주문일자"} 
	 ,{ dataField : "orderGroupId",    headerText : "주문그룹ID",width: "100"
	  	,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
		        show : true,
		        tooltipHtml : '선택한 주문그룹ID로 현재 주문그룹이 병합됩니다.'
	    }}
	 ,{ dataField : "orderStatus",      headerText : "진행상태" ,visible: false}
	,{ dataField : "orderNo",   headerText : "주문번호",visible: false} 
	,{ dataField : "custCode",     headerText : "납품처코드"  ,visible: false}
	,{ dataField : "custName",     headerText : "주문처"  }
	,{ dataField : "supplyCustCode",   headerText : "주문처코드" ,visible: false }
	,{ dataField : "supplyCustName",   headerText : "주문처명" ,visible: false }
	,{ dataField : "clType",     headerText : "청구구분" }
	,{ dataField : "carNo",   headerText : "차번" }
	,{ dataField : "makerName",      headerText : "제조사"}
	,{ dataField : "carType",      headerText : "차종" }
	,{ dataField : "itemCnt",      headerText : "품목수"}
	,{ dataField : "salePrice",      headerText : "공급가액" ,dataType: "numeric",formatString: "#,##0", style:"right"}
	,{ dataField : "taxPrice",      headerText : "세액",dataType: "numeric",formatString: "#,##0", style:"right"}
	,{ dataField : "sumPrice",      headerText : "합계금액",dataType: "numeric",formatString: "#,##0", style:"right" }
	,{ dataField : "regUserName",      headerText : "등록자" }
	,{ dataField : "expectMarginRate",      headerText : "예상마진율",visible: false}
	,{ dataField : "uptUserName",      headerText : "수정자",visible: false}
	,{ dataField : "uptYmd",      headerText : "수정일자",visible: false}
	,{ dataField : "claimYN",      headerText : "청구여부",visible: false}
	,{ dataField : "collectYN",      headerText : "수금여부",visible: false}
				
];
	var auiGridProps2 = {
		usePaging: true,
		pageRowCount: 30,
		showPageRowSelect: true,
		selectionMode: "multipleCells",
		showAutoNoDataMessage: false,		
	};

	auiGridProps2.showRowCheckColumn = true;
	//auiGridProps2.showStateColumn = true;
	// 체크박스 대신 라디오버튼 출력함
	auiGridProps2.rowCheckToRadio = true;	
	
	myGridIDOrder = AUIGrid.create("#grid_wrap_orderGroupID", columnLayout, auiGridProps2);
	var rowPos = 'first';
	AUIGrid.bind(myGridIDOrder, "selectionChange", function(event) {
		var primeCell = event.primeCell;
	});
	var currentPage = 1;
	AUIGrid.bind(myGridIDOrder, "pageChange", function(event) {
		currentPage = event.currentPage;
	});
}
// 차량번호가 같은 주문그룹 찾기 
function findDataToServer_OrderGroup(url) {
	
	var list = [];
	var carNo  = $("#carNo").val();
    var ymdIgnoreYN = "Y";
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"ymdIgnoreYN":ymdIgnoreYN,
			"carNo":carNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){	
			if (data.orderGroupList.length == 0){	
				alert("조건에 맞는 자료가 없습니다.");							
			}else{
				for(i=0;i<data.orderGroupList.length;i++){	
					list.push({
						 orderGroupId: data.orderGroupList[i].orderGroupId 
						,orderYmd: data.orderGroupList[i].orderYmd 
						,orderNo: data.orderGroupList[i].orderNo 
						,custCode: data.orderGroupList[i].custCode
						,custName: data.orderGroupList[i].custName
						,custMgrName:data.orderGroupList[i].custMgrName
						,custMgrPhone:data.orderGroupList[i].custMgrPhone
						,supplyCustMgrName:data.orderGroupList[i].supplyCustMgrName
						,supplyCustMgrPhone:data.orderGroupList[i].supplyCustMgrPhone
						,supplyCustCode: data.orderGroupList[i].supplyCustCode 
						,supplyCustName: data.orderGroupList[i].supplyCustName
						,carNo: data.orderGroupList[i].carNo 
						,colorCode: data.orderGroupList[i].colorCode 
						,vinNo: data.orderGroupList[i].vinNo
						,memo1:data.orderGroupList[i].memo1
						,memo2:data.orderGroupList[i].memo2
						,makerCode: data.orderGroupList[i].makerCode 
						,makerName: data.orderGroupList[i].makerName 
						,carType: data.orderGroupList[i].carType 
						,regUserName: data.orderGroupList[i].regUserName
						,dcRate:data.orderGroupList[i].dcRate
						,dcDspType:data.orderGroupList[i].dcDspType
						,sumPrice: data.orderGroupList[i].salePrice + data.orderGroupList[i].taxPrice 
						,salePrice: data.orderGroupList[i].salePrice 
						,taxPrice: data.orderGroupList[i].taxPrice 
						,itemCnt: data.orderGroupList[i].itemCnt 
						,expectMarginRate: data.orderGroupList[i].expectMarginRate 
						,uptUserName: data.orderGroupList[i].uptUserName 
						,uptYmd: data.orderGroupList[i].uptYmd
						,claimYN: data.orderGroupList[i].claimYN
						,collectYN: data.orderGroupList[i].collectYN
						,insure1Code: data.orderGroupList[i].insure1Code
						,insure1Name: data.orderGroupList[i].insure1Name
						,insure1MgrName: data.orderGroupList[i].insure1MgrName
						,insure1MgrPhone: data.orderGroupList[i].insure1MgrPhone
						,insure2Code: data.orderGroupList[i].insure2Code
						,insure2Name: data.orderGroupList[i].insure2Name
						,insure2MgrName: data.orderGroupList[i].insure2MgrName
						,insure2MgrPhone: data.orderGroupList[i].insure2MgrPhone					
						,insure1AcceptNo: data.orderGroupList[i].insure1AcceptNo
						,insure1AcciRate: data.orderGroupList[i].insure1AcciRate
						,insure2AcceptNo: data.orderGroupList[i].insure2AcceptNo
						,insure2AcciRate: data.orderGroupList[i].insure2AcciRate
						,branchCode: data.orderGroupList[i].branchCode
						,taxBillNo: data.orderGroupList[i].taxBillNo
						,clType: data.orderGroupList[i].clType
					});				   
				}		
				 AUIGrid.setGridData("#grid_wrap_orderGroupID", list);		
			}
		},
		error:function(x,e){
			if(x.status==0){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)');
	        }else if(x.status==404){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Requested URL not found.)');
	        }else if(x.status==500){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Internel Server Error.)');
	        }else if(e=='parsererror'){
	            alert('시간경과로 로그아웃되었습니다.\n재로그인 후  다시 조회하세요.\n(Error.nParsing JSON Request failed.)');
	        }else if(e=='timeout'){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Request Time out.)');
	        }else {
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Unknow Error.n'+x.responseText+')');
	        }
		}
	});
}
//주문그룹 선택 시  기존 주문번호 끌고오기  
function getCheckedRowGroupItems() {
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridIDOrder);
	if (checkedItems.length <= 0) {
		alert("주문그룹을 선택해주세요");
		return;
	}
	var rowItem = checkedItems[0].item;
	var orderGroupId = $("#orderGroupId").val();
		if(rowItem.orderGroupId ==orderGroupId){
			alert("같은 주문그룹ID로는 변경이 불가합니다.");
			return;
		}
	
	changeOrderGroup('/order/orderGroupChange');
	//주문그룹 변경하기 
	function changeOrderGroup(url){
		var prevOrderGroupId =  $("#orderGroupId").val(); //삭제할 그룹ID
		var newOrderGroupId =  rowItem.orderGroupId;  //변경후 그룹ID
		
		var data = {};	
		data.workingType = "CHN";
		data.prevOrderGroupId = prevOrderGroupId;
		data.newOrderGroupId = newOrderGroupId;
	
		$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
			let f = document.createElement('form');    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'orderGroupId');
		    obj.setAttribute('value', newOrderGroupId);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/order-group-item-list');
		    document.body.appendChild(f);
		    f.submit();			
	
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});			
	}	
}

$("#btnCloseGroupDialog").click(function() {
	$("#dialog-form-orderGroupID").dialog("close");
});
	$("#btnRegGroupDialog").click(function() {//주문그룹변경 버튼을 누를경우
		getCheckedRowGroupItems();
		$("#dialog-form-orderGroupID").dialog("close");
	});



function createStockInReqGrid() {
    let stockInType = [ "위탁", "적재", "분실", "불량", "폐기"];
            
	const stockInReqColumnLayout = [
		{ dataField: "idx", headerText: "idx", width: 100, editable: false, visible: false }
		,{ dataField: "stockInType", headerText: "투입유형", width: 80, editable: false 
			,renderer: {			type: "DropDownListRenderer",	list: stockInType	}}
		,{ dataField: "orderNo", headerText: "주문번호", width: 120, editable: false }
		,{ dataField: "orderSeq", headerText: "주문순번", width: 60, editable: false }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }	 
		,{ dataField: "itemId", headerText: "부품ID", width: 90, editable: false }
		,{ dataField : "makerName",      headerText : "제조사명"  , width : 120, style : "left"   }
		,{ dataField: "itemNo", headerText: "품번", width: 100, editable: false }
		,{ dataField: "factoryNo", headerText: "공장품번", width: 100 }	
		,{ dataField: "itemName", headerText: "품명", width: 100, editable: false  ,style: "left" }
		,{ dataField: "stockInAbleQty", headerText: "투입가능수량", width: 80, editable: false }
		,{ dataField: "qty", headerText: "수량", width: 60, editable: true }
		,{ dataField: "memo1", headerText: "메모1", width: 300, editable: true ,style: "left"}
		,{ dataField: "memo2", headerText: "메모2", width: 300, editable: true  ,style: "left"}
	]
	const stockInReqAuiGridProps = {
		usePaging: true,
		pageRowCount: 30,
		showPageRowSelect: true,
		selectionMode: "multipleCells",
		showAutoNoDataMessage: false,		
		showRowCheckColumn : true,
		editable : true
		
	};

	 
	
	AUIGrid.create("#grid_wrap_stockInReq", stockInReqColumnLayout, stockInReqAuiGridProps);
	
	 
 
}	
//20240716 supi 재고투입 요청		
function stockInRequest()
{
	
	const checkRowItems = AUIGrid.getCheckedRowItems(myGridID);
	
	if(checkRowItems.length == 0)
	{
		alert("체크된 부품이 없습니다.");
		return;
	}
	//console.log(checkRowItems)
	const stockInReqItems = checkRowItems.filter((row)=>Math.max(row.item.whCnt+row.item.stockUseCnt-row.item.stoctInNotPlaceCnt - row.item.rlReqCnt, 0) + Math.max(row.item.reinCnt - row.item.roCnt , 0)- row.item.sirCnt>0)  // max(입고처리+창고사용처리-그린파츠발주 -출고,0) + max(반입처리-반출요청 , 0) 즉 재고투입갯수가 1이상인것만
															  .map((row)=>{
																	return {
																				... row.item,
//																				idx : row.item.idx , 
//																				orderNo : row.item.orderNo , 
//																				orderSeq : row.item.orderSeq ,
//																				itemId : row.item.itemId ,
//																				itemNo : row.item.itemNo ,
//																				itemName : row.item.itemName ,
																				stockInAbleQty : Math.max(row.item.whCnt+row.item.stockUseCnt-row.item.stoctInNotPlaceCnt  - row.item.rlReqCnt, 0) + Math.max(row.item.reinCnt - row.item.roCnt , 0)- row.item.sirCnt,
																				qty : 0 ,
																				memo1 : '',
																				memo2 : '', 
																			}
																});
	
	if(stockInReqItems.length == 0)
	{
		alert("체크된 부품중에 재고투입이 가능한 부품이 없습니다.");
		return;
	} 
	
	const dialog =  $("#dialog-form-stockInReq").dialog({
		 
		height: 420, 
		width: "55%",
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position: { my: "center", at: "center", of: window },
		buttons: {
		},
		close: function() {

		}
	});
	$("#dialog-form-stockInReq").dialog().parent().children('.ui-dialog-titlebar').children('.ui-dialog-titlebar-close').hide();
	 
	dialog.dialog("open");
	createStockInReqGrid();
	AUIGrid.setGridData("#grid_wrap_stockInReq" , stockInReqItems);
}

$("#iButton_stockInReq_ok").on('click',()=>{
	const stockInReqItems = AUIGrid.getCheckedRowItems("#grid_wrap_stockInReq");
	if(stockInReqItems.length == 0)
	{
		alert("체크된 부품이 없습니다.");
		return;
	}
	//2024.10.15 hsg
	if(stockInReqItems.find((row)=>row.item.stockInType===undefined)){
		alert("투입유형을 선택하세요.");
		return;
	}
	
	if(stockInReqItems.find((row)=>isNaN(row.item.qty)))
	{
		alert("요청수량에 숫자가 아닌 문자를 입력하셨습니다");
		return
	}
	if(stockInReqItems.find((row)=>row.item.qty<0))
	{
		alert("재고투입수량이 0보다 낮습니다");
		return
	}
	//체크된 부품중 수량이 1이상인 부품으로 필터
	const reqItem = stockInReqItems.filter((row)=>row.item.qty>0)
	
	if(reqItem.length == 0)
	{
		alert("체크된 부품의 수량이 모두 0개 입니다.");
		return;
	} 
	if(reqItem.find((row)=>row.item.qty>row.item.stockInAbleQty))
	{
		alert("재고투입가능수량보다 요청수량이 높습니다");
		return
	}
	
	stockInReqAdd(reqItem.map((row)=>row.item)); 
});
$("#iButton_stockInReq_close").on('click',()=>{
	 $("#dialog-form-stockInReq").dialog('close');
});


let progressInfo;  // 진행정보
 
 

function progressOpen( lastProgress)  //진행바 열어주고 최대치 정보 셋팅
{
	const progressInfo = {curProgress : 0 , progressBar: $("#progress-bar") ,lastProgress }; 
	 
	$("#cur").html(0);
	$("#last").html(lastProgress);
	
	
	dialogProgress = $( "#dialog-form-itemProgress" ).dialog({
	    autoOpen: false,
	    height: 100,
	    //minWidth: 500,
	    width: "25%",
	    modal: true,
 		open:()=>{
			progressInfo.progressBar.width(0);
		},
	    close: function() {
			progressInfo.progressBar.width(0);
			progressInfo.curProgress = -1; //다이얼로그가 닫히면 더 진행 안함 
	    }
	  });
	  $( "#dialog-form-itemProgress" ).dialog().parent().children(".ui-dialog-titlebar").children(".ui-dialog-titlebar-close").hide();
	  dialogProgress.dialog( "open" );
	  return progressInfo;
}
function progressSet(progressInfo , curProgress)
{
	if(progressInfo?.progressBar == null) return;
	progressInfo.curProgress = curProgress;
	progressInfo.progressBar.width(`${(progressInfo.curProgress * 100 / progressInfo.lastProgress)}%`);
	$("#cur").html(curProgress);
}


function stockInReqAdd(reqItem)
{
	const progressInfo = progressOpen( reqItem.length);
	const eArr = [];
	
	for(item of reqItem)
	{
		$.ajax({ url : '/order/stock-in-req-item-add' , 
		dataType : 'json',
		type : 'POST',
		async : false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data : {
				workingType : 'ADD_ORDER' ,
				orderNo : item.orderNo ,
				orderSeq : item.orderSeq , 
				cnt : item.qty , 
				memo1 : item.memo1,
				memo2 : item.memo2
				,stockInType : item.stockInType   //2024.10.15 hsg
		},
		success : (result)=>{ 
			 
			if(result.result_code == 'Err')
			{
				eArr.push(result);
			}
			 
		},
		error : (e)=>{
		}
		})
		progressSet(progressInfo , progressInfo.curProgress+1);
	}
	setTimeout(()=>{  
	 	if(eArr.length > 0)
	 	{
			alert(`처리실패\n${eArr.length}건의 요청이 실패하였습니다\n실패 : ${eArr.reduce((a,c)=>a+'\n'+c.result_msg,'')}`)
		}
		else 
		{
			alert('처리성공');
		} 
		$( "#dialog-form-itemProgress" ).dialog('close')
		$("#dialog-form-stockInReq").dialog('close');
		//location.reload();
	},550);
}
 