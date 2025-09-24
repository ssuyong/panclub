
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

const setTimeoutDelay = 250; // 입고, 원가 확인 및 취소 딜레이 (밀리세컨드)

$(".ui-dialog-titlebar-close").html("X");

/* Begin : Date Picker Date Range*/
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
	}/*,
    selectableRanges: [
        [today, new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())]
    ]*/
});
/* End : Date Picker Date Range*/

var datepicker = new tui.DatePicker('#wrapper', {
	language: 'ko',
	date: new Date(),
	input: {
		element: '#popWhYmd',
		format: 'yyyy-MM-dd'
	}
});

var datepicker2 = new tui.DatePicker('#wrapper2', {
	language: 'ko',
	input: {
		element: '#whYmd',
		format: 'yyyy-MM-dd'
	}
});

//place release Ymd
/* 
//230801 del plrl
var datepicker3 = new tui.DatePicker('#wrapper3', {
	language: 'ko',
	date: new Date(),
	input: {
		element: '#popPlRlYmd',
		format: 'yyyy-MM-dd'
	}
});
*/

var datepicker4 = new tui.DatePicker('#wrapper4', {
	language: 'ko',
	//date: new Date(),
	input: {
		element: '#whSchYmd',
		format: 'yyyy-MM-dd'
	}
});

var datepicker5 = new tui.DatePicker('#wrapper5', {
	language: 'ko',
	//date: new Date(),
	input: {
		element: '#rlSchYmd',
		format: 'yyyy-MM-dd'
	}
});

$("#whSchTime").timepicker({
    timeFormat: 'h:mm p',
    interval: 30,
    minTime: '09',
    maxTime: '6:00pm',
    defaultTime: '',
    startTime: '09:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
});

function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	
}

$(document).ready(function() {

	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);

	branchCodeSelect("/base/code-list");
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();

	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if (document.location.hash) {
		var HashLocationName = document.location.hash;
		HashLocationName = decodeURI(HashLocationName.replace('#info', '')); //decodeURI 한글깨짐처리 

		var info = HashLocationName.split("!");

		scrollYN = "Y";

		var page = info[0];
		var orderGroupId = info[1];
		var sYmd = info[2];
		var eYmd = info[3];
		var orderNo = info[4];
		var bizNo = info[5];
		
		var custCode = info[6];
		var whYmd = info[7];
		var custOrderNo = info[8];
		var whStatus = info[9];
		var whUnitPriceReg = info[10];
		var rcvCustCode = info[11];
		var branchCode = info[12];
		var whSchYmd = info[13];
		var itemId = info[14];
		var itemNo = info[15];
		var placeNo = info[16];
		var whSchTime = info[17];

		if (typeof orderGroupId == 'undefined') { orderGroupId = '' }
		if (typeof sYmd == 'undefined') { sYmd = '' }
		if (typeof eYmd == 'undefined') { eYmd = '' }
		if (typeof orderNo == 'undefined') { orderNo = '' }
		if (typeof bizNo == 'undefined') { bizNo = '' }
		
		if (typeof custCode == 'undefined') { custCode = '' }
		if (typeof whYmd == 'undefined') { whYmd = '' }
		if (typeof custOrderNo == 'undefined') { custOrderNo = '' }
		if (typeof whStatus == 'undefined') { whStatus = '' }
		if (typeof whUnitPriceReg == 'undefined') { whUnitPriceReg = '' }
		if (typeof rcvCustCode == 'undefined') { rcvCustCode = '' }
		if (typeof branchCode == 'undefined') { branchCode = '' }
		if (typeof whSchYmd == 'undefined') { whSchYmd = '' }
		if (typeof itemId == 'undefined') { itemId = 0 }
		if (typeof itemNo == 'undefined') { itemNo = '' }
		if (typeof placeNo == 'undefined') { placeNo = '' }
		if (typeof whSchTime == 'undefined') { whSchTime = '' }
	
		
		$("#orderGroupId").val(orderGroupId);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		$("#orderNo").val(orderNo);
	//	$("#bizNo").val(bizNo);
		$("input:radio[name='bizNo']:radio[value=" + bizNo + "]").prop('checked', true);
		
		$("#custCode").val(custCode);
		$("#whYmd").val(whYmd);
		$("#custOrderNo").val(custOrderNo);
		$("#whStatus").val(whStatus);
		$("#whUnitPriceReg").val(whUnitPriceReg);
		$("#rcvCustCode").val(rcvCustCode);
		$("#branchCode").val(branchCode);
	    $("#whSchYmd").val(whSchYmd);
		$("#itemId").val(itemId);
		$("#itemNo").val(itemNo);
		$("#placeNo").val(placeNo);
		$("#whSchTime").val(whSchTime);

		findDataToServer("/logis/wh-item-list", page);
	}

	$("#btnFind").click(function() {
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var orderGroupId_val = $("#orderGroupId").val();
		var orderNo_val = $("#orderNo").val();
		var bizNo_val = $(':radio[name="bizNo"]:checked').val();
		var custCode_val = $("#custCode").val();
		var whYmd_val = $("#whYmd").val();
		var custOrderNo_val = $("#custOrderNo").val();
		var whStatus_val = $("#whStatus").val();
		var whUnitPriceReg_val = $("#whUnitPriceReg").val();
		var rcvCustCode_val = $("#rcvCustCode").val();
		var branchCode_val = $("#branchCode").val();
	    var whSchYmd_val = $("#whSchYmd").val();
		var itemId_val = $("#itemId").val();
		var itemNo_val = $("#itemNo").val();
		var placeNo_val = $("#placeNo").val();
		var whSchTime_val = $("#whSchTime").val();
		
		//미입고품목에서 set 된건 초기화. 2014.04.15
		$("#placeNoArr").val("");
		$("#placeSeqArr").val("");
		
		document.location.hash = '#info' + currentPage + "!" + orderGroupId_val + "!" + sYmd + "!" + eYmd + "!" + orderNo_val + "!" + bizNo_val
		 + "!" + custCode_val + "!" + whYmd_val + "!" + custOrderNo_val + "!" + whStatus_val + "!" + whUnitPriceReg_val + "!" + rcvCustCode_val + "!" 
		 + branchCode_val + "!" + whSchYmd_val + "!" + itemId_val + "!" + itemNo_val
		  + "!" + placeNo_val+ "!" + whSchTime_val ;

		findDataToServer("/logis/wh-item-list", 1);
		datepicker2.setNull();
		datepicker4.setNull();
		datepicker5.setNull();
	});

	//미입고품목에서 넘어오는 경우. 2024.04.12
	let placeNoArr = $("#placeNoArr").val();	
	//console.log("placeArr:"+placeArr);
	//return;
	if (placeNoArr !=''){
		var currentPage = 1;
		let sYmd = document.getElementById("startpicker-input").value;
		let eYmd = document.getElementById("endpicker-input").value;
		//let ymdIgnoreYN = "Y";
		$('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true;
		var orderGroupId_val = "";
		var orderNo_val = $("#orderNo").val();
		var bizNo_val = $(':radio[name="bizNo"]:checked').val();
		var custCode_val = $("#custCode").val();
		var whYmd_val = $("#whYmd").val();
		var custOrderNo_val = $("#custOrderNo").val();
		var whStatus_val = $("#whStatus").val();
		var whUnitPriceReg_val = $("#whUnitPriceReg").val();
		var rcvCustCode_val = $("#rcvCustCode").val();
		var branchCode_val = $("#branchCode").val();
	    var whSchYmd_val = $("#whSchYmd").val();
		var itemId_val = $("#itemId").val();
		var itemNo_val = $("#itemNo").val();
		var placeNo_val = $("#placeNo").val();
		var whSchTime_val = $("#whSchTime").val();
		
		
		document.location.hash = '#info' + currentPage + "!" + orderGroupId_val + "!" + sYmd + "!" + eYmd + "!" + orderNo_val + "!" + bizNo_val
		 + "!" + custCode_val + "!" + whYmd_val + "!" + custOrderNo_val + "!" + whStatus_val + "!" + whUnitPriceReg_val + "!" + rcvCustCode_val + "!" 
		 + branchCode_val + "!" + whSchYmd_val + "!" + itemId_val + "!" + itemNo_val
		  + "!" + placeNo_val+ "!" + whSchTime_val ;

		findDataToServer("/logis/wh-item-list", 1, 'Y');
		
		//미입고품목에서 set 된건 초기화. 조회 시 등에서 사용될 가능성때문에.. 2014.04.15
		$("#placeNoArr").val("");
		$("#placeSeqArr").val("");
		
		datepicker2.setNull();
		datepicker4.setNull();
		datepicker5.setNull();
	}	
	
});

