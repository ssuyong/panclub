
// 그리드 생성 후 해당 ID 보관 변수
var myGridID1;
var myGridID2;
var myGridID;
var myGridIDItem;

var uptResultCode;
var uptResultMsg;

$(document).ready(function(){
//$(window).load(function(){
		  
	// AUIGrid 그리드를 생성합니다.
	//$("#grid_wrap").css("display","contents");
	uptResultCode = 0;
	uptResultMsg = "";
	
	createAUIGrid(columnLayout);
	createAUIGrid2(columnLayout2);
	createAUIGrid3(columnLayout3);
	//$("#grid_wrap").css("display","contents");

	//findDataToServer("/logis/cCustPurRate-list", 1);
	findDataToServer("/logis/cCustPurRate-list","LIST");                  
  	
  	
	
	$("#btnReg").click(function() {
		updateDataToServer("/logis/cCustPurRateAdd");
		updateDataToServerMaker("/logis/cCustPurMakerRateAdd");
		updateDataToServerItem("/logis/cCustPurItemRateAdd");
		if(uptResultCode == 3){
			alert("성공, 처리되었습니다.");
		}else if(0<uptResultCode<3){
			alert("일부성공, 오류를 제외하고 처리되었습니다. 오류 : " + uptResultMsg);
		}else{
			alert("실패, 오류 : " + uptResultMsg);
		}
		location.reload();
	});
	


});


// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	//	saveColumnLayout();
};

var keyValueList1 = findSrchCCust("/base/storage-list");
var keyValueList2 = JSON.parse(keyValueList1);
var keyValueList3 = findSrchMakerCode("/base/code-list");
var keyValueList4 = JSON.parse(keyValueList3);
//var keyValueList1 = findSrchCCust("/base/storage-list", "Y");
//var keyValueList2 = JSON.parse(keyValueList1);

	 
// 칼럼 레이아웃 작성
var columnLayout = [ 
	{ dataField : "custCode_origin",    headerText : "수탁업체코드_origin" , visible : false,editable: false} 
	,{ dataField : "custCode",    headerText : "수탁업체코드" ,editable: false} 
	,{ dataField : "custName",     headerText : "수탁업체명" ,editable: true ,style: "left"
		,sortType: 1,	
		labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
			var retStr = value;

			for (var i = 0, len = keyValueList2.length; i < len; i++) {
				if (keyValueList2[i]["code"] == value) {
					retStr = keyValueList2[i]["value"];
					break;
				}
			}
			return retStr;
		},

		editRenderer: {
			type: "DropDownListRenderer",
			list: keyValueList2,
			keyField: "code", // key 에 해당되는 필드명
			valueField: "value" // value 에 해당되는 필드명
		},	
	 }
	,{ dataField : "purRate",   headerText : "매입율" , dataType: "numeric" }
];

var columnLayout2 = [ 
	{ dataField : "makerCode_origin",    headerText : "제조사코드" , visible : false ,editable: false} 
	,{ dataField : "makerCode",    headerText : "제조사코드" ,editable: false} 
	,{ dataField : "makerName",     headerText : "제조사명" ,editable: true,style: "left"
		,sortType: 1,			
		labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
			var retStr = value;

			for (var i = 0, len = keyValueList4.length; i < len; i++) {
				if (keyValueList4[i]["code"] == value) {
					retStr = keyValueList4[i]["value"];
					break;
				}
			}
			return retStr;
		},


		editRenderer: {
			type: "DropDownListRenderer",
			list: keyValueList4,
			keyField: "code", // key 에 해당되는 필드명
			valueField: "value" // value 에 해당되는 필드명
		},
	 }
	,{ dataField : "purRate",   headerText : "매입율" , dataType: "numeric"}
];

