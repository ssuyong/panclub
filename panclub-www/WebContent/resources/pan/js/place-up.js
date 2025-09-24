// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
let logisCodeList = [];
var datepicker = new tui.DatePicker('#wrapper', {
	language: 'ko',
    date: new Date(),
    input: {
        //element: '#placeDmdYmd', //발주요청일
        element: '#placeYmd', //발주일 
        format: 'yyyy-MM-dd'
    }
});
    
   
var datepicker2 = new tui.DatePicker('#wrapper2', {
    language: 'ko',
    date: new Date(),
    input: {
        element: '#whSchYmd',
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
	//console.log("custcode:: "+ $("#custCode").val());
}

$(document).ready(function(){

///    $("#whSchTime").timepicker('setTime', new Date());
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);
	logisCodeListFind();
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();	
	

	$("#btnReg").click(function(){
		document.getElementById('btnReg').classList.toggle('disabled'); 
		//alert("등록버튼");
		this.blur();
		updateDataToServer("/order/placeAdd", "ADD");
	});
	$("#btnUpt").click(function(){
		//alert("등록버튼");
		this.blur();
		document.getElementById('btnReg').classList.toggle('disabled'); 
		updateDataToServer("/order/placeAdd", "UPT");
	});
	$("#btnDel").click(function(){
		//alert("등록버튼");
		this.blur();
		if (confirm("삭제되면 복구가 불가능 합니다. 삭제하시겠습니까?")){
			document.getElementById('btnReg').classList.toggle('disabled');
		
			updateDataToServer("/order/placeAdd", "DEL");
		}
	});

	$("#btnList").click(function(){
		//location.href = '/order/place-req-item-list';
		 history.back();
		 history.back();
	});
		
	//발주요청목록에서 넘어오는 경우
	let reqArr = $("#reqArr").val();	
	if (reqArr !=''){
		findReqItem('/order/place-req-item-list');
	}	  
	
	//목록에서 넘어오는 경우
	let placeNo = $("#placeNo").val();	
	if (placeNo !=''){
		//alert("custcode:"+custCode);
		findPlace('/order/place-list');
	}
	
	$("#btnOReq").click(function(){
		if($("#gvPlacNo").val() === ''){
			if (!confirm("주문요청 하시겠습니까?")) { return; }
			document.getElementById('btnOReq').classList.toggle('disabled'); 
			this.blur();
			orderReqReg("ADD");
		}else{
			document.getElementById('btnOReq').classList.toggle('disabled'); 
			this.blur();
			orderReqList();
		}
	});
	
	if($("#linkTkKey").val() === $("#linkGvKey").val() && $("#linkTkKey").val() !==''){
		$("#btnOReq").prop("disabled", false);
	}else{
		$("#btnOReq").prop("disabled", true);
	}
	
	$("#btnRegDialogOReq").click(function(){
		document.getElementById('btnRegDialogOReq').classList.toggle('disabled'); 
		this.blur();
		orderReqReg("UPT");
	});
	$("#btnDelDialogOReq").click(function(){
		//alert("등록버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.\n또한 발주처의 주문요청내역도 삭제됩니다. 삭제하시겠습니까?")){
			document.getElementById('btnDelDialogOReq').classList.toggle('disabled'); 
			this.blur();
			orderReqReg("DEL");
		}
	});
	$("#btnCloseDialogOReq").click(function(){
		document.getElementById('btnOReq').classList.remove('disabled');
		var dialogOReq;
		dialogOReq = $( "#dialogOReq-form" ).dialog();
		dialogOReq.dialog("close");
	});

	var inputElement = document.querySelector('#whSchYmd');
	inputElement.addEventListener('keydown', function(event) {
	    if (event.keyCode == 8) { 
	        setTimeout(function() {
	            if (inputElement.value == '') {
	                datepicker2.setDate(null); 
	            }
	        }, 0);
	    }
	});
	
	$("#uptOrderCntBtn").click(function(){
		openDialogUptOrderCnt();
	});
	
	$("#pop_uptCnt").blur(function(){
		calCnt();
	});
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "idx",      headerText : "idx", width : 50, editable : false, visible : false }
		,{ dataField : "dspNo",      headerText : "노출순서", width : 60 , style : "auigrid-opt-col-style"}
		,{ dataField : "gvComCode",      headerText : "발주요청업체코드" , editable : false , visible : false   }
		,{ dataField : "gvComName",      headerText : "발주요청업체명" , width : 100, editable : false    }
		,{ dataField : "placeSeq",      headerText : "발주순번", width : 60, editable : false }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80, editable : false }
		,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false  }
			,{ 
			dataField : "itemNo",      headerText : "품번*", width : 140 , style:"left" , enableDrag :false , style:"auigrid-must-col-style" 
			//,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
		    //    show : true,
		     //   tooltipHtml : '필수입력값입니다.'
		  //  }
		    ,renderer: {
				type: "IconRenderer",
				iconWidth: 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
				iconHeight: 16,
				iconPosition: "aisleRight",
				iconTableRef: { // icon 값 참조할 테이블 레퍼런스
					"default": "/resources/img/content_paste_search_black_24dp.svg" // default
				},
				onClick: function (event) {
					//alert("( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.item.name + " 달력 클릭");
					$("#pop_itemNo").val();

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
					createItemGrid(columnLayoutItem);
					dialogItem.dialog("open");
					
				}
			}  
		 } 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }  
		,{ dataField : "itemName", headerText : "품명", width: 150, editable : false, style : "left" } 
		//,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "saleUnitPrice",     headerText : "판매단가", editable : false , dataType: "numeric", width : 100, formatString: "#,##0"  , style:"right" }
		,{ dataField : "cnt",      headerText : "수량", width : 60 , style : "right auigrid-must-col-style"  }
		,{ dataField : "unitPrice",     headerText : "단가", dataType: "numeric", width : 100, formatString: "#,##0"  , style:"right auigrid-must-col-style" }
		,{ dataField : "salePrice",     headerText : "공급가액", editable : false , dataType: "numeric", width : 80, formatString: "#,##0"  , style:"right"}
		,{ dataField : "taxPrice",     headerText : "세액", editable : false , dataType: "numeric", width : 80, formatString: "#,##0"  , style:"right"}
		,{ dataField : "sumPrice",     headerText : "합계", editable : false , dataType: "numeric", width : 100, formatString: "#,##0"  , style:"right"}
		,{ dataField : "memo1",     headerText : "비고1"  , style : "auigrid-opt-col-style"}
		,{ dataField : "memo2",     headerText : "비고2"  , style : "auigrid-opt-col-style"}
		,{ dataField : "rcvCustCode",     headerText : "주문처코드", width: 80 ,editable : false }
		,{ dataField : "rcvCustName",      headerText : "주문처명" , width: 150, editable : false, style : "left"   
		 /*	,renderer: {
				type: "IconRenderer",
				iconWidth: 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
				iconHeight: 16,
				iconPosition: "aisleRight",
				iconTableRef: { // icon 값 참조할 테이블 레퍼런스
					"default": "/resources/img/content_paste_search_black_24dp.svg" // default
				},
				onClick: function (event) {
					//alert("( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.item.name + " 달력 클릭");

					$("#grid-custCode1").val("rcvCustCode");
					$("#grid-custName1").val("rcvCustName");
					var dialogCust;
					dialogCust = $( "#dialog-form-cust" ).dialog({
					    //autoOpen: false,
					    height: 700,
					    //minWidth: 500,
					    width: "70%",
					    modal: true,
					    headerHeight: 40,
						//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
						position:[400,400],
						buttons: {
							"확인": function(event) {
								updateGridRowCust("rcvCustCode", "rcvCustName");
							},
							"취소": function (event) {
								dialogCust.dialog("close");
							}
						},
					    close: function() {
					     // $( "#users tbody tr td" ).empty();	   	
					    }
					});	
					createGridCust(columnLayoutCust);
					dialogCust.dialog("open");
				}
			}  */
		 }
	 
		,{ dataField : "rcvLogisCode",     headerText : "수령물류센터", width : 100 , editable : false,
		renderer : { // 셀 자체에 드랍다운리스트 출력하고자 할 때
		            type : "DropDownListRenderer",
		            list :logisCodeList
		      }}
		,{
		     dataField : "importYN",
		     headerText : "수입여부",
		     width : 90,
		     renderer : {
		            type : "CheckBoxEditRenderer",
		            showLabel : true,
		            editable:true,
		            checkValue : "Y", // true, false 인 경우가 기본
					unCheckValue : "N"
		     },
		     headerRenderer : {
	            type : "CheckBoxHeaderRenderer",
	            position : "right", 
	            dependentMode : true
	     	 },
		     defalte : 'N' 
		}
		,{ dataField : "placeReqNo",      headerText : "발주요청번호" , editable : false   , width: 100 }
		,{ dataField : "reqSeq",      headerText : "발주요청순번" ,width : 80, editable : false    }
		,{ dataField : "orderNo",     headerText : "주문번호",width : 100 , editable : false }
		,{ dataField : "orderSeq",     headerText : "주문순번", width : 60, editable : false }
		,{ dataField : "dlvType",     headerText : "배송유형", width : 100, editable : false }
		,{ dataField : "orderGroupId",      headerText : "주문그룹ID"  ,width : 100 , editable : false,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}   }
		,{ dataField : "carNo",      headerText : "차량번호" ,width : 80, editable : false    }
		
	];
	
	// 푸터 설정
	var footerLayout = [{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}
	, {		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0",style: "right"	}
	, {		dataField: "unitPrice",		positionField: "unitPrice",		operation: "SUM",		formatString: "#,##0",style: "right"	}
	, {		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0",style: "right"	}
	, {		dataField: "saleUnitPrice",		positionField: "saleUnitPrice",		operation: "SUM",		formatString: "#,##0",style: "right"	}
	];
	
	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		selectionMode: "multiRow",
		
		editable : true,		
		
		// 드래깅 행 이동 가능 여부 (기본값 : false)
		enableDrag: true,
		// 다수의 행을 한번에 이동 가능 여부(기본값 : true)
		enableMultipleDrag: true,
		// 셀에서 바로  드래깅 해 이동 가능 여부 (기본값 : false) - enableDrag=true 설정이 선행 
		enableDragByCellDrag: false,
		// 드랍 가능 여부 (기본값 : true)
		enableDrop: true,
					
		// 상태 칼럼 사용
		showStateColumn : true,
		rowIdField: "idx",
		showRowCheckColumn: false,

		// 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
		enterKeyColumnBase: true,


		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,
		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,
		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		

		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
		
		// No Data 메지시 미출력
		showAutoNoDataMessage: false,
		
		//footer 노출
		showFooter: true,
		rowIdField: "idx",

		/*
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
		*/		
	};

	
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	addRow(myGridID,'last');  //첫행 자동 추가  
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

	// 셀 선택변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		//var primeCell = event.primeCell; 
		//console.log("현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ), 값 : " + primeCell.value);
		var allItems = AUIGrid.getGridData(myGridID);
       AUIGrid.removeRow(myGridID, allItems .length+1);
       fn_dcProc();
      // console.log(5);
	});	
		
	//품번 붙여넣기 완료한 경우. 
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
			dspNo  = AUIGrid.getCellValue(myGridID, i, "dspNo");
			//console.log("itemId:"+itemId);
			//console.log("itemNo:"+itemNo);
			if ( dspNo === undefined || dspNo == '' ){  //상품ID 존재하는 경우만. 이게 원본
				rowIndexes[j] = i;
				j = j+1 ; 
			}
		}
		AUIGrid.removeRow(myGridID, rowIndexes);		
		
		fn_dcProc();
	});
	
	//셀더블클릭한 경우 -->필요없는듯.
	
	AUIGrid.bind(myGridID, "cellDoubleClick", function( event ) {
     /*
		if (event.dataField == 'itemNo'){ //품번조회인 경우 
		$("#srchEqualItemNo").val(event.value); 
		$("#pop_itemNo").val(event.value);
		$("#pop_itemName").val();
		findItem('/base/item-list', 0,event.rowIndex,'','Y');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
		
	    fn_dcProc();
	   }
	  */
	  if (event.dataField == 'orderGroupId'){
		let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'orderGroupId');
		    obj.setAttribute('value', event.value);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/order-group-item-list');
		    document.body.appendChild(f);
		    f.submit();
		
		}  
	   
	});
  	
 
 	// 드랍 종료 이벤트 바인딩
	AUIGrid.bind(myGridID, "dropEnd", function (e) {
		// 정보 출력
		//var direction = e.direction == true ? "위에서 아래로" : "아래에서 위로";
		//var msg = "드랍 완료 : " + e.fromRowIndex + "→" + e.toRowIndex + " 에 " + e.items.length + " 행(들) 드랍 됨(진행 방향 : " + direction + ")";
		//document.getElementById("ellapse_e").innerHTML = msg;
		//console.log("index:"+e.toRowIndex);
		var item = { dspNo : e.toRowIndex + 1}; 
  		
		AUIGrid.updateRow(myGridID, item, e.toRowIndex);
					
		var allItems = AUIGrid.getGridData(myGridID);
		var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
		for (var i = 0, len = allItems.length; i < len; i++) {
			rowItem = allItems[i];
			rowId = rowItem[rowIdField];
			dspNo = AUIGrid.getCellValue(myGridID, i, "dspNo");
			if (dspNo != i+1) {
				var item = { dspNo : i + 1};
				AUIGrid.updateRow(myGridID, item, i);
			}			
		}
		
	});
	
	//행상태 클릭한 경우
	AUIGrid.bind(myGridID, "rowStateCellClick", function( event ) {

        if(event.marker == "removed") { // 현재 삭데된 상태를 클릭 한 경우
        	//console.log("state remove:"+event.rowIndex);
         	fn_dcProc("remove",event.rowIndex);
            //if("수정 취소 즉, 원래 값으로 복구 하시겠습니까?") {
            //    return true;
            // } 
            // return false;
         }
  	});
  	
  	 	
	// keyDown 이벤트 바인딩
	AUIGrid.bind(myGridID, "keyDown", function (event) {
		if (event.keyCode == 45) { // Insert 키
			return false; // 기본 행위 안함.
		}
	});	
	/*행추가만 편집되게 하는법 모르겠음
	AUIGrid.bind(myGridID, "cellEditBegin", function(event) {
		// rowIdField 설정 값 얻기
		var rowIdField = AUIGrid.getProp(event.pid, "rowIdField");

		if (event.dataField == "itemNo") {
			// 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
			if (AUIGrid.isAddedById(event.pid, event.item[rowIdField])) {
				return true;
			} else {
				return false; // false 반환하면 기본 행위 안함(즉, cellEditBegin 의 기본행위는 에디팅 진입임)
			}
		}

		return true; // 다른 필드들은 편집 허용
	})
	*/
	
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
	if (event.dataField == 'itemNo'){ //품번으로 품목찾기
		setStartSpinner();
		$("#srchEqualItemNo").val(event.value); 
		$("#pop_itemNo").val(event.value);
		$("#pop_itemName").val();
		if(event.oldValue == null || event.oldValue == '') {  //2024.03.21 sg 값이 없는 경우만 행추가
			addRow(myGridID,'last');  //부품찾은 후 행추가
		}
		findItem('/base/item-list', 0,event.rowIndex,'','N');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
	    fn_dcProc();
		setStopSpinner();
	    
	}else if (event.dataField == 'cnt' || event.dataField == 'unitPrice' ) {
		var sumPrice = event.item.cnt * event.item.unitPrice; 
		//AUIGrid.updateRow(myGridID, { "sumPrice": sumPrice }, event.rowIndex);
		//console.log("sumPrice:"+sumPrice);
		fn_dcProc();	
	}
};
	
		