$("#btnUpt").click(function() {
	updateDataToServer3();
});

$("#btnPrint").click(function() {
	print();
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [
		{ dataField: "idx", headerText: "idx", width: 50, editable: false, visible: false }
		, { dataField: "printCnt", headerText: "인쇄", width: 40, editable: false }
		, { dataField: "gvComName", headerText: "발주요청업체명", width: 100, editable: false }
		, { dataField: "placeYmd", headerText: "발주일자", width: 80, editable: false }
		,{ dataField: "whSchYmd", headerText: "입고예상일", editable: false }//0705 BK 입고예상일 
		,{ dataField: "whSchTime", headerText: "예상시간", editable: false }//0911 BK 입고예상시간 
		,{ dataField: "rlSchYmd", headerText: "연동발주출고일", editable: false, visible: false }//2023.09.04
		, { dataField: "whYmd", headerText: "입고일자", width: 80, editable: false }
		, { dataField: "inDead", headerText: "마감일자", width: 80, editable: false, visible: false }
		, { dataField: "whNo", headerText: "입고번호", width: 90, editable: false }
		, { dataField: "whSeq", headerText: "입고순번", width: 60, editable: false, visible: false }
		, { dataField: "custCode", headerText: "발주처코드", width: 70, editable: false, visible: false }
		, { dataField: "custName", headerText: "발주처명", width: 100, editable: false, style: "left" }
		, { dataField: "rcvLogisCode", headerText: "수령물류센터", width: 80, editable: false , style: "left"}
		, { dataField: "rcvCustCode", headerText: "주문처코드", width: 100, editable: false, style: "left", visible: false  }
		, { dataField: "placeNo", headerText: "발주번호", width: 90, editable: false, styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link"; } return null; } }
		, { dataField: "placeSeq", headerText: "발주순번", width: 60, editable: false, visible: false }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		, { dataField: "itemId", headerText: "부품ID", width: 60, editable: false }

		,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false }
		, { dataField: "itemNo", headerText: "품번", width: 90, editable: false }
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
		, { dataField: "itemName", headerText: "품명", width: 120, editable: false, style: "left" }
		// 서부요청 모바일화면나오기전까지 납품처명땡겨서보고싶다
		, {
			dataField: "orderGroupId", headerText: "주문그룹ID", editable: false, width: 90,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link"; } return null; }
		}
		, { dataField: "rcvCustName", headerText: "주문처명", width: 100, editable: false, style: "left" }
		//,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		, { dataField: "cnt", headerText: "수량", width: 40, dataType: "numeric", formatString: "#,##0", style: "right", editable: false }
		, { dataField: "availableWhCnt", headerText: "입고가능수량", width: 80, dataType: "numeric", formatString: "#,##0" , style:"right" ,editable: false , visible: false}
		, { dataField: "whCnt", headerText: "입고수량", width: 60, dataType: "numeric", formatString: "#,##0" , style:"right  auigrid-must-col-style" }
		, { dataField: "saleUnitPrice", headerText: "판매단가", dataType: "numeric", formatString: "#,##0", style: "right", editable: false }
		, { dataField: "placeUnitPrice", headerText: "발주단가", dataType: "numeric", formatString: "#,##0", style: "right", editable: false, visible: false }
		, { dataField: "whUnitPrice", headerText: "입고단가", dataType: "numeric", formatString: "#,##0" , style:"right  auigrid-must-col-style" }
		, { dataField: "whSumPrice", headerText: "합계", dataType: "numeric", formatString: "#,##0", style: "right", editable: false }
		, { dataField: "plSumPrice", headerText: "발주총금액", dataType: "numeric", formatString: "#,##0" , style:"right", editable: false }
		, { dataField: "rlUnitPrice", headerText: "출고단가", dataType: "numeric", formatString: "#,##0" , style:"right", editable: false }
		, { dataField: "branchCode", headerText: "관리지점", width: 68, editable: false, style: "left" }
		, { dataField: "placeRegUserId", headerText: "요청자", width: 86,editable: false , visible: false  }
		, { dataField: "whRegUserId", headerText: "처리자", editable: false, visible: false   }
		, { dataField: "placeRegUserName", headerText: "요청자명", width: 68,editable: false }
		, { dataField: "printUser", headerText: "수정자", width: 68,editable: false }
		, { dataField: "whRegUserName", headerText: "처리자명", width: 68,editable: false }
		, { dataField: "whStatus", headerText: "입고상태", width: 68,editable: false }
		, { dataField: "whUnitPriceReg", headerText: "입고가등록",width: 68, editable: false }
		, { dataField: "buyChk", headerText: "매입확정", width: 68,editable: false , visible: false}
		, { dataField: "withdrawStatus", headerText: "출금상태", width: 68,editable: false , visible: false}
		//, { dataField: "reout", headerText: "반출", editable: false }
		, { dataField: "dlvType", headerText: "배송유형", style: "left",width: 120, editable: false, visible: false }//2023.09.04
		, { dataField: "memo1", headerText: "비고1", style: "left",width: 120, editable: false }
		, { dataField: "memo2", headerText: "비고2", style: "left",width: 120, editable: false }
		, { dataField: "ref1", headerText: "참고1", style: "left",width: 120, editable: false }
		, { dataField: "ref2", headerText: "참고2", style: "left",width: 120, editable: false }
		, { dataField: "custOrderNo", headerText: "거래처주문번호", width: 100, editable: false }
		, { dataField: "placeHms", headerText: "발주시간", width: 68, editable: false }
		, {
			dataField: "orderNo", headerText: "주문번호", editable: false, width: 90,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link"; } return null; }
		}
		, { dataField: "orderSeq", headerText: "주문순번", editable: false, visible: false }
		, { dataField: "storageCode", headerText: "입고예정창고코드", style: "left", editable: false, visible: false }
		, { dataField: "storageName", headerText: "입고예정창고명", style: "left", editable: false, visible: false }
		, { dataField: "rackCode", headerText: "입고예정랙코드", style: "left", editable: false, visible: false }
		, { dataField: "rackName", headerText: "입고예정랙명", style: "left", editable: false, visible: false }
		, { dataField: "priceChkYmd", headerText: "입고가확일일", editable: false, visible: false }
	];

	// 푸터 설정
	var footerLayout = [{
		labelText: "∑",
		positionField: "#base",
		style: "aui-grid-my-column"
	}, {		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0"		, style: "right"
	}, {		dataField: "whUnitPrice",		positionField: "whUnitPrice",		operation: "SUM",		formatString: "#,##0"		, style: "right"
	}, {		dataField: "whSumPrice",		positionField: "whSumPrice",		operation: "SUM",		formatString: "#,##0"		, style: "right"
	}, {		dataField: "whCnt",		positionField: "whCnt",		operation: "SUM",		formatString: "#,##0"		, style: "right"
	}, {		dataField: "saleUnitPrice",		positionField: "saleUnitPrice",	operation: "SUM",		formatString: "#,##0"		, style: "right"
	}, {		dataField: "rlUnitPrice",		positionField: "rlUnitPrice",	operation: "SUM",		formatString: "#,##0"		, style: "right"
	}];

	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		selectionMode: "multiRow",
		editable: true,
		// 상태 칼럼 사용
		showStateColumn: true,
		rowIdField: "idx",
		showRowCheckColumn: false,

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,

		//footer 노출
		showFooter: true,

		showAutoNoDataMessage: false,
		independentAllCheckBox: true,    // 전체 선택 체크박스가 독립적인 역할을 할지 여부

		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
		
		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
//		rowCheckableFunction: function(rowIndex, isChecked, item) {
//			if (item.product == "LG G3") { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
//				return false;
//			}
//			return true;
//		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		//*
		rowCheckDisabledFunction: function(rowIndex, isChecked, item) {
			if (item.buyChk =="Y") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
				return false; // false 반환하면 disabled 처리됨
			}
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

	AUIGrid.bind(myGridID, "cellDoubleClick", function(event) {

		if (event.dataField == 'placeNo') {
		/*	let f = document.createElement('form');

			let obj;
			obj = document.createElement('input');
			obj.setAttribute('type', 'hidden');
			obj.setAttribute('name', 'placeNo');
			obj.setAttribute('value', event.value);

			f.appendChild(obj);
			f.setAttribute('method', 'post');
			f.setAttribute('action', '/order/place-up');
			document.body.appendChild(f);
			f.submit();*/
			var placeNo = event.value;
			var url = '/order/place-up?placeNo=' + placeNo;
			 var options = 'width=800,height=500'; 
			var newWindow = window.open(url, '_blank',options);
			 newWindow.focus();
			}
		
		if (event.dataField == 'orderGroupId') {
			let f = document.createElement('form');

			let obj;
			obj = document.createElement('input');
			obj.setAttribute('type', 'hidden');
			obj.setAttribute('name', 'orderGroupId');
			obj.setAttribute('value', event.value);

			f.appendChild(obj);
			f.setAttribute('method', 'post');
			f.setAttribute('action', '/order/order-group-item-list');
			document.body.appendChild(f);
			f.submit();

		}
		if (event.dataField == 'orderNo') {
			let f = document.createElement('form');

			let obj;
			obj = document.createElement('input');
			obj.setAttribute('type', 'hidden');
			obj.setAttribute('name', 'orderNo');
			obj.setAttribute('value', event.value);

			f.appendChild(obj);
			f.setAttribute('method', 'post');
			f.setAttribute('action', '/order/order-up');
			document.body.appendChild(f);
			f.submit();

		}
	})
		AUIGrid.bind(myGridID, "rowAllChkClick", function (event) {
		if (event.checked) {
			// name 의 값들 얻기
			var uniqueValues = AUIGrid.getColumnDistinctValues(event.pid, "buyChk");
			// Anna 제거하기
			uniqueValues.splice(!uniqueValues.indexOf(""), 1);
                                   //uniqueValues.splice(uniqueValues.indexOf(""Y""), 2);
			AUIGrid.setCheckedRowsByValue(event.pid, "buyChk", uniqueValues);
		} else {
			AUIGrid.setCheckedRowsByValue(event.pid, "buyChk", []);
		}
	}); 	

	/*
	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID, "ready", function(event) {
		// ready 이벤트를 바인딩하여 데이터에 맞게 초기 화면설정 작업을 하십시오.
		
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
	
	// keyDown 이벤트 바인딩: 스페이스바 클릭시 체크박스  toggle. 2023.08.01. hsg
	AUIGrid.bind(myGridID, "keyDown",	function(event) {
		// 정보 출력
		//console.log( "keyCode : " + event.keyCode );

		
		if(event.keyCode == 32) { // 스페이스바 키
			var selectedItems = AUIGrid.getSelectedItems(event.pid);
			var rowIndex = selectedItems[0].rowIndex;
			
			var rowItem, rowInfoObj
			rowInfoObj = selectedItems[0];
			rowItem = rowInfoObj.item;
			if (rowItem.buyChk == 'Y') {  //비활성화 조건의 체크박스는 체크안되게..
				return true;	
			}			
		
			//var items = [rowIndex];
			//AUIGrid.setCheckedRowsByIds(myGridID, items);
		    
		    //AUIGrid.addCheckedRowsByValue(myGridID, "idx", rowIndex);
		    //console.log("AUIGrid.isCheckedRowById(myGridID, rowIndex):"+AUIGrid.isCheckedRowById(myGridID, rowIndex));
		    if (AUIGrid.isCheckedRowById(myGridID, rowIndex)) {
				// 엑스트라 체크박스 체크해제 추가
				//AUIGrid.addUncheckedRowsByIds(myGridID, "idx", rowIndex);
				AUIGrid.addUncheckedRowsByValue(myGridID, "idx", rowIndex);
			} else {
				// 엑스트라 체크박스 체크 추가
				//AUIGrid.addCheckedRowsByIds(myGridID, "idx", rowIndex);
				AUIGrid.addCheckedRowsByValue(myGridID, "idx", rowIndex);
			}
		
			//if(rowIndex === AUIGrid.getRowCount(event.pid) - 1) { // 마지막 행인지 여부 
			//	AUIGrid.addRow(event.pid, {}); // 행 추가
			//	return false; // 엔터 키의 기본 행위 안함.
			//}
		}
		return true; // 기본 행위 유지
	});

};


function auiCellEditingHandler(event) {
	/*
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 종료(cellEditEnd) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
		
		if (event.dataField == 'itemNo'){ 
			$("#pop_itemNo").val(event.value);
			$("#pop_itemName").val();
			findItem('/base/item-list');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
		}		
	} else if (event.type == "cellEditCancel") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	}
	*/

	if (event.dataField == 'whCnt' || event.dataField == 'whUnitPrice') {
		var whSumPrice = event.item.whCnt * event.item.whUnitPrice;
		AUIGrid.updateRow(myGridID, { "whSumPrice": whSumPrice }, event.rowIndex);
		

		//fn_dcProc();	
	}

};


// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;

//다이얼로그창 선택하는 경우 그리드에 디스플레이
function updateGridRow() {
	var mCodeSel = $("#mCode option:selected"); //$("#memberSel option:selected").text();
	var mCode = mCodeSel.val();
	var mName = mCodeSel.attr('mname');

	
	

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
	// parameter
	// item : 삽입하고자 하는 아이템 Object 또는 배열(배열인 경우 다수가 삽입됨)
	// rowPos : rowIndex 인 경우 해당 index 에 삽입, first : 최상단, last : 최하단, selectionUp : 선택된 곳 위, selectionDown : 선택된 곳 아래
	//AUIGrid.addRow(myGridID, item, rowPos);
	AUIGrid.addRow(myGridID, item, rowPos);
};


// 데이터 서버로 보내기
function updateDataToServer(url, workingType) {

	var placeNo = $("#placeNo").val();
	var custCode = $("#custCode").val();
	var custMgrName = $("#custMgrName").val();
	var custMgrPhone = $("#custMgrPhone").val();
	var supplyCustCode = $("#supplyCustCode").val();
	var supplyMgrName = $("#supplyMgrName").val();
	var supplyMgrPhone = $("#supplyMgrPhone").val();
	var placeDmdYmd = $("#placeDmdYmd").val();
	var whSchYmd = $("#whSchYmd").val();
	var turnNum = $("#trunNum").val();
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

	var isValid1 = AUIGrid.validateGridData(myGridID, ["itemNo", "whUnitPrice", "cnt"], "품번, 수량, 입고단가 필드는 반드시 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["itemNo", "cnt", "whUnitPrice"], "품번, 수량, 입고단가 필드는 반드시 유효한 값을 직접 입력해야 합니다.");

	if (isValid1 == false || isValidChanged1 == false) {
		return;
	}

	var data = {};

	if (addList.length > 0) data.placeItemAdd = addList;
	else data.placeItemAdd = [];

	if (updateList.length > 0) data.placeItemUpdate = updateList;
	else data.placeItemUpdate = [];

	if (removeList.length > 0) data.placeItemRemove = removeList;
	else data.placeItemRemove = [];

	data.workingType = workingType;
	data.placeNo = placeNo;
	data.custCode = custCode;
	data.custMgrName = custMgrName;
	data.custMgrPhone = custMgrPhone;
	data.custMgrName = custMgrName;
	data.custMgrPhone = custMgrPhone;
	data.supplyCustCode = supplyCustCode;
	data.supplyMgrName = supplyMgrName;
	data.supplyMgrPhone = supplyMgrPhone;
	data.placeDmdYmd = placeDmdYmd;
	data.whSchYmd = whSchYmd;
	data.turnNum = turnNum;
	data.memo1 = memo1;
	data.memo2 = memo2;

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			//alert("성공:"+data.success);
			
			alert(data.result_code + ":" + data.result_msg);
			//alert(data.estiNo)
			//location.reload();


			//post형식으로 페이지 데이터 조회
			let f = document.createElement('form');

			let obj;
			obj = document.createElement('input');
			obj.setAttribute('type', 'hidden');
			obj.setAttribute('name', 'placeNo');
			obj.setAttribute('value', data.placeNo);

			f.appendChild(obj);
			f.setAttribute('method', 'post');
			f.setAttribute('action', '/order/place-up');
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



// 이겅
//발주품목 조회
function findDataToServer(url, page, noWhYN) {
	var list = [];

	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true) {
		ymdIgnoreYN = "Y";
	}

	var custCode = $("#custCode").val();
	var whYmd = $("#whYmd").val();
	var orderNo = $("#orderNo").val();
	var orderGroupId = $("#orderGroupId").val();
	var workingType = "PLACE_LIST";
	var bizNo = $(':radio[name="bizNo"]:checked').val();
	var whYmd = $("#whYmd").val();
	var custOrderNo = $("#custOrderNo").val();

	var whStatus = $("#whStatus").val();
	var whUnitPriceReg = $("#whUnitPriceReg").val();
	
	var rcvCustCode = $("#rcvCustCode").val();
	var branchCode = $("#branchCode").val();

	var whSchYmd = $("#whSchYmd").val();
	
	var itemId = $("#itemId").val();
	if(itemId == ''){itemId = 0;}
	var itemNo = $("#itemNo").val();
	
	var placeNo = $("#placeNo").val();
	
	var rlSchYmd = $("#rlSchYmd").val(); //0904 bk 발주처 출고일
	var dlvType = $("#dlvType").val(); //0904 bk 배송유형
	var whSchTime = $("#whSchTime").val(); //0911 bk 입고예상시간
	
	const gvComCode = $("#gvComCode").val();
	
	//2024.04.12
	//if (noWhYN == 'Y') {
		let placeNoArr =  $("#placeNoArr").val();
		let placeSeqArr =  $("#placeSeqArr").val();
		if (placeNoArr != '' ) {
			ymdIgnoreYN = 'Y';
		}
	//}
	
	//console.log("placeNoArr"+placeNoArr);
	//console.log("placeSeqArr"+placeNoArr);
	//console.log("ymdIgnoreYN"+ymdIgnoreYN);
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"workingType": workingType,
			"sYmd": sYmd,
			"eYmd": eYmd,
			"ymdIgnoreYN": ymdIgnoreYN,
			"custCode": custCode,
			"orderNo": orderNo,
			"orderGroupId": orderGroupId
			, "bizNo": bizNo
			, "whYmd": whYmd
			, "custOrderNo": custOrderNo
			, "whStatus": whStatus
			, "whUnitPriceReg": whUnitPriceReg
			
			, "rcvCustCode": rcvCustCode
			, "branchCode": branchCode
			, "whSchYmd": whSchYmd
			
			, "itemId": itemId
			, "itemNo": itemNo
			
			, "placeNo": placeNo
			, "rlSchYmd": rlSchYmd
			, "dlvType": dlvType
			, "whSchTime": whSchTime
			, gvComCode
			,"placeNoArr" : placeNoArr     //2024.04.12
			,"placeSeqArr" : placeSeqArr  //2024.04.12
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			//console.log({url,data});
			if (data.whItemList.length == 0) {
			//	alert("조건에 맞는 자료가 없습니다.");
				$("#iDiv_noDataPop").css("display","block");		
				AUIGrid.clearGridData(myGridID);
			} else {

				for (i = 0; i < data.whItemList.length; i++) {
					list.push({
						idx: i
						, placeYmd: data.whItemList[i].placeYmd
						, whYmd: data.whItemList[i].whYmd
						, whNo: data.whItemList[i].whNo
						, custCode: data.whItemList[i].custCode
						, custName: data.whItemList[i].custName
						, placeNo: data.whItemList[i].placeNo
						, placeSeq: data.whItemList[i].placeSeq
						, custOrderNo: data.whItemList[i].custOrderNo
						, makerName: data.whItemList[i].makerName
						, itemId: data.whItemList[i].itemId
						, itemNo: data.whItemList[i].itemNo
						, itemName: data.whItemList[i].itemName
						, itemNameEn: data.whItemList[i].itemNameEn
						, saleUnitPrice: data.whItemList[i].saleUnitPrice
						, cnt: data.whItemList[i].cnt
						, whCnt: data.whItemList[i].whCnt
						, whUnitPrice: data.whItemList[i].whUnitPrice
						, whSumPrice: data.whItemList[i].whSumPrice
						, placeRegUserId: data.whItemList[i].placeRegUserId
						, whRegUserId: data.whItemList[i].whRegUserId
						, whStatus: data.whItemList[i].whStatus
						, whUnitPriceReg: data.whItemList[i].whUnitPriceReg
						, buyChk: data.whItemList[i].buyChk
						, withdrawStatus: data.whItemList[i].withdrawStatus
						, reout: data.whItemList[i].reout
						, memo1: data.whItemList[i].memo1
						, memo2: data.whItemList[i].memo2

						, storageCode: data.whItemList[i].storageCode
						, storageName: data.whItemList[i].storageName
						, rackCode: data.whItemList[i].rackCode
						, rackName: data.whItemList[i].rackName

						, orderGroupId: data.whItemList[i].orderGroupId
						, orderNo: data.whItemList[i].orderNo
						, orderSeq: data.whItemList[i].orderSeq

						, whSeq: data.whItemList[i].whSeq
						, priceChkYmd: data.whItemList[i].priceChkYmd
						, placeUnitPrice: data.whItemList[i].placeUnitPrice
						, rcvCustCode: data.whItemList[i].rcvCustCode
						, rcvCustName: data.whItemList[i].rcvCustName
						, branchCode: data.whItemList[i].branchCode
					
						, placeRegUserName: data.whItemList[i].placeRegUserName
						, whRegUserName: data.whItemList[i].whRegUserName
						, inDead: data.whItemList[i].inDead
						
						, availableWhCnt: data.whItemList[i].availableWhCnt
						, whSchYmd: data.whItemList[i].whSchYmd //0705 BK 입고예상일
						
						,printCnt :   data.whItemList[i].printCnt //0707 프린트 횟수
						,printUser: data.whItemList[i].printUser //0707
						,placeHms: data.whItemList[i].placeHms //0714 bk 
						
						,rlUnitPrice: data.whItemList[i].rlUnitPrice						

						,ref1: data.whItemList[i].ref1		//0822 bk				
						,ref2: data.whItemList[i].ref2		//0822 bk				

						,rlSchYmd: data.whItemList[i].rlSchYmd		//0904 bk				
						,dlvType: data.whItemList[i].dlvType		//0904 bk		
						
						,whSchTime: data.whItemList[i].whSchTime		//0904 bk 입고예상시간				
						,plSumPrice: data.whItemList[i].plSumPrice		//0904 bk	발주서 금액			
						
						,gvComCode:data.whItemList[i].gvComCode
						,gvComName:data.whItemList[i].gvComName
								
						,rcvLogisCode : (data.whItemList[i].rcvLogisCode ?? '')
						
						,className :data.whItemList[i].className
						,factoryNo :data.whItemList[i].factoryNo
					});

					//firstGrid_mst.setData(list); // 그리드에 데이터 설정

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


// 창고입고 완료 버튼 클릭 시 팝업
function whUp(url) {

	var custCode = $(':radio[name="custCode"]:checked').val();
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	//창고목록
	commonFindStor("/base/storage-list", 1,'popStorageCode','','','', 'Y', 'Y');
	
	var custCodeStd = "";
	var custCodeNow = "";
	var custNameStd = "";

	var storageCodeStd = "";
	var storageNameStd = "";
	var rackCodeStd = "";
	var rackNameStd = "";
	var wdStd = "";  //출금기준
	var placeStd = ""; //발주번호
	
	//var alltems = AUIGrid.getCheckedRowItems(myGridID);
	var rowItemA;
	var rowIdField = AUIGrid.getProp(myGridID, "idx");
	var rowId;
	var checked;
	var diffIdx;
	var err1 = 0;
	var err1Msg = '';
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItemA = checkedItems[i];
		if (i == 0) {
			custCodeStd = rowItemA.item.custCode;
			custNameStd = rowItemA.item.custName;
			storageCodeStd = rowItemA.item.storageCode;
			storageNameStd = rowItemA.item.storageName;
			rackCodeStd = rowItemA.item.rackCode;
			rackNameStd = rowItemA.item.rackName;
			
			wdStd = rowItemA.item.withdrawStatus;
			placeStd = rowItemA.item.placeNo;
			
		} else {
			custCodeNow = rowItemA.item.custCode;
			diffIdx = rowItemA.item.idx;
		}

		if (i != 0 && custCodeStd != custCodeNow) {

			rowId = rowItemA[rowIdField];
			checked = AUIGrid.isCheckedRowById(myGridID, rowId);
			
			alert("동일한 발주처만 선택하세요.");
			return;
		}
		
		//입고된것 창고입고 안되게 처리
		/*
		if (isEmpty(rowItemA.item.whNo) == false ) {
			
			alert("이미 입고된 품목이 선택되었습니다.");
			return;
		}
		*/
        //출금상태가 요청 또는 완료로 공백이 아닌 경우 발주번호가 다른 경우 창고입고 안되게 처리.
		//if (isEmpty(rowItemA.item.withdrawStatus) == false && placeStd !=  rowItemA.item.placeNo) {//출금상태가 공백이 아니면서
		//출금상태가 있는 것과 없는 것은 같이 창고입고할수 없음.
		if (  (isEmpty(rowItemA.item.withdrawStatus) == false && isEmpty(wdStd)==true)
		   || (isEmpty(rowItemA.item.withdrawStatus) == true && isEmpty(wdStd)==false) ) {
			
			
			alert("출금요청된 품목과 아닌 품목은 같이 입고처리 할 수 없습니다.\n출금요청건 미출금요청건 각각 입고 처리하세요.");
			return;		
		}
		
		price = rowItemA.item.whUnitPrice;
		qty = rowItemA.item.whCnt;
		
		
		if ($.isNumeric(qty) == false || qty <=0 ){
			alert("입고수량은 1개 이상이어야 합니다. "+parseInt(i+1)+"번째 품목");
			return;
		}
		
		if ($.isNumeric(price) == false || price <=0) {
			err1 = err1 + 1;
			err1Msg = err1Msg + ' ' + parseInt(i+1) ;
		} 
	}
	
	if (err1>0) {
		if (!confirm("입고단가가 0원인 품목이 "+err1+' 건 존재합니다.('+err1Msg+ ' 번째 품목)\n그래도 입고처리하시겠습니까?')){
			return;
		}
	}
	
	$.ajax({
		url: "/getRelationYN",
		dataType: "json",
		type: "POST",
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		async : false ,
		data: {
			com : lcd,  
			com2 : checkedItems[0].item.custCode
		},
		success: function(data) {
			if(data && checkedItems[0].item.custCode =='ㄱ121' && checkedItems.find((row)=>row.item.orderGroupId!=null))
			{
				alert('지점법인에선 그린파츠발주를 입고할수 없습니다.')
				return;	
			}
			//창고입고 팝업
			$("#popCustName").val(custNameStd);
			$("#popCustCode").val(custCodeStd);
			$("#popStorageName").val(storageNameStd);
			$("#popStorageCode").val(storageCodeStd);
			$("#popRackName").val(rackNameStd);
			$("#popRackCode").val(rackCodeStd);
			$(".ui-dialog-titlebar-close").html("X");
			var dialogItem;
			dialogItem = $("#dialog-form").dialog({
				//autoOpen: false,
				height: 500,
				//minWidth: 500,
				width: 400,
				modal: true,
				headerHeight: 40,
				//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
				position: [400, 400],
				buttons: {
					"확인": whUpProc,
					"취소": function(event) {
						dialogItem.dialog("close");
					}
				},
				close: function() {
					// $( "#users tbody tr td" ).empty();	   	
		
				}
			});
		},
		error: function(request, status, error) { 
		}
	}); 
	

	return;
	
}


//묶어서 한번에가 아닌 하나씪 보내서 통신
function whUpProc()
{
	if(dblRegClkChk()){
		return;
	}
	
	const checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		dblRegClkBln = false;
		return;
	}
	
	const whYmd = $("#popWhYmd").val();
	const rackCode = $("#popRackCode").val();
	
	if (whYmd == '') {
		alert("입고일자를 입력하세요.");
		dblRegClkBln = false;
		return;
	}
	
	if (rackCode == '') {
		alert("입고할 랙을 선택하세요");
		dblRegClkBln = false;
		return;
	}
	
	const data = {
		workingType :  "ADD_M_D" , 
		custCode : $("#popCustCode").val() , 
		storageCode : $("#popStorageCode").val() ,
		rackCode ,
		whYmd , 
		placeRlYmd : whYmd ,
		err : [] ,
		checkItemDetailInfo : checkedItems.map((row)=>{
															return {
																		placeNoArr : row.item.placeNo ,
																		placeSeqArr : row.item.placeSeq , 
																		whUnitPriceArr : row.item.whUnitPrice , 
																		whCntArr : row.item.whCnt
																	}
											})
		
	}
	ProgressManager.open(data.checkItemDetailInfo.length);
	whUpAddProc(data );
}

//발주입고 처리,
function whUpAddProc(data )
{
	ProgressManager.next();
	const index = data.index || 0; 
	$.ajax({
		url: "/logis/whAdd",
		dataType: "json",
		type: "POST",
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		//data : data,
		data: { ...data , ... data.checkItemDetailInfo[index] },
		success: function(result) {
			 
			if(result.result_code == 'Err')
			{
				data.err.push({...result , index , detaliInfo : data.checkItemDetailInfo[index]});
			}
			 
			data.index = index+1;
			if(data.index < data.checkItemDetailInfo.length)
			{
				setTimeout(()=>{
					whUpAddProc(data);
				} , setTimeoutDelay);
			}
			else
			{
				 
				let errMsg = '';
				if(data.err.length > 0)
				{
					errMsg+= `접수등록 실패 : ${data.err.length}건\n`;
					for(errObj of data.err)
					{
						errMsg += `${errObj.index+1}번째 부품 : ${errObj.result_msg}\n`
					}
				}
				ProgressManager.end(errMsg || '처리완료' , ()=>{
							parent.location.reload(true);
					});
				dblRegClkBln = false;
				//alert(data.result_code + ":" + data.result_msg);
				//창닫고. 부모창reload
				//parent.jQuery.fancybox.close();
				//parent.location.reload(true);
				//location.reload(true);
			}
			
		},
		error: function(request, status, error) { 
			dblRegClkBln = false;
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});
}

 


// 매입확정
function buyChk(url) {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var noArr = "";
	var seqArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		noArr = noArr + "^" + rowItem.item.placeNo;
		seqArr = seqArr + "^" + rowItem.item.placeSeq;
	}

	var data = {};
	data.workingType = "BUY_CHK";

	//sub
	data.noArr = noArr;   //번호 
	data.seqArr = seqArr;    //순번

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		//data : data,
		data: {
			"workingType": "BUY_CHK",
			"noArr": noArr,   //요천번호 
			"seqArr": seqArr,    //요청순번
		},
		success: function(data) {
			alert(data.result_code + ":" + data.result_msg);
			//창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			//parent.location.reload(true);
			location.reload(true);
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});
}


// 품번변경 버튼 클릭 시 팝업
function whItemChn(url) {

	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	if (checkedItems.length != 1) {
		alert("품번변경은 1개의 품목만 선택 가능합니다!");
		return;
	}

	var placeNo = "";
	var placeSeq = "";
	var itemNo = "";
	var orderGroupId = "";
	var orderNo = "";
	var orderSeq = "";
	var itemId = 0;
	var saleUnitPrice = 0;

	var rowItemA;
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItemA = checkedItems[i];
		itemId = rowItemA.item.itemId;
		itemNo = rowItemA.item.itemNo;
		saleUnitPrice = rowItemA.item.saleUnitPrice;
		orderGroupId = rowItemA.item.orderGroupId;
		orderNo = rowItemA.item.orderNo;
		orderSeq = rowItemA.item.orderSeq;
		placeNo = rowItemA.item.placeNo;
		placeSeq = rowItemA.item.placeSeq;
	}

	//품번변경 팝업
	$("#popItemIdPrev").val(itemId);
	$("#popItemNoPrev").val(itemNo);
	$("#popSaleUnitPricePrev").val(_cf_comma(saleUnitPrice));
	$("#popItemIdNew").val();
	$("#popItemNoNew").val();
	$("#popSaleUnitPriceNew").val();
	$("#popOrderGroupId").val(orderGroupId);
	$("#popOrderNo").val(orderNo);
	$("#popOrderSeq").val(orderSeq);
	$("#popPlaceNo").val(placeNo);
	$("#popPlaceSeq").val(placeSeq);

	//$("#form-itemId1").val("popItemIdNew");
	//$("#form-itemNo1").val("popItemNoNew");
	//$("#form-itemUnitPrice1").val("popSaleUnitPriceNew");

	var dialogItemChn;
	dialogItemChn = $("#dialog-form-itemChn").dialog({
		height: 500,
		width: 800,
		modal: true,
		headerHeight: 40,
		position: [400, 400],
		buttons: {
			"확인": whItemChnProc,
			"취소": function(event) {
				dialogItemChn.dialog("close");
			}
		},
		close: function() {
		}
	});

	return;
}


// 팝업에서 품번변경 확인버튼 클릭 
function whItemChnProc() {

	var placeNo = $("#popPlaceNo").val();
	var placeSeq = $("#popPlaceSeq").val();
	var orderGroupId = $("#popOrderGroupId").val();
	var itemNoPrev = $("#popItemNoPrev").val();
	var itemNoNew = $("#popItemNoNew").val();
	var allItemChnYN = "";
	var isAllItemChnYN = $('input:checkbox[name=allItemChnYN]').is(':checked');
	var itemId = $("#popItemIdPrev").val();
	var itemIdNew = $("#popItemIdNew").val();
	var saleUnitPriceNew = $("#popSaleUnitPriceNew").val();

	if (isAllItemChnYN == true) {
		allItemChnYN = 'Y';
	} else {
		allItemChnYN = 'N';
	}

	if (itemNoNew =='' || saleUnitPriceNew == ''){
		alert("변경품번 또는 변경단가가 등록이 안되어 있습니다.")
		return;		
	}
		
	var data = {};
	data.workingType = "ITEM_CHN";
	//master
	data.placeNo = placeNo;
	data.placeSeq = placeSeq;
	data.orderGroupId = orderGroupId;
	data.itemId = itemId;
	data.itemIdNew = itemIdNew;
	data.itemNoNew = itemNoNew;
	data.allItemChnYN = allItemChnYN;

	$.ajax({
		url: "/logis/whItemAdd",
		dataType: "json",
		type: "POST",
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		//data : data,
		data: {
			"workingType": "ITEM_CHN",
			//"custCode" : custCode,

			"placeNo": placeNo,    //발주번호
			"placeSeq": placeSeq    //순번

			, "orderGroupId": orderGroupId
			, "itemNo": itemNoPrev
			, "itemNoNew": itemNoNew

			, "itemId": itemId
			, "itemIdNew": itemIdNew
			, "allItemChnYN": allItemChnYN
			, "saleUnitPriceNew": saleUnitPriceNew
		},
		success: function(data) {
			alert(data.result_code + ":" + data.result_msg);
			//창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			parent.location.reload(true);
			//location.reload(true);
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

}


//function findItem Call
function findItemCall(elementName, dialogOpenYN) {
	if (window.event.keyCode == 13 || dialogOpenYN == 'Y') {  //  Enter or Open Dialog

		$("#form-itemId1").val("popItemIdNew");
		$("#form-itemNo1").val("popItemNoNew");
		$("#form-itemUnitPrice1").val("popSaleUnitPriceNew");

		var itemNo = $("#" + elementName).val();
		$("#srchEqualItemNo").val(itemNo);
		$("#pop_itemNo").val(itemNo);
		$("#pop_itemName").val();

		if (dialogOpenYN == 'N') {
			findItem('/base/item-list', 0, 0, '', 'Y');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
		} else {
			var dialogItem;
			dialogItem = $("#dialog-form-item").dialog({
				//autoOpen: false,
				height: 700,
				//minWidth: 500,
				width: "70%",
				modal: true,
				headerHeight: 40,
				//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
				position: [400, 400],
				buttons: {
					"확인": updateGridRow,
					"취소": function(event) {
						dialogItem.dialog("close");
					}
				},
				close: function() {
					// $( "#users tbody tr td" ).empty();	   	
				}
			});
			createItemGrid(columnLayoutItem);
			dialogItem.dialog("open");
			//findItem('/base/item-list', 0,0,'','Y');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
		}
	}
}

/*
23.03.08 장윤상 부품등록팝업추가
230714 yoonsang common-pan 에 옴겼는데 여기도 있어서 부품등록이 2개씩 되고있었음
*/


function updateDataToServer3(url, workingType) {

	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var custCode;
	var whNo;
	var whSeq;
	var whUnitPrice;
	var whCnt;
	var whNoArr = "";
	var whSeqArr = "";
	var whUnitPriceArr = "";
	var whCntArr = "";



	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];

		whNo = rowItem.item.whNo;
		whSeq = rowItem.item.whSeq;
		whUnitPrice = rowItem.item.whUnitPrice;
		whCnt = rowItem.item.whCnt;
		custCode = rowItem.item.custCode;

		//custOrderNo = rowItem.item.custOrderNo;

		if (typeof whNo == 'undefined' || whNo == null) { whNo = ""; }
		if (typeof whSeq == 'undefined' || whSeq == null) { whSeq = ""; }
		if (typeof whUnitPrice == 'undefined' || whUnitPrice == null) { whUnitPrice = ""; }
		if (typeof whCnt == 'undefined' || whCnt == null) { whCnt = ""; }


		if (i == 0) {
			whNoArr = whNo;
			whSeqArr = whSeq;
			whUnitPriceArr = whUnitPrice;
			whCntArr = whCnt;
			//custOrderNoArr = custOrderNo;
		} else {
			whNoArr = whNoArr + "^" + whNo;
			whSeqArr = whSeqArr + "^" + whSeq;
			whUnitPriceArr = whUnitPriceArr + "^" + whUnitPrice;
			whCntArr = whCntArr + "^" + whCnt;
			//custOrderNoArr = custOrderNoArr + "^" +custOrderNo;
		}

	}

	var data = {};
	data.workingType = "UPT";


	//sub
	data.whNoArr = whNoArr;
	data.whSeqArr = whSeqArr;
	data.whUnitPriceArr = whUnitPriceArr;
	data.whCntArr = whCntArr;

	$.ajax({
		url: "/logis/whAdd",
		dataType: "json",
		type: "POST",
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		//data : data,
		data: {
			"workingType": "UPT",
			"custCode": custCode,
			"whNo": whNo,

			"whNoArr": whNoArr,
			"whSeqArr": whSeqArr,
			"whUnitPriceArr": whUnitPriceArr,
			"whCntArr": whCntArr

		},
		success: function(data) {
			alert(data.result_code + ":" + data.result_msg);

		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});



}

function priceChk(url , workingType)
{
	const checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	if (!confirm("처리하시겠습니까?")) {
		return;
	}
	
	const data = {
					workingType , 
					err : [] ,
					checkItemDetailInfo : checkedItems.map((row)=>{
																		return {
																					whNoArr : row.item.whNo || '' , 
																					whSeqArr : row.item.whSeq || '' ,
																					whUnitPriceArr : row.item.whUnitPrice || '' ,
																					whCntArr : row.item.whCnt || '' ,
																					placeNoArr : row.item.placeNo  ,
																					placeSeqArr : row.item.placeSeq ,
																					isWh : row.item.whNo? true : false ,
																					isPriceChk : row.item.priceChkYmd? true : false
																		}
															})
				 }
	
	const isCheckItemNotWh =  data.checkItemDetailInfo.some((row)=>!row.isWh)
	if((workingType=='CHK' || workingType=='CANCEL' ) && isCheckItemNotWh)
	{
		alert("창고입고가 안됨 품목입니다.")
		return;
	}
	
	if(workingType == 'CHK')
	{
		const isCheckItemPriceChk = data.checkItemDetailInfo.some((row)=>row.isPriceChk)
		if(isCheckItemPriceChk)
		{
			alert("이미 입고단가를 확인한 품목입니다.")
			return;
		}
	}
	else if(workingType == 'CANCEL')
	{
		const isCheckItemNotPriceChk = data.checkItemDetailInfo.some((row)=>!row.isPriceChk)
		if(isCheckItemNotPriceChk)
		{
			alert("입고가확인이 되지 않은 품목입니다. ")
			return;
		}
	}	
	 
	ProgressManager.open(data.checkItemDetailInfo.length);
	priceItemChk(url, data )
}

function priceItemChk(url , data )
{
	ProgressManager.next();
	const index = data.index || 0; 
	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		//data : data,
		data: { ...data , ...data.checkItemDetailInfo[index] ,  },
		success: function(result) {
			
			 
			if(result.result_code == 'Err')
			{
				data.err.push({...result , index , detaliInfo : data.checkItemDetailInfo[index]});
			}
			 
			data.index = index+1;
			if(data.index < data.checkItemDetailInfo.length)
			{
				setTimeout(()=>{
					priceItemChk(url,data);
				} , setTimeoutDelay);
			}
			else
			{
				 
				let errMsg = '';
				if(data.err.length > 0)
				{
					errMsg+= `접수등록 실패 : ${data.err.length}건\n`;
					for(errObj of data.err)
					{
						errMsg += `${errObj.index+1}번째 부품 : ${errObj.result_msg}\n`
					}
				}
				ProgressManager.end(errMsg || '처리완료');
				dblRegClkBln = false;
				//alert(data.result_code + ":" + data.result_msg);
				//창닫고. 부모창reload
				//parent.jQuery.fancybox.close();
				//parent.location.reload(true);
				//location.reload(true);
			}
			
			
			
			
			/*
			
			alert(data.result_code + ":" + data.result_msg);
			//창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			//parent.location.reload(true);
			location.reload(true);
			
			*/
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

}


/*

*/

function resetRackInfo() {
	$("#popRackCode").val("");
	$("#popRackName").val("");
}

//프린트		
	/*	
	function print() {
	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	
	var custCode = $("#custCode").val();
	var custName = $("#custName").val();
	var orderNo = $("#orderNo").val();
	var orderGroupId = $("#orderGroupId").val();
	//var workingType = "PLACE_LIST";
	//var bizNo = $(':radio[name="bizNo"]:checked').val();
	var bizNo = $(':radio[name="bizNo"]:checked').val() || ""; //선택을 안할경우 undefined로 나옴. undefined 일 경우 공백으로 출력되게 수정 bk
	var custOrderNo = $("#custOrderNo").val();

	var whStatus = $("#whStatus").val();
	var whUnitPriceReg = $("#whUnitPriceReg").val();
	
	var rcvCustCode = $("#rcvCustCode").val();
	var branchCode = $("#branchCode").val();
	
	var whSchYmd = $("#whSchYmd").val();//0705 bk 입고예상일자 
	var itemId = $("#itemId").val(); if(itemId == ''){itemId = 0;} //0705 bk 부품아이디 
	var itemNo = $("#itemNo").val();//0705 bk 품번 
	//var rlReqNo = $("#rlReqNo").text();
	
	//console.log ("rcvCustCode" +rcvCustCode);
	//window.open ("/logis/wh-up-print?rlReqNo="+rlReqNo+"&memoYN="+printMemoYN+"&printDcYN=" + printDcYN,"_blank");
	/*
	window.location.href = "/logis/wh-up-print?sYmd=" + sYmd + "&eYmd=" + eYmd + "&custCode=" + custCode 
												    + "&orderNo=" + orderNo + "&orderGroupId=" + orderGroupId + "&bizNo=" + bizNo 
												    + "&custOrderNo=" + custOrderNo + "&whStatus=" + whStatus + "&whUnitPriceReg=" + whUnitPriceReg
												    + "&rcvCustCode=" + rcvCustCode + "&branchCode=" + branchCode+ "&custName=" + custName 
												    +"&whYmd=" + whYmd+"&itemId=" + itemId+"&itemNo=" + itemNo;
	*/
	/*
	window.open ("/logis/wh-up-print?sYmd=" + sYmd + "&eYmd=" + eYmd + "&custCode=" + custCode 
												    + "&orderNo=" + orderNo + "&orderGroupId=" + orderGroupId + "&bizNo=" + bizNo 
												    + "&custOrderNo=" + custOrderNo + "&whStatus=" + whStatus + "&whUnitPriceReg=" + whUnitPriceReg
												    + "&rcvCustCode=" + rcvCustCode + "&branchCode=" + branchCode+ "&custName=" + custName 
												    +"&whSchYmd=" + whSchYmd+"&itemId=" + itemId+"&itemNo=" + itemNo,"_blank"); 
												    
														
}	;*/

// print (selected only )-2023.07.14 bk 
	function print() {
	var rowItem;
	var plcArr = "";
	var seqArr = "";
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
		
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	
	if (checkedItems.length <= 0) {
		alert("인쇄할 품목을 선택하세요!");
		return;
	}
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		plcArr = plcArr + "^" + rowItem.item.placeNo;
		seqArr = seqArr + "^" + rowItem.item.placeSeq;
		//console.log("plcArr"+plcArr);
		//console.log("seqArr"+seqArr);
	}
	var url = "/logis/wh-up-print?plcArr=" + encodeURIComponent(plcArr) + "&seqArr=" + encodeURIComponent(seqArr)+"&sYmd=" + sYmd + "&eYmd=" + eYmd;
	window.open(url, "_blank");
};

 