var columnLayout3 = [
	{ dataField : "idx_origin",      headerText : "idx", editable : false , visible : false }, 
	{ dataField : "idx",      headerText : "idx", editable : false , visible : false }, 
	{ dataField : "className",      headerText : "구분", width : 80, editable : false },
	{ dataField : "itemId",    headerText : "품목ID" , editable : false} ,
	{ dataField: "makerName",        headerText: "제조사"  , width : 100,editable: false    }
	,{ dataField : "itemNo",    headerText : "품번" , style:"auigrid-must-col-style" ,editable: true
		,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
		        show : true,
		        tooltipHtml : '필수입력값입니다.'
		    }
		    ,renderer: {
			type: "IconRenderer",
			iconWidth: 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
			iconHeight: 16,
			iconPosition: "aisleRight",
			iconTableRef: { // icon 값 참조할 테이블 레퍼런스
				"default": "/resources/img/content_paste_search_black_24dp.svg" // default
			},
			onClick: function (event) {
				//console.log(event.item)
				if(event.item.idx != event.item.idx_origin){
					//alert("( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.item.name + " 달력 클릭");
					var dialogItem;
					dialogItem = $( "#dialog-form-item" ).dialog({
					    //autoOpen: false,
					    height: 700,
					    //minWidth: 500,
					    width: "70%",
					    modal: true,
					    headerHeight: 40,
						//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
						position:[400,400],
						buttons: {
							"확인": updateGridRow			,
							"취소": function (event) {
								dialogItem.dialog("close");
							}
						},
					    close: function() {
					     // $( "#users tbody tr td" ).empty();	   	
					    }
					});	
					createItemGrid(columnLayoutItem,'Y');
					dialogItem.dialog("open");					
				}
				
			}
		}
			
	} 
	,{ dataField: "factoryNo", headerText: "공장품번", width: 120 }
	,{ dataField : "itemName",     headerText : "상품명" , editable : false,style: "left" }
	,{ dataField : "purRate",   headerText : "매입율" , dataType: "numeric"}
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
		//enableCellMerge: true,
		enableFilter: true,

		showStateColumn: true,

		selectionMode: "multipleCells",
		//rowIdField: "insurIdx",
		showAutoNoDataMessage : false,

		rowIdField: "custCode_origin" 
	};
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID1 = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	
	var rowPos = 'first';

	// 선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID1, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		
		// 하단에 행인덱스, 헤더 텍스트, 수정 가능여부 출력함.
		//document.getElementById("selectionDesc").innerHTML = "현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ) : editable : " + primeCell.editable + ", 행 고유값(PK) : " + primeCell.rowIdValue;
	});

	var currentPage = 1;
	AUIGrid.bind(myGridID1, "pageChange", function (event) {
		currentPage = event.currentPage;
	});
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID1, "cellDoubleClick", function(event) {
		
	});
	AUIGrid.bind(myGridID1, "cellEditEnd", function(event) {
		if (event.dataField == "custName") {
			AUIGrid.updateRow(myGridID1, { "custCode": event.item.custName }, event.rowIndex);	
		}
	});
	
	AUIGrid.bind(myGridID1, "cellEditBegin", function (event) {
		var rowIdField = AUIGrid.getProp(event.pid, "rowIdField");

		if (event.dataField == "custName") {
			// 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
			if (AUIGrid.isAddedById(event.pid, event.item[rowIdField])) {
				return true;
			} else {
				alert("등록된 위탁업체는 수정할 수 없습니다.")
				return false; // false 반환하면 기본 행위 안함(즉, cellEditBegin 의 기본행위는 에디팅 진입임)
		}}
		return true;
	});
	
	AUIGrid.bind(myGridID1, "cellClick", auiGridSelectionChangeHandler);
		
}