// 행 추가, 삽입
function addRow(grid,rowPos) {
	var item = new Object();
	var gridData = AUIGrid.getGridData(myGridID);
	
    item.dspNo = gridData.length+1;
    
	// parameter
	// item : 삽입하고자 하는 아이템 Object 또는 배열(배열인 경우 다수가 삽입됨)
	// rowPos : rowIndex 인 경우 해당 index 에 삽입, first : 최상단, last : 최하단, selectionUp : 선택된 곳 위, selectionDown : 선택된 곳 아래
	//AUIGrid.addRow(myGridID, item, rowPos);
	AUIGrid.addRow(myGridID, item, rowPos);	
};


// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {
	setStartSpinner();
	
	var placeNo = $("#placeNo").val();  
    var custCode = $("#custCode").val(); 
    var custMgrName = $("#custMgrName").val(); 
    var custMgrPhone = $("#custMgrPhone").val(); 
    var supplyCustCode = $("#supplyCustCode").val(); 
    var supplyMgrName = $("#supplyMgrName").val(); 
    var supplyMgrPhone = $("#supplyMgrPhone").val(); 
    //var placeDmdYmd = $("#placeDmdYmd").val(); 
    var whSchYmd = $("#whSchYmd").val(); 
    var turnNum = $("#turnNum").val(); 
    var memo1 = $("#memo1").val(); 
    var memo2 = $("#memo2").val(); 
    var custOrderNo = $("#custOrderNo").val();
   // console.log("memo2:"+ $("#memo2").val());
    
    var salePrice = $("#salePrice").val();
    var taxPrice = $("#taxPrice").val();
    var sumPrice = $("#sumPrice").val();
    
    var directYN =  "N";
  	  if ($('input:checkbox[name=directYN]').is(':checked') == true){	
					directYN = "Y";		}	
	var directCost = 	$("#directCost").val();		
    var placeYmd = $("#placeYmd").val(); //발주일 0907
    var whSchTime = $("#whSchTime").val(); //발주일 0907
    
    var taxType = $("#taxType").val(); 
    
    //필수값 체크
    if (custCode == '') {	
		document.getElementById('btnReg').classList.toggle('disabled');
		setStopSpinner();  alert("판매거래처코드는 필수 입력해야 합니다.");		  $("#custCode").focus();		return;	
	}

	fn_delBlankRowAll(myGridID, "itemId");  //itemId가 공백인것은 상태값 초기화하여 저장안되게 처리.
	// AUIGrid 에서 추가, 삭제, 수정된 행들 얻기
	// 추가된 행 아이템들(배열)
  	var addList = AUIGrid.getAddedRowItems(myGridID);                   
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowItems(myGridID); 
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);    
    
	//var isValid1 = AUIGrid.validateGridData(myGridID, ["itemNo", "unitPrice", "cnt"], "품번, 수량, 입고단가 필드는 반드시 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["itemNo", "cnt", "unitPrice"], "품번, 수량, 입고단가 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
	/*	
	if (isValid1 == false || isValidChanged1 == false) {
		document.getElementById('btnReg').classList.toggle('disabled');
		setStopSpinner();
		return;
	}*/ 
		if (isValidChanged1 == false) {
		document.getElementById('btnReg').classList.toggle('disabled');
		setStopSpinner();
		return;
	}
		
	var data = {};
	
	//console.log("addList : " + addList);
	
	if(addList.length > 0) data.placeItemAdd = addList;
	else data.placeItemAdd = [];
	
	if(updateList.length > 0) data.placeItemUpdate = updateList;
	else data.placeItemUpdate = [];
	
	if(removeList.length > 0) data.placeItemRemove = removeList;
	else data.placeItemRemove = [];
	
	if (!placeNo || placeNo.trim() == '') {
		if (addList.length === 0) {
			document.getElementById('btnReg').classList.toggle('disabled');
			setStopSpinner();
			alert("부품을 적어도 1개 이상 입력을 해야합니다");return;
		}
	}	

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
  //  data.placeDmdYmd = placeDmdYmd; 
    data.whSchYmd = whSchYmd; 
    data.turnNum = turnNum;
    data.memo1 = memo1; 
    data.memo2 = memo2; 
    data.custOrderNo = custOrderNo; 
    
    salePrice = salePrice.replace(/,/gi, "");
    taxPrice = taxPrice.replace(/,/gi, "");
    sumPrice = sumPrice.replace(/,/gi, "");
    
    data.price = Number(salePrice);
    data.taxPrice = Number(taxPrice);
    data.sumPrice = Number(sumPrice);
    
    data.directYN = directYN; 
    data.directCost = directCost; 
    data.placeYmd = placeYmd;    
    data.whSchTime = whSchTime;    
   
   //2023.10.04  hsg -검증데이터존재여부
   // var dataComCode = $("#dataComCode").val();   //dataComCode 사용안함
    
    /*
    if ( dataComCode == '' || dataComCode == undefined){
		alert("유효한 데이터가 아닙니다. 재로그하세요.")
		location.reload();
		return;
	}
	*/
	
	//data.dataComCode = dataComCode;
	
	data.taxType = taxType;
    //data.sumPriceKor = sumPriceKor;    
   //console.log("data:"+JSON.stringify(data));
   // return;
  	//console.log(11);

	if(dblRegClkChk()) return;  //Reg Double click Check 2023.11.10.
  
 
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
		    setStopSpinner();
	        //alert("성공:"+data.success);
	       // console.log("data.estiNo:"+data.estiNo);
	        alert(data.result_code+":"+data.result_msg);
	        //alert(data.estiNo)
	        //location.reload();
	        
	    
	        //post형식으로 페이지 데이터 조회
			let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'placeNo');
		    obj.setAttribute('value', data.placeNo);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/place-up');
		    document.body.appendChild(f);
		    f.submit();
		    
	    },
	    error:function(request, status, error){
		    setStopSpinner();
	        alert("code:"+request.status+"\n"+"error:"+error);
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
	
	if(addedRowItems.length > 0) {
		str += "---추가된 행\r\n";
		for(i=0, len=addedRowItems.length; i<len; i++) {
			rowItem = addedRowItems[i]; // 행아이템 
			// 전체 조회
			for(var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";	
			}
			str += "\r\n";
		}
	}
	
	if(editedRowItems.length > 0) {
		str += "---수정된 행\r\n";
		for(i=0, len=editedRowItems.length; i<len; i++) {
			rowItem = editedRowItems[i]; // 행아이템
			
			// 전체 조회
			for(var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";	
			}
			str += "\r\n";
		}
	}
	
	if(removedRowItems.length > 0) {
		str += "---삭제된 행\r\n";
		for(i=0, len=removedRowItems.length; i<len; i++) {
			rowItem = removedRowItems[i]; // 행아이템
			// 전체 조회
			for(var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";	
			}
			str += "\r\n";
		}
	}
	
	
	// 하단에 정보 출력.
	$("#desc_info").html("추가 개수 : " + addedRowItems.length + ", 수정 개수 : " + editedRowItems.length + ", 삭제 개수 : " + removedRowItems.length); 
	
	
	if(str == "")
		str = "변경 사항 없음";
	
	alert(str);
}