function createAUIGrid2(columnLayout) {
	
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
		//enableCellMerge: true,
		enableFilter: true,

		showStateColumn: true,

		selectionMode: "multipleCells",
		//rowIdField: "insurIdx",
		showAutoNoDataMessage : false,
		rowIdField: "makerCode_origin" 
	};
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID2 = AUIGrid.create("#grid_wrap2", columnLayout, auiGridProps);
	
	var rowPos = 'first';

	// 선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID2, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		
		// 하단에 행인덱스, 헤더 텍스트, 수정 가능여부 출력함.
		//document.getElementById("selectionDesc").innerHTML = "현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ) : editable : " + primeCell.editable + ", 행 고유값(PK) : " + primeCell.rowIdValue;
	});

	var currentPage = 1;
	AUIGrid.bind(myGridID2, "pageChange", function (event) {
		currentPage = event.currentPage;
	});
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID2, "cellDoubleClick", function (event) {

	});	

	AUIGrid.bind(myGridID2, "cellEditEnd", function(event) {
		if (event.dataField == "makerName") {
			AUIGrid.updateRow(myGridID2, { "makerCode": event.item.makerName }, event.rowIndex);
		}
	});
	
		
}

function createAUIGrid3(columnLayout) {
	
	var auiGridProps = {			
			editable : true,			
		// singleRow 선택모드U7 
		
		// 드래깅 행 이동 가능 여부 (기본값 : false)
		enableDrag: true,
		// 다수의 행을 한번에 이동 가능 여부(기본값 : true)
		enableMultipleDrag: true,
		// 셀에서 바로  드래깅 해 이동 가능 여부 (기본값 : false) - enableDrag=true 설정이 선행 
		enableDragByCellDrag: false,

		// 상태 칼럼 사용
		showStateColumn : true,

		showRowCheckColumn: false,

		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
		rowIdField: "idx_origin",
		
		// No Data 메지시 미출력
		showAutoNoDataMessage: false,
		
	
		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
		rowCheckableFunction: function (rowIndex, isChecked, item) {
			if (item.product == "LG G3") { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
				return false;
			}
			return true;
		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			if (item.product == "LG G3") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
				return false; // false 반환하면 disabled 처리됨
			}
			return true;
		}
	};
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap3", columnLayout, auiGridProps);
	
	var rowPos = 'first';

	// 선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		
		// 하단에 행인덱스, 헤더 텍스트, 수정 가능여부 출력함.
		//document.getElementById("selectionDesc").innerHTML = "현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ) : editable : " + primeCell.editable + ", 행 고유값(PK) : " + primeCell.rowIdValue;
	});
	
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function (event) {
		currentPage = event.currentPage;
	});
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function( event ) {
      if (event.dataField == 'itemNo'){
		//console.log("rowInx:"+event.rowIndex)
		//console.log("handel 2");
		$("#srchEqualItemNo").val(event.value); 
		$("#pop_itemNo").val(event.value);
		$("#pop_itemName").val();
		findItem('/base/item-list', 0,event.rowIndex,'','Y');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
		
		//console.log("dd:"+2);

	    
	   // addRow(myGridID,'last');  //부품찾은 후 행추가
	             	
	   }
	   
		
	});
	
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);
	
	AUIGrid.bind(myGridID, "pasteEnd", function(event) {

		AUIGrid.setSelectionByIndex(0, 0); // 0, 0 으로 선택자 이동시킴.
 	
     	var allItems = AUIGrid.getGridData(myGridID);
		var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
		var rowId;
		var j=0;
		var rowIndexes = [];

		for (var i = 0, len = allItems .length; i < len; i++) {
			rowItem = allItems[i];
			rowId = rowItem[rowIdField];
			itemNo = AUIGrid.getCellValue(myGridID, i, "itemNo");
			itemId = AUIGrid.getCellValue(myGridID, i, "itemId");
			//console.log("itemId:"+itemId);
			//console.log("itemNo:"+itemNo);
			if ( itemId === undefined || itemId == '' ){  //상품ID 존재하는 경우만. 이게 원본
				rowIndexes[j] = i;
				j = j + 1; 
			}
		
		}
		AUIGrid.removeRow(myGridID, rowIndexes); //2023.07.03 comment. ctrl+v 시 row삭제오류 ->다시 원복				
		

	});
	
	AUIGrid.bind(myGridID, "cellEditBegin", function (event) {
		var rowIdField = AUIGrid.getProp(event.pid, "rowIdField");

		if (event.dataField == "itemNo") {
			// 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
			if (AUIGrid.isAddedById(event.pid, event.item[rowIdField])) {
				return true;
			} else {
				alert("등록된 품번은 수정할 수 없습니다.")
				return false; // false 반환하면 기본 행위 안함(즉, cellEditBegin 의 기본행위는 에디팅 진입임)
		}}
		return true;
	});	
	

		
}


/*
// 윈도우 리사이징 이벤트
window.onresize = function () {

	// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
	if (typeof myGridID !== "undefined") {
		//$("#grid_wrap").css("display","contents");
		//AUIGrid.resize(myGridID);
		
		//AUIGrid.resize(myGridID, "1200", "650");
	}
};

//대량조회 reset 클릭
function txtAreaReset() {
	//console.log("fn_bulkSrchResetClick");
	$("#item_bulk").val("");
	return;
}

*/

function addRow(grid,rowPos) {
	//console.log("custcodecheck : " + $("#selectCustCode").val())
	var item = new Object();

	AUIGrid.addRow(grid, item, rowPos);	
};
function removeRow(grid) {


	AUIGrid.removeRow(grid, "selectedIndex");
};



/*외주창고목록찾기 */
function findSrchCCust(url) {
	var list = []; //자바스크립트 배열선언
	var listS;

	var consignYN = 'Y'
	var checkType = 'CUST-LIST'
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			consignYN : consignYN
			,checkType: checkType
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.storageList.length == 0){
						
			}else{
				var j = 0;				
				for(i=0;i<data.storageList.length;i++){
					custCode = data.storageList[i].consignCustCode;
					custName = data.storageList[i].consignCustName; 
					
					list[j] = { "code": custCode, "value": custName };
					j = j + 1;
					
				}
			}

			listS = JSON.stringify(list); //JSON 형식을 변환해줌!!!		
			
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
	
	return listS;
	
}


function findSrchMakerCode(url) {
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

function updateGridRow() {
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDItem);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
		
	item = {
		itemId: rowItem.itemId,
		itemNo: rowItem.itemNo,
		itemName: rowItem.itemName,
		itemNameEn: rowItem.itemNameEn,
		salePrice: rowItem.salePrice
		, unitPrice: rowItem.salePrice
		, cnt: 1
		, saleUnitPrice: rowItem.salePrice 
		, sumPrice: rowItem.salePrice * 1
		,dcExceptYN : rowItem.dcExceptYN
		
		,makerName : rowItem.makerName
		,className : rowItem.className
		,factoryNo : rowItem.factoryNo
	};

	AUIGrid.updateRow(myGridID, item, "selectedIndex");
	
	var dialogItem;
	dialogItem = $( "#dialog-form-item");			
	dialogItem.dialog("close");
}

function auiCellEditingHandler(event) {
	
	if (event.dataField == 'itemNo'){
		setStartSpinner();
		$("#srchEqualItemNo").val(event.value); 
		$("#pop_itemNo").val(event.value);
		$("#pop_itemName").val();
		addRow(myGridID,'last');  //부품찾은 후 행추가
		
		findItem('/base/item-list', 0,event.rowIndex,'','N');  //품목을 찾아서 상품아이디 품명 등을 디스플레이		
	
		setStopSpinner();
	    
	}	

};

function updateDataToServer(url) {

	var addList = AUIGrid.getAddedRowItems(myGridID1);
	var updateList = AUIGrid.getEditedRowColumnItems(myGridID1);
	var updateItem = AUIGrid.getEditedRowItems(myGridID1);
	var removeList = AUIGrid.getRemovedItems(myGridID1);


	var isValid = AUIGrid.validateGridData(myGridID1, ["custCode", "custName", "purRate"], "위탁업체코드, 위탁업체명, 매입율은 반드시 유효한 값을 직접 입력해야 합니다.");

	var isValidChanged = AUIGrid.validateChangedGridData(myGridID1, ["custCode", "custName", "purRate"], "위탁업체코드, 위탁업체명, 매입율은 반드시 유효한 값을 직접 입력해야 합니다.");


	if (isValid == false || isValidChanged == false) {
		return;
	}


	var data = {};

	if (addList.length > 0) {
		data.addList = addList;
	} else data.addList = [];

	if (updateList.length > 0) {
		data.uptItem = updateItem
		data.uptList = updateList;
	} else {data.uptItem = [];
			data.uptList = [];
	}

	if (removeList.length > 0) data.delList = removeList;
	else data.delList = [];

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			//alert(data.result_code + ":" + data.result_msg);
			//location.reload();
			if(data.result_code == "성공"){
				uptResultCode = uptResultCode+1
			}else{
				uptResultMsg = uptResultMsg + data.result_msg				
			}
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
			//location.reload();
		}
	});

};