function removeRow() {

	//var rowPos = document.getElementById("removeSelect").value;

	AUIGrid.removeRow(myGridID, "selectedIndex");
	alert("행삭제 버튼을 누르고 수정버튼을 눌러야 저장됩니다.");
};
	



//발주요청품목 조회
function findReqItem(url) {
	
//	console.log("checkin")
	//var list = [];
	var reqArr = $("#reqArr").val();
	var seqArr = $("#seqArr").val();
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"reqArr":reqArr,
			"seqArr":seqArr
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.placeReqItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");
				$("#iDiv_noDataPop").css("display","block");									
			}else{
					
				var item = new Object();
				let i=0;
				
				for(i=0;i<data.placeReqItemList.length;i++){

					if (i == 0){
						placeCustCode = data.placeReqItemList[i].placeCustCode; 
						placeCustName = data.placeReqItemList[i].placeCustName;
						placeDmdYmd = data.placeReqItemList[i].placeDmdYmd;
						whSchYmd = data.placeReqItemList[i].whSchYmd;
						//console.log("placeDmdYmd: "+placeDmdYmd);
						//console.log("whSchYmd: "+whSchYmd);
						//supplyCustCode = data.placeReqItemList[i].supplyCustCode; 
						//supplyCustName = data.placeReqItemList[i].supplyCustName;
						$("#dataComCode").val(data.placeReqItemList[i].comCode);  //2023.10.04 by dataCheck
					}
					
					dspNo = data.placeReqItemList[i].dspNo;
					if (dspNo == 0) {
						dspNo = 999;
					}
					
				    //item.placeSeq = data.placeReqItemList[i].placeSeq 
					 item.makerName = data.placeReqItemList[i].makerName 
					,item.itemId = data.placeReqItemList[i].itemId 
					,item.itemNo = data.placeReqItemList[i].itemNo 
					,item.itemName = data.placeReqItemList[i].itemName
					//,item.itemNameEn = data.placeReqItemList[i].itemNameEn 
					,item.cnt = data.placeReqItemList[i].cnt 
					,item.saleUnitPrice = data.placeReqItemList[i].salePrice
					,item.unitPrice = data.placeReqItemList[i].unitPrice 						
					,item.sumPrice = data.placeReqItemList[i].cnt * data.placeReqItemList[i].unitPrice 
					,item.memo1 = data.placeReqItemList[i].memo1 
					,item.memo2 = data.placeReqItemList[i].memo2 
					//,item.supplyCustCode = data.placeReqItemList[i].supplyCustCode
					//,item.supplyCustName = data.placeReqItemList[i].supplyCustName
					,item.placeReqNo = data.placeReqItemList[i].placeReqNo
					,item.reqSeq = data.placeReqItemList[i].reqSeq
					,item.orderGroupId = data.placeReqItemList[i].orderGroupId
					,item.dspNo = i+1
					,item.rcvCustCode = data.placeReqItemList[i].rcvCustCode
					,item.rcvCustName = data.placeReqItemList[i].rcvCustName
					,item.orderNo = data.placeReqItemList[i].orderNo
					,item.orderSeq = data.placeReqItemList[i].orderSeq
					,item.carNo = data.placeReqItemList[i].carNo    // 2024.02.23 
					,item.rcvLogisCode = (data.placeReqItemList[i].rcvLogisCode ?? '')
					,item.gvComCode = data.placeReqItemList[i].gvComCode    // 20240405 yoonsang
					,item.gvComName = data.placeReqItemList[i].gvComName    // 20240405 yoonsang
					
					,item.importYN = 'N' // 20240715 수입여부 최초등록시에는 N기본
					
					,item.className = data.placeReqItemList[i].className
					,item.factoryNo = data.placeReqItemList[i].factoryNo
					AUIGrid.addRow(myGridID, item, "last");	
				}			
				
				$("#custCode").val(placeCustCode);
				$("#custName").val(placeCustName);
				$("#placeDmdYmd").val(placeDmdYmd);
				$("#whSchYmd").val(whSchYmd);				
				
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




//  조회
function findPlace(url) {
	var placeNo = $("#placeNo").val();
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":"LIST",
			"placeNo":placeNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.placeList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				$("#iDiv_noDataPop").css("display","block");		
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					//console.log("data:"+JSON.stringify(data));

				for(let i=0;i<data.placeList.length;i++){
				
			        let regYmd = data.placeList[i].regYmd; 
					let whSchYmd = data.placeList[i].whSchYmd; 
					let turnNum = data.placeList[i].turnNum; 
					let custCode = data.placeList[i].custCode;
					let custName = data.placeList[i].custName; 
					let custMgrName = data.placeList[i].custMgrName;
					let custMgrPhone = data.placeList[i].custMgrPhone;
					let custOrderNo = data.placeList[i].custOrderNo; 
					let price = data.placeList[i].price; 
					let taxPrice = data.placeList[i].taxPrice; 
					let sumPrice = data.placeList[i].sumPrice;
					let memo1 = data.placeList[i].memo1;
					let memo2 = data.placeList[i].memo2;
					let directYN = data.placeList[i].directYN;
					let directCost = data.placeList[i].directCost;
					let regUserName = data.placeList[i].regUserName;
					let linkTkKey = data.placeList[i].linkTkKey;
					let linkGvKey = data.placeList[i].linkGvKey;
					let gvPlacNo = data.placeList[i].gvPlacNo;
					let placeDmdYmd = data.placeList[i].placeDmdYmd; 
					let placeYmd = data.placeList[i].placeYmd; //발주일자
					let whSchTime = data.placeList[i].whSchTime; //입고예상시간
					let taxType = data.placeList[i].taxType;
					if(directYN== "Y"){
						 $('#directYN').prop('checked', true);
						$('#directCost').css('display', 'block');
					}else{
						 $('#directYN').prop('checked', false);
					}
					
					$("#regYmd").val(regYmd);
					$("#whSchYmd").val(whSchYmd); 
					$("#turnNum").val(turnNum); 
					$("#custCode").val(custCode); 
					$("#custName").val(custName); 
					$("#custMgrName").val(custMgrName);
					$("#custMgrPhone").val(custMgrPhone); 
					$("#custOrderNo").val(custOrderNo); 
					$("#salePrice").val(_cf_comma(price)); 
					$("#taxPrice").val(_cf_comma(taxPrice)); 
					$("#sumPrice").val(_cf_comma(sumPrice)); 
					$("#memo1").val(memo1); 
					$("#memo2").val(memo2); 
					$("#directCost").val(directCost); 
					$("#regUserName").val(regUserName); 
				
					$("#linkTkKey").val(linkTkKey); 
					$("#linkGvKey").val(linkGvKey); 
					$("#gvPlacNo").val(gvPlacNo); 
					$("#placeDmdYmd").val(placeDmdYmd); 
					$("#placeYmd").val(placeYmd); 
					$("#whSchTime").val(whSchTime); 
				
				    $("#dataComCode").val(data.placeList[i].comCode);  //2023.10.04 by dataCheck
				
				    $("#taxType").val(taxType); 
				    
					//등록버튼 비활성화, 수정/삭제 활성화
					//console.log("check in ")
					document.getElementById('btnReg').classList.toggle('disabled'); 
					document.getElementById('btnUpt').classList.toggle('disabled'); 
					document.getElementById('btnDel').classList.toggle('disabled');				

					document.getElementById('btnPrint').classList.toggle('disabled');
					document.getElementById('btnList').classList.toggle('disabled');
					//document.getElementById('exportXls').classList.toggle('disabled');		
					//document.getElementById('exportPdf').classList.toggle('disabled');					
															
				}		
				findPlaceItem('/order/place-item-list');				
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

//품목 조회
function findPlaceItem(url) {
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	var list = [];
	var placeNo = $("#placeNo").val();
	var taxType = $("#taxType").val();
	var unitPrice =0;
	var salePrice =0;
	var taxPrice =0;

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"placeNo":placeNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
		 
			if (data.placeItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");	
				$("#iDiv_noDataPop").css("display","block");								
			}else{
				let i=0;	
				for(i=0;i<data.placeItemList.length;i++){
					let dspNo;				
					dspNo = data.placeItemList[i].dspNo;
					if (dspNo == 0) {
						dspNo = 999;
					}
					if(taxType == 3){
						unitPrice = data.placeItemList[i].unitPrice + data.placeItemList[i].taxPrice
						salePrice = data.placeItemList[i].unitPrice;
						taxPrice = data.placeItemList[i].taxPrice
					}else{
						unitPrice = data.placeItemList[i].unitPrice;
						salePrice = data.placeItemList[i].unitPrice;
						taxPrice = data.placeItemList[i].taxPrice
									
					}
				    list.push({
						 idx: data.placeItemList[i].placeSeq
						,dspNo: dspNo
						,placeSeq: data.placeItemList[i].placeSeq 
						,itemId: data.placeItemList[i].itemId 
						,itemNo: data.placeItemList[i].itemNo 
						,itemName: data.placeItemList[i].itemName
						//,itemNameEn: data.orderItemList[i].itemNameEn 
						,cnt: data.placeItemList[i].cnt 
						,unitPrice: unitPrice
						,saleUnitPrice: data.placeItemList[i].saleUnitPrice 
						,sumPrice: data.placeItemList[i].sumPrice
						,memo1: data.placeItemList[i].memo1 
						,memo2: data.placeItemList[i].memo2
						,placeReqNo: data.placeItemList[i].placeReqNo
						,reqSeq: data.placeItemList[i].reqSeq
						,orderGroupId: data.placeItemList[i].orderGroupId
						,rcvCustCode: data.placeItemList[i].rcvCustCode
						,rcvCustName: data.placeItemList[i].rcvCustName
						,orderNo: data.placeItemList[i].orderNo
						,orderSeq: data.placeItemList[i].orderSeq
						,dlvType: data.placeItemList[i].dlvType
						,makerName: data.placeItemList[i].makerName
						,salePrice: salePrice
						,taxPrice: taxPrice
						,rcvLogisCode : data.placeItemList[i].rcvLogisCode
						,carNo : data.placeItemList[i].carNo
						,importYN : data.placeItemList[i].importYN || 'N' //값이없으면 N
						
						,className: data.placeItemList[i].className
						,factoryNo: data.placeItemList[i].factoryNo
					});
					
				}		
				AUIGrid.setGridData("#grid_wrap", list);
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


//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowCust(obj,name) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
		
	item = {
					rcvCustCode: rowItem.custCode,
					rcvCustName: rowItem.custName,
				};

	AUIGrid.updateRow(myGridID, item, "selectedIndex");
	
	var dialogCust;
	dialogCust = $( "#dialog-form-cust");			
	dialogCust.dialog("close");
	
}

// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;
/*
//다이얼로그창 선택하는 경우 그리드에 디스플레이
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
	};

	AUIGrid.updateRow(myGridID, item, "selectedIndex");
	
	var dialogItem;
	dialogItem = $( "#dialog-form-item");			
	dialogItem.dialog("close");
}
*/
//다이얼로그창 선택하는 경우 그리드에 디스플레이
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
// 발주 인쇄 23.04.03 김보경

$("#print").click(function() {
	var placeNo = $("#placeNo").val();
	var printMemoYN = "";
	
	var isPrintMemoYN = $('input:checkbox[name=printMemoYN]').is(':checked');
	
    if(isPrintMemoYN == true){
		printMemoYN = 'Y';
	}else{
		printMemoYN = 'N';
	}
	
	//window.location.href = "/order/place-up-print?placeNo="+placeNo+"&memoYN="+printMemoYN;
	//window.location.href = "/order/esti-up-print?estiNo="+ $("#estiNo").val();
	//console.log("클릴잉");
	var url ="/order/place-up-print?placeNo="+placeNo+"&memoYN="+printMemoYN;
	window.open(url, "_blank");
});

$("#btnDownload").click(function() {
	var placeNo = $("#placeNo").val();
	var printMemoYN = "";
	var imgYN = "Y";

	var isPrintMemoYN = $('input:checkbox[name=printMemoYN]').is(':checked');
	
    if(isPrintMemoYN == true){
		printMemoYN = 'Y';
	}else{
		printMemoYN = 'N';
	}


	//window.location.href = "/order/place-up-print?placeNo="+placeNo+"&memoYN="+printMemoYN+"&imgYN="+imgYN;
	//window.location.href = "/order/esti-up-print?estiNo="+ $("#estiNo").val();
	//console.log("클릴잉");
		var url ="/order/place-up-print?placeNo="+placeNo+"&memoYN="+printMemoYN+"&imgYN="+imgYN;
	window.open(url, "_blank");
});

function print() {
	
	var dialogPrint;
	dialogPrint = $( "#dialogPrint-form" ).dialog({
	    autoOpen: false,
	    height: 300,
	    //minWidth: 500,
	    width: "30%",
	    modal: true,
	    buttons: {
	      /* "Create an account": addUser,*/ 
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

function direct_chk(){
	if ($('input:checkbox[name=directYN]').is(':checked') == true){
		$("#directCost").css("display", "block");
	}else{
		$("#directCost").css("display", "none");
		//$("#directCost").val(0);
		$("#directCost").val("");
	}
}

function orderReqList(){
	openOReqDialog()
}

function openOReqDialog() {
var dialogOReq;
	dialogOReq = $( "#dialogOReq-form" ).dialog({
		height: 200,
		width: 1600,
		modal: true,
		headerHeight: 40,
		//position: [400, 400],
		buttons: {/*
			"닫기": function(event) {
				dialogOReq.dialog("close");
			}*/
		},
		close: function() {
		}
	});
	  $(".ui-dialog-titlebar-close").html("X");
	  dialogOReq.dialog( "open" );
	  var keyValueList3 = findDataToServer3("/base/cust-list", "N");
	  createAUIGrid_oReq(keyValueList3);
	  findPcReq();
			  
}

function createAUIGrid_oReq(keyValueList3) {
	var keyValueList4 = JSON.parse(keyValueList3);
	
	var columnLayout = [ 
	 { dataField : "pcReqNo",    headerText : "주문요청번호", width : 100 ,editable : false } 
	,{ dataField : "gvPlacNo",   headerText : "발주번호", width: 100,editable : false} 
	,{ dataField : "procStep",   headerText : "진행상태", width: 60,editable : false} 
	,{ dataField : "placeCustName",     headerText : "구매처"  ,sortType: 1,cellMerge: true,	editable: true,  style : "left auigrid-must-col-style", 
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
		} 
	}
	//,{ dataField : "custName",     headerText : "주문처" , style:"left" }
	,{ dataField : "gvMemo",     headerText : "요청메모" , style:"left" , style:"left auigrid-opt-col-style"   ,editable : true }
	,{ dataField : "rejectMemo",     headerText : "거부사유" , style:"left" ,editable : false}
	,{ dataField : "gvMgr",     headerText : "요청자ID", width : 80  , visible : false  }
	,{ dataField : "gvMgrName",     headerText : "요청자", width : 80 ,editable : false}
	,{ dataField : "procUserId",     headerText : "접수자ID", width : 80  , visible : false}
	,{ dataField : "procUserName",     headerText : "접수자", width : 80  ,editable : false}
	,{ dataField : "uptYmd",     headerText : "수정일", width : 80 ,editable : false }
	
	];

	
	var auiGridProps = {			
			editable : true,			
			selectionMode: "singleRow",
			// 상태 칼럼 사용
			//showStateColumn : true,
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			//pageRowCount: 50,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			//showPageRowSelect: true,

			selectionMode : "multipleCells",
			showAutoNoDataMessage : false,
			
	};
	myGridID_oReq = AUIGrid.create("#grid_wrap_oReq", columnLayout, auiGridProps);
};


function orderReqReg(workingType){

	var gvPlacNo = $("#placeNo").val();
	var pcReqNo = ''; 
	var placeCustCode = ''; 
	var gvMemo = ''; 
	if(workingType == "UPT" || workingType == "DEL"){
		pcReqNo = AUIGrid.getCellValue(myGridID_oReq, 0, "pcReqNo");
		placeCustCode = AUIGrid.getCellValue(myGridID_oReq, 0, "placeCustName");
		gvMemo = AUIGrid.getCellValue(myGridID_oReq, 0, "gvMemo");
	}
	if(workingType == "UPT" || workingType == "DEL"){
		pcReqNo = AUIGrid.getCellValue(myGridID_oReq, 0, "pcReqNo");
		placeCustCode = AUIGrid.getCellValue(myGridID_oReq, 0, "placeCustName");
		gvMemo = AUIGrid.getCellValue(myGridID_oReq, 0, "gvMemo");
	}
	var data = {};
	data.workingType = workingType;
	data.gvPlacNo = gvPlacNo; 
	data.pcReqNo = pcReqNo; 
	data.placeCustCode = placeCustCode; 
	data.gvMemo = gvMemo; 

	
	$.ajax({
		url: "/order/pcReqAdd",
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

function findPcReq(){
	var list = [];
	var gvPlacNo = $("#placeNo").val();
	
	$.ajax({
		url: "/order/pc-req-list",
		dataType: "json",
		type: "POST",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		data: {
				"workingType" : "LIST_GV",
				"gvPlacNo" : gvPlacNo
		},
		success:function(data){
			
			if (data.pcReqList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				let i=0;
				for(i=0;i<data.pcReqList.length;i++){
				list.push({
				
					pcReqNo : data.pcReqList[i].pcReqNo,
					gvPlacNo : data.pcReqList[i].gvPlacNo,
					procStep : data.pcReqList[i].procStep,
					placeCustName : data.pcReqList[i].placeCustCode,
					gvMemo : data.pcReqList[i].gvMemo,
					rejectMemo : data.pcReqList[i].rejectMemo,
					gvMgr : data.pcReqList[i].gvMgr,
					gvMgrName : data.pcReqList[i].gvMgrName,
					procUserId : data.pcReqList[i].procUserId,
					procUserName : data.pcReqList[i].procUserName,
					uptYmd : data.pcReqList[i].uptYmd
					
					})		
															
				}		
				
				AUIGrid.setGridData(myGridID_oReq, list);
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

function findDataToServer3(url, listYN) {
	$(".ui-dialog-titlebar-close").html("X");
	var list = []; //자바스크립트 배열선언
	var listS;
	
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"placeYN":"Y" 
			,"orderBy": "custName"
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {

			if (data.custList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {
				var j = 0;
				arr_text = "<select id='mCode' style='padding:7px 20px;' >";
				for (i = 0; i < data.custList.length; i++) {
					if (data.custList[i].custType == "C3") {
						code = data.custList[i].custCode;
						value = data.custList[i].custName;
						list[j] = { "code": code, "value": value };
						j = j + 1;
						arr_text = arr_text + "<option value=" + code + " mname=" + value + ">" + code + "-" + value + "</option>";
					}
				}
				arr_text = arr_text + "</select>";
				if (listYN == "Y") { $("#srChoice tbody tr td").append(arr_text); };
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

function openDialogUptOrderCnt(){
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	if (checkedItems.length > 1) {
		alert("주문수량변경은 한 품목씩만 가능합니다. 하나만 체크해주세요.");
		return;
	}
	
	let orderNo='';
	let orderSeq='';
	let placeReqNo='';
	let placeReqSeq='';
	let custName='';
	let itemId='';
	let itemNo='';
	let itemName='';
	
	let rowItem;
	let rowIdField = AUIGrid.getProp(myGridID, "idx");	

	rowItem = checkedItems[0];
	
	orderNo = rowItem.item.orderNo;
	orderSeq = rowItem.item.orderSeq;
	placeReqNo = rowItem.item.placeReqNo;
	placeReqSeq = rowItem.item.reqSeq;
	custName = rowItem.item.rcvCustName;
	itemId = rowItem.item.itemId;
	itemNo = rowItem.item.itemNo;
	itemName = rowItem.item.itemName;
	
	if (orderNo=="" || orderSeq=="") {
		alert("주문이 있는 발주만 주문수정이 가능합니다.");
		return;
	}
	if (placeReqNo=="" || placeReqSeq=="") {
		alert("발주요청이 있는 발주만 주문수정이 가능합니다.");
		return;
	}
	
	$("#pop_custName").val(custName);
	$("#pop_itemId").val(itemId);
	$("#pop_itemNo2").val(itemNo);
	$("#pop_itemName2").val(itemName);
	
	
	findOrderToUptCnt(orderNo,orderSeq,placeReqNo,placeReqSeq);
	
	
	$(".ui-dialog-titlebar-close").html("X");
	let dialogOrderCntUpt;
	dialogOrderCntUpt = $("#dialog-form-upt-order-cnt").dialog({
		//autoOpen: false,
		height: 500,
		//minWidth: 500,
		width: 400,
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position: [400, 400],
		buttons: {
			//"확인": uptOrderCnt,
			"확인": function(event) {
				if (!confirm("정말 주문변경을 하시겠습니까?")){
					return;
				}
				orderCntUpt(orderNo,orderSeq,placeReqNo,placeReqSeq);
			},
			"취소": function(event) {
				dialogOrderCntUpt.dialog("close");
			}
		},
		close: function() {
			// $( "#users tbody tr td" ).empty();	   	

		}
	});

}

function findOrderToUptCnt(orderNo,orderSeq,placeReqNo,placeReqSeq)
{
	let oiCnt=0;
	let priCnt=0;
	let sumPriCnt=0;
	let sumRlCnt=0;
	let result;
			
	$.ajax(	{
		type : "POST",
		url : "/order/order-cnt-upt-list",
		dataType : "json",
		data: {
			"orderNo":orderNo,
			"orderSeq":orderSeq,
			"placeReqNo":placeReqNo,
			"placeReqSeq":placeReqSeq
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.orderCntUptList.length == 0){
								
			}else{
				result = data.orderCntUptList[0];
				oiCnt=result.oiCnt;
				priCnt=result.priCnt;
				sumPriCnt=result.sumPriCnt;
				sumRlCnt=result.sumRlCnt;
				
				$("#pop_oiCnt").val(oiCnt);
				$("#pop_priCnt").val(priCnt);
				$("#pop_sumPriCnt").val(sumPriCnt);
				$("#pop_sumRlCnt").val(sumRlCnt);
				
				if(sumRlCnt == 0){
					$("#chkRlCnt").prop("checked", false);
				}				
				
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

	
	return;
	
}

function calCnt(){
	
	let uptCnt = parseInt($("#pop_uptCnt").val());	
	let oiCnt_after = parseInt($("#pop_oiCnt").val()) + uptCnt;
	let sumPriCnt_after = parseInt($("#pop_sumPriCnt").val()) + uptCnt;
	let sumRlCnt_after = parseInt($("#pop_sumRlCnt").val()) + uptCnt;
	
	let rlCheckYN = ""; 
	if ($('input:checkbox[name=chkRlCnt]').is(':checked') == true){
		rlCheckYN = "Y"
	}else{
		rlCheckYN = "N"
	}
	
	
	if(oiCnt_after <= 0 ){
		alert("변경 후 주문수량은 최소 한개이상이여야합니다.");
		clearCnt();
		return;
	}
	if(sumPriCnt_after<=0){
		alert("변경 후 발주요청수량은 최소 한개이상이여야합니다.");
		clearCnt();
		return;
	}
	
	$("#pop_oiCnt_after").val(oiCnt_after);
	$("#pop_sumPriCnt_after").val(sumPriCnt_after);
	
	if($("#pop_sumRlCnt").val() != 0 && rlCheckYN == "Y"){
		
		if(sumRlCnt_after<=0){
			alert("변경 후 출고요청수량은 최소 한개이상이여야합니다.");
			clearCnt();
			return;
		}
		$("#pop_sumRlCnt_after").val(sumRlCnt_after);
		
		
	}
	
		
}

function clearCnt(){
	$("#pop_uptCnt").val("");
	$("#pop_oiCnt_after").val("");
	$("#pop_sumPriCnt_after").val("");
	$("#pop_sumRlCnt_after").val("");
		
}

function orderCntUpt(orderNo,orderSeq,placeReqNo,placeReqSeq){
	
	let dialogOrderCntUpt;
	dialogOrderCntUpt = $( "#dialog-form-upt-order-cnt" ).dialog();
	
	if($("#pop_oiCnt").val() == ""){
		alert("주문이없는 발주는 주문수량변경이 불가능합니다.");
		dialogOrderCntUpt.dialog("close");
		return;		
	}
	
	let uptCnt=$("#pop_uptCnt").val();
	let data= {};
	let rlCheckYN = ""; 
	if ($('input:checkbox[name=chkRlCnt]').is(':checked') == true){
		rlCheckYN = "Y"
	}else{
		rlCheckYN = "N"
	}
	
	data.orderNo = orderNo;
	data.orderSeq = orderSeq;
	data.placeReqNo = placeReqNo;
	data.placeReqSeq = placeReqSeq;
	data.uptCnt = uptCnt;
	data.rlCheckYN = rlCheckYN;
	
	$.ajax({
	    url : "/order/order-cnt-upt",
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {

	        alert(data.result_code+":"+data.result_msg);
	        clearCnt();
	        dialogOrderCntUpt.dialog("close");
		    
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	        clearCnt();
	    }
	});
	
	
}


function logisCodeListFind() // 수령물류센터 코드 받아오는 통신
{
	$.ajax({
		type: "POST",
		url: "/base/code-list",
		dataType: "json",
		data: {
			mCode : '9030',
			validYN :'Y'
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		
		success: function(data) {   
			for(let i = 0 ; i < data.codeList.length ; i++)
			{
				logisCodeList.push(data.codeList[i].codeName); // 디테일 auigrid용 리스트 배열에 추가 
			} 
		},
		error: function(e){
			
		}
		
	})
	
}