function findDataToServer(url, workingType) {
	var list = [];
	var selectCustCode = $("#selectCustCode").val();
	var data = {};
	
	data.workingType = workingType
	data.selectCustCode = selectCustCode
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: JSON.stringify(data),
		//async: false,
		contentType: "application/json; charset=utf-8",
		//contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {

			if (data.cCustPurRatelist.length == 0) {
				if(workingType == "LIST"){
					AUIGrid.clearGridData(myGridID1);
				}
				if(workingType == "MAKER-LIST"){
					AUIGrid.clearGridData(myGridID2);
				}
				if(workingType == "ITEM-LIST"){
					AUIGrid.clearGridData(myGridID);
				}
				
				//alert("조건에 맞는 자료가 없습니다.");
			} else {
				if(workingType == "LIST"){
					for (i = 0; i < data.cCustPurRatelist.length; i++) {
						list.push({						
							comCode: data.cCustPurRatelist[i].comCode,
							custCode_origin: data.cCustPurRatelist[i].custCode,
							custCode: data.cCustPurRatelist[i].custCode,
							custName: data.cCustPurRatelist[i].custCode,
							purRate: data.cCustPurRatelist[i].purRate						
	
						});

					}
					
					AUIGrid.setGridData("#grid_wrap", list);
					
				}				
				if(workingType == "MAKER-LIST"){
					
					for (i = 0; i < data.cCustPurRatelist.length; i++) {
						list.push({						
							comCode: data.cCustPurRatelist[i].comCode,
							makerCode_origin: data.cCustPurRatelist[i].makerCode,
							makerCode: data.cCustPurRatelist[i].makerCode,
							makerName: data.cCustPurRatelist[i].makerCode,
							purRate: data.cCustPurRatelist[i].purRate						
	
						});

					}
					
					AUIGrid.setGridData("#grid_wrap2", list);
					
				}
				if(workingType == "ITEM-LIST"){
					 
					for (i = 0; i < data.cCustPurRatelist.length; i++) {
						list.push({
							idx_origin : data.cCustPurRatelist[i].idx,						
							idx:  data.cCustPurRatelist[i].idx,
							itemId: data.cCustPurRatelist[i].itemId,
							itemNo: data.cCustPurRatelist[i].itemNo,
							itemName: data.cCustPurRatelist[i].itemName,
							purRate: data.cCustPurRatelist[i].purRate				
									
							, makerName: data.cCustPurRatelist[i].makerName						
							, className: data.cCustPurRatelist[i].className						
							, factoryNo: data.cCustPurRatelist[i].factoryNo						
	
						});

					}
					
					AUIGrid.setGridData("#grid_wrap3", list);
					
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

var timerId = null;

function auiGridSelectionChangeHandler(event) {
	//document.getElementById("srCode").innerHTML = event.item.srCode;
	// 200ms 보다 빠르게 그리드 선택자가 변경된다면 데이터 요청 안함
	if (timerId) {
		clearTimeout(timerId);
	}

	timerId = setTimeout(function() {
		// 선택 대표 셀 정보 
		//var primeCell = event.primeCell;

		// 대표 셀에 대한 전체 행 아이템
		//document.getElementById("srCode").innerHTML = primeCell.item.srCode;
		//document.getElementById("custCode").innerHTML = event.item.custName;
		
		$("#selectCustCode").val(event.item.custName);
		
		//console.log("custcode : "+ $("#selectCustCode").val())
		
		if($("#selectCustCode").val() != ''){
			findDataToServer("/logis/cCustPurRate-list","MAKER-LIST");
			findDataToServer("/logis/cCustPurRate-list","ITEM-LIST");			
		}else{
			AUIGrid.clearGridData(myGridID2);
			AUIGrid.clearGridData(myGridID);
		}
		


		// rowId 에 맞는 디테일 데이터 요청 후 디테일 그리드에 삽입
		//requestMyData("./data/getJsonDetails.php?id=" + custId, myGridID2);


	}, 200);  // 현재 200ms 민감도....환경에 맞게 조절하세요.
};

function updateDataToServerMaker(url) {

	var addList = AUIGrid.getAddedRowItems(myGridID2);
	var updateList = AUIGrid.getEditedRowColumnItems(myGridID2);
	var updateItem = AUIGrid.getEditedRowItems(myGridID2);
	var removeList = AUIGrid.getRemovedItems(myGridID2);
	var selectCustCode = $("#selectCustCode").val();
	var isValid = AUIGrid.validateGridData(myGridID2, ["makerCode", "makerName", "purRate"], "제조사코드, 제조사명, 매입율은 반드시 유효한 값을 직접 입력해야 합니다.");

	var isValidChanged = AUIGrid.validateChangedGridData(myGridID2, ["makerCode", "makerName", "purRate"], "제조사코드, 제조사명, 매입율은 반드시 유효한 값을 직접 입력해야 합니다.");


	if (isValid == false || isValidChanged == false) {
		return;
	}


	var data = {};
	data.selectCustCode =selectCustCode;

	if (addList.length > 0) {
		data.addList = addList;
	} else data.addList = [];

	if (updateList.length > 0) {
		data.uptItem = updateItem
		data.uptList = updateList;
	} else {data.uptItem = [];
			data.uptList = [];
	}

	if (removeList.length > 0) data.delList = removeList;
	else data.delList = [];
	

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			//alert(data.result_code + ":" + data.result_msg);
			//location.reload();
			if(data.result_code == "성공"){
				uptResultCode = uptResultCode+1
			}else{
				uptResultMsg = uptResultMsg + data.result_msg				
			}
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
			//location.reload();
		}
	});

};

function updateDataToServerItem(url) {

	var addList = AUIGrid.getAddedRowItems(myGridID);
	var updateList = AUIGrid.getEditedRowColumnItems(myGridID);
	var updateItem = AUIGrid.getEditedRowItems(myGridID);
	var removeList = AUIGrid.getRemovedItems(myGridID);
	var selectCustCode = $("#selectCustCode").val();


	var isValid = AUIGrid.validateGridData(myGridID, ["itemId", "itemNo", "itemName", "purRate"], "품목ID, 품번, 상품명, 매입율은 반드시 유효한 값을 직접 입력해야 합니다.");

	var isValidChanged = AUIGrid.validateChangedGridData(myGridID, ["itemId", "itemNo", "itemName", "purRate"], "품목ID, 품번, 상품명, 매입율은 반드시 유효한 값을 직접 입력해야 합니다.");


	if (isValid == false || isValidChanged == false) {
		return;
	}


	var data = {};
	data.selectCustCode =selectCustCode;

	if (addList.length > 0) {
		data.addList = addList;
	} else data.addList = [];

	if (updateList.length > 0) {
		data.uptItem = updateItem
		data.uptList = updateList;
	} else {data.uptItem = [];
			data.uptList = [];
	}

	if (removeList.length > 0) data.delList = removeList;
	else data.delList = [];


	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			//alert(data.result_code + ":" + data.result_msg);
			//location.reload();
			if(data.result_code == "성공"){
				uptResultCode = uptResultCode+1
			}else{
				uptResultMsg = uptResultMsg + data.result_msg				
			}
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
			//location.reload();
		}
	});

};
