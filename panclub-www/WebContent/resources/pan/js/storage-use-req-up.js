
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
let logisCodeList = [];


var datepicker = new tui.DatePicker('#wrapper', {
	language: 'ko',
    date: new Date(),
    input: {
        element: '#useDmdYmd',
        format: 'yyyy-MM-dd'
    }
});
    
   
var datepicker2 = new tui.DatePicker('#wrapper2', {
	language: 'ko',
    date: new Date(),
    input: {
        element: '#moveSchYmd',
        format: 'yyyy-MM-dd'
    }
});
    
    
function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
}

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function(){

	$("#supplyInfo-title").css("display","none");
	$("#supplyInfo-input").css("display","none");
	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();	
	
	logisCodeListFind();
	
	// 윈도우 리사이징 이벤트
	window.onresize = function () {

		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
		if (typeof myGridID !== "undefined") {
			AUIGrid.resize(myGridID);
		}
	};
		 
	/*	 
	$("#btnReg").click(function(){
		//alert("등록버튼");
		updateDataToServer("/order/estiAdd", "ADD");
	});
	$("#btnClose").click(function(){
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	$("#btnDel").click(function(){
		//alert("등록버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.견적을 삭제하시겠습니까?")){
			updateDataToServer("/order/estiAdd", "DEL");
		}
	});
	*/

	$("#btnClose").click(function(){
		window.close();    //2023.10.04 popup 시
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
		
	//주문인 경우
	let orderGroupId = $("#orderGroupId").val();
	if (orderGroupId !=''){		
		findOrderGroup('/order/order-group-list');
	}	  
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "orderNo",      headerText : "주문번호", width : 100, editable : false  ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict" }
		,{ dataField : "orderSeq",      headerText : "주문순번", width : 80, editable : false  ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict"}
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80, editable : false ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict"}
		,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false  }
		,{ dataField : "itemNo",      headerText : "품번", width : 100, editable : false ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict"} 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", headerText : "품명", width: 140, editable : false , style : "left" ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict"}
		,{
		     dataField : "logisCode",
		     headerText : "수령물류센터",
		     width : 120,
		     renderer : { // 셀 자체에 드랍다운리스트 출력하고자 할 때
		            type : "DropDownListRenderer",
		            list :logisCodeList
		     },
		     cellMerge: false,
		     mergeRef: "itemId",
		     mergePolicy: "restrict"
		}	 
		//,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "stockQty",      headerText : "창고보유수량", width : 80, editable : false, dataType: "numeric", width : 120, formatString: "#,##0"  , style:"right"  } 
		,{ dataField : "ctableQty",      headerText : "회수가능수량", width : 80, editable : false, dataType: "numeric", width : 120, formatString: "#,##0"  , style:"right"  } 
		,{ dataField : "orderCnt",      headerText : "주문수량", width : 60, editable : false, dataType: "numeric", width : 120, formatString: "#,##0"  , style:"right"  ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict" }
		,{ dataField : "availableCnt",     headerText : "창고사용가능수량", dataType: "numeric", width : 120, formatString: "#,##0"  , style:"right", editable : false }
		,{ dataField : "storageUseCnt",     headerText : "창고사용수량*", dataType: "numeric", width : 100, formatString: "#,##0"  ,style:"right  auigrid-must-col-style" }
		,{ dataField : "storageCode",      headerText : "창고코드", width : 60, editable : false }
		,{ dataField : "storageName",      headerText : "창고명", width : 100, editable : false }
		,{ dataField : "consignCustName",      headerText : "위탁업체명", width : 100, editable : false  }
		,{ dataField : "rackCode",      headerText : "랙코드", width : 60, editable : false }
		,{ dataField : "rackName",      headerText : "랙명", width : 100, editable : false }
		//,{ dataField : "unitPrice",     headerText : "주문단가", editable : false , dataType: "numeric", width : 120, formatString: "#,##0"  , style:"right"}
		//,{ dataField : "sumPrice",     headerText : "합계", editable : false , dataType: "numeric", width : 120, formatString: "#,##0"  , style:"right"}
		,{ dataField : "memo1",     headerText : "비고1", editable : true ,style:"left  auigrid-must-col-style" }
		,{ dataField : "memo2",     headerText : "비고2" , editable : true,style:"left  auigrid-must-col-style" }
	];
	
	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		enableCellMerge: true,
		selectionMode: "singleRow",
		editable : true,			
		// 상태 칼럼 사용
		//showStateColumn : true,
		//rowIdField: "idx",
		showRowCheckColumn: false,

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
		//footer 노출
		showFooter: true,

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

	
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	// 푸터 레이아웃 세팅
	//AUIGrid.setFooter(myGridID, footerLayout);
		
	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);

	// 셀 선택변경 이벤트 바인딩
	/*
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		console.log("현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ), 값 : " + primeCell.value);
	});
	

	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID, "ready", function(event) {
		// ready 이벤트를 바인딩하여 데이터에 맞게 초기 화면설정 작업을 하십시오.
	});
	*/
	
	// 그리드 ready 이벤트 바인딩
	//AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);
	
		// 셀 더블클릭 이벤트 바인딩 : 재고확인 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {
		var orderNo = event.item.orderNo;
		var orderSeq = event.item.orderSeq;
		//if (event.columnIndex == 10) {
		if (event.dataField == "stockQty") {	   
			//findStockChk('/order/order-stock-chk-list',orderNo, orderSeq);
		}		
	});
	
};

function auiCellEditingHandler(event) {
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		if (event.value > event.item.orderCnt  || event.value > math.MAX(event.item.stockQty,event.item.ctableQty) || event.value > event.item.availableCnt) {
			alert("창고사용수량이 창고보유수량 또는 주문수량 또는 창고사용가능수량보다 많습니다!");
			item = {
				storageUseCnt: 0
			};
			AUIGrid.updateRow(myGridID, item, "selectedIndex");
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
 	
 	var item = {};
	item.admCode = mCode; // $("#name").val();
	item.admName = mName; //$("#country").val();
	//item.memo = '';

	AUIGrid.updateRow(myGridID, item, currentRowIndex);
	
	//var dialog;
	//dialog = $( "#dialog-form" );	
	//dialog.dialog("close");
}



function removeRow() {

	//var rowPos = document.getElementById("removeSelect").value;

	AUIGrid.removeRow(myGridID, "selectedIndex");
};
	

//  조회
function findOrderGroup(url) {
	var orderGroupId = $("#orderGroupId").val();

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":"LIST",
			"orderGroupId":orderGroupId
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.orderGroupList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.orderGroupList.length;i++){
					orderGroupId = data.orderGroupList[i].orderGroupId;
					orderType = data.orderGroupList[i].orderType;
				    releaseReqYmd = data.orderGroupList[i].releaseReqYmd; 
					custCode = data.orderGroupList[i].custCode; 
					custName = data.orderGroupList[i].custName; 
					custMgrName = data.orderGroupList[i].custMgrName;
					custMgrPhone = data.orderGroupList[i].custMgrPhone; 
					supplyCustCode = data.orderGroupList[i].supplyCustCode; 
					supplyCustName = data.orderGroupList[i].supplyCustName; 
					supplyCustMgrName = data.orderGroupList[i].supplyCustMgrName; 
					supplyCustMgrPhone = data.orderGroupList[i].supplyCustMgrPhone; 
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
					
					orderTypeName = data.orderGroupList[i].orderTypeName;
					regUserName = data.orderGroupList[i].regUserName;
					orderYmd = data.orderGroupList[i].orderYmd;
					
					//$("#orderGroupId").text(orderGroupId);
					//$("#orderType").text(orderType);
					$("#orderTypeName").text(orderTypeName);  
					//$("#custCode").val(custCode); 
					//$("#custName").val(custName); 
					//$("#custMgrName").val(custMgrName);
					//$("#custMgrPhone").val(custMgrPhone); 
					//$("#supplyCustCode").val(supplyCustCode); 
					//$("#supplyCustName").val(supplyCustName); 
					//$("#supplyCustMgrName").val(supplyCustMgrName); 
					//$("#supplyCustMgrPhone").val(supplyCustMgrPhone); 
					$("#carNo").text(carNo); 
					$("#vinNo").text(vinNo); 
					//$("#colorCode").val(colorCode); 
					//$("#makerCode").val(makerCode); 
					//$("#carType").val(carType);
					$("#makerName_carType").text(makerCode + ' ' + carType);  
					//$("#dcRate").val(dcRate); 
					//$("#dcDspType").val(dcDspType); 
					//$("#agencyFeeRate").val(agencyFeeRate); 
					//$("#marginRate").val(marginRate); 
					//$("#memo1").val(memo1); 
					//$("#memo2").val(memo2); 
					$("#orderYmd").text(orderYmd); 
					$("#regUserName").text(regUserName);
				}		
				findOrderGroupItem('/order/order-stock-chk-list');				
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
function findOrderGroupItem(url) {
	var list = [];
	var orderGroupId = $("#orderGroupId").val();
	
	var ordArr  = $("#ordArr").val();
	var seqArr  = $("#seqArr").val();

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"orderGroupId":orderGroupId,
			"ordArr":ordArr,
			"seqArr":seqArr			
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.orderStorageUseList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				 
				//주문접수에 넘어온 랙과 수량정보 저장
				const rackData = data.orderStorageUseList.filter((row)=>row.pcSelectRackArr!=null).reduce((a,c)=>{
					if(a[c.orderSeq] == null)
					{ 
						a[c.orderSeq] = {}
						a[c.orderSeq].pcSelectRackArr =c.pcSelectRackArr.split('^');
						a[c.orderSeq].pcSelectQtyArr = c.pcSelectQtyArr.split('^');
					}
					return a;
				},{}); 
				
				for(i=0;i<data.orderStorageUseList.length;i++){
					if(Object.keys(rackData).length==0 || rackData[data.orderStorageUseList[i].orderSeq].pcSelectRackArr.includes( data.orderStorageUseList[i].rackCode)) 
					{
						let qty ; 
						if(Object.keys(rackData).length >0) // 주문접수에서 넘어와서 랙과 수량이 선택된 경우
						{
							const index = rackData[data.orderStorageUseList[i].orderSeq].pcSelectRackArr.indexOf(data.orderStorageUseList[i].rackCode);
							qty = (rackData[data.orderStorageUseList[i].orderSeq].pcSelectQtyArr[index]);
						}
						
					 	
					    list.push({						  
							 orderNo: data.orderStorageUseList[i].orderNo 
							,orderSeq: data.orderStorageUseList[i].orderSeq 
							,itemId: data.orderStorageUseList[i].itemId 
							,itemNo: data.orderStorageUseList[i].itemNo 
							,itemName: data.orderStorageUseList[i].itemName
							,itemNameEn: data.orderStorageUseList[i].itemNameEn 
							,orderCnt: data.orderStorageUseList[i].orderCnt 
							,availableCnt: data.orderStorageUseList[i].availableCnt 
							,storageUseCnt: qty|| data.orderStorageUseList[i].availableCnt
							,storageCode: data.orderStorageUseList[i].storageCode 
							,storageName: data.orderStorageUseList[i].storageName
							,salePrice: data.orderStorageUseList[i].salePrice 
							,sumPrice: data.orderStorageUseList[i].availableCnt * data.orderStorageUseList[i].salePrice
							,memo1: data.orderStorageUseList[i].memo1 						
							,memo2: data.orderStorageUseList[i].memo2 
							
							,stockQty: data.orderStorageUseList[i].stockQty
							,ctableQty: data.orderStorageUseList[i].ctableQty
							
							,rackCode: data.orderStorageUseList[i].rackCode
							,rackName: data.orderStorageUseList[i].rackName
							,isConsignItem : (data.orderStorageUseList[i].ctableQty>0) // 창고사용요청시 회수인지 확인용으로 사용
							,consignCustName : data.orderStorageUseList[i].consignCustName
							,logisCode: data.orderStorageUseList[i].rcvLogisCode
	
							,isPcSelectRack : data.orderStorageUseList[i].isPcSelectRack  //20240701 supi 주문접수에서 랙선택한게 존재하면 y로 넘어옴 없으면 n
							
							,makerName: data.orderStorageUseList[i].makerName
							,className: data.orderStorageUseList[i].className
							,factoryNo: data.orderStorageUseList[i].factoryNo
						});
					}
				}		
				AUIGrid.setGridData("#grid_wrap", list);
				if(Object.keys(rackData).length >0) //넘어온경우 수정불가및 전체 체크박스 체크
				{
					AUIGrid.setColumnProp("#grid_wrap", 10, {
						 style:"right", editable : false
					});
					AUIGrid.setAllCheckedRows("#grid_wrap",true)
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
}
		
let dbclick = false;		
///창고사용요청전송
function storageUseReqSend(url){
 	
 	if(dbclick )return;
 	dbclick = true;
 	 	
 	var orderGroupId = $('#orderGroupId').val();
 	var storageMgr = $('#storageMgr').val();
 	var memo1 = $('#memo1').val();
 	var useDmdYmd = $('#useDmdYmd').val();
 	var moveSchYmd = $('#moveSchYmd').val();
    
	/*
	if (isEmpty(storageMgr) == true) {
		alert("창고담당을 입력하세요!");
		return;
	}
*/
 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		dbclick = false;
		return;
	}

	var rowItem;
	var ordArr = "";
	var seqArr = "";
	var scdArr = "";   // 창고코드배열 
	var cntArr
	var mm1Arr = "";
	var mm2Arr = "";
	var rackArr = "";
	let consignItemArr = "";
	let logisCodeArr = "";

	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		
		orderNo = rowItem.item.orderNo;
		orderSeq = rowItem.item.orderSeq;
		storageCode = rowItem.item.storageCode;
		storageUseCnt = rowItem.item.storageUseCnt;
		mm1 = rowItem.item.memo1;
		mm2 = rowItem.item.memo2;		
		rackCode = rowItem.item.rackCode;
		logisCode = rowItem.item.logisCode;
		
		
		if (storageUseCnt < 1) {
			alert("창고사용수량은 1개 이상이어야 합니다.");
			dbclick = false;
			return;
		}
		
		if (typeof orderNo == 'undefined' || orderNo == null) {			orderNo = "";		}
		if (typeof orderSeq == 'undefined' || orderSeq == null) {			orderSeq = "";		}
		if (typeof storageCode == 'undefined' || storageCode == null) {			storageCode = "";		}
		if (typeof storageUseCnt == 'undefined' || storageUseCnt == null) {			storageUseCnt = "";		}
		if (typeof mm1 == 'undefined' || mm1 == null) {			mm1 = "";		}
		if (typeof mm2 == 'undefined' || mm2 == null) {			mm2 = "";		}
		if (typeof rackCode == 'undefined' || rackCode == null) {			rackCode = "";		}
		if (typeof logisCode == 'undefined' || logisCode == null) {			logisCode = "";		}
		
		if (i == 0) {
			ordArr = orderNo;		
			seqArr = orderSeq;
			scdArr = storageCode;
			cntArr = storageUseCnt;
			mm1Arr = mm1;						
			mm2Arr = mm2;
			rackArr = rackCode; 
			consignItemArr = rowItem.item.isConsignItem?'1':'0';
			logisCodeArr = logisCode; 
		}else{
			ordArr = ordArr + "^" +orderNo;		
			seqArr = seqArr + "^" +orderSeq;
			scdArr = scdArr + "^" +storageCode;
			cntArr = cntArr + "^" +storageUseCnt;
			mm1Arr = mm1Arr + "^" +mm1;
			mm2Arr = mm2Arr + "^" +mm2;
			rackArr = rackArr + "^" +rackCode;
			consignItemArr += '^'+(rowItem.item.isConsignItem?'1':'0');
			logisCodeArr = logisCodeArr + "^" +logisCode;
		}

	}

	//마지막거 처리위한 용도  
	ordArr = ordArr + "^";		
	seqArr = seqArr + "^";
	scdArr = scdArr + "^";
	cntArr = cntArr + "^";
	mm1Arr = mm1Arr + "^";
	mm2Arr = mm2Arr + "^";
	rackArr = rackArr + "^";
	logisCodeArr = logisCodeArr + "^";
			
	var data = {};
    data.workingType = "ADD";
    //master
	data.orderGroupId = orderGroupId;
	data.storageMgr = storageMgr;
	data.memo1 = memo1;
	data.useDmdYmd = useDmdYmd;
	data.moveSchYmd = moveSchYmd;
	
	//sub
	data.ordArr = ordArr;    //주문번호
	data.seqArr = seqArr;    //주문순번
	data.scdArr = scdArr;    //창고코드
	data.cntArr = cntArr;  
	data.mm1Arr = mm1Arr;    //메모1코드
	data.mm2Arr = mm2Arr;    //메모2코드
    data.rackArr = rackArr;
    data.consignItemArr = consignItemArr;
    data.logisCodeArr = logisCodeArr;
    //console.log("rackArr:"+rackArr);
    //return;
    
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : "ADD",
			"orderGroupId" : orderGroupId,
			"storageMgr" : storageMgr,
			"memo1" : memo1,
			"useDmdYmd" : useDmdYmd,
			"moveSchYmd" : moveSchYmd,
						
			"ordArr" : ordArr,    //주문번호
			"seqArr" : seqArr,    //주문순번
			"scdArr" : scdArr,    //    			
			"cntArr" : cntArr,    //
			"mm1Arr" : mm1Arr,    //
			"mm2Arr" : mm2Arr,    //
			"rackArr" : rackArr    //
			,consignItemArr
			,"logisCodeArr" : logisCodeArr    // 수령물류센터
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			parent.location.reload(true);
			//location.reload(true);
			dbclick = false;
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	        dbclick = false;
	    }
	});
}  
		

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// BEGIN: 창고수량 확인 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

var columnLayoutStockChk = [ 
		 { dataField : "idx",      headerText : "idx", width : 50, editable : false, visible : false }
		,{ dataField : "orderSeq",      headerText : "주문순번", width : 50, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 140, editable : false }
		,{ dataField : "itemNo",      headerText : "품번*", width : 140, editable : false } 
		,{ dataField : "itemName", headerText : "품명", width: 120, editable : false  } 
		//,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "stockQty",     headerText : "재고수량", datype: "numeric" }
		//,{ dataField : "useCnt",     headerText : "견적적요", datype: "numeric" }
		,{ dataField : "storageCode",     headerText : "창고코드", datype: "" }
		,{ dataField : "storageName",     headerText : "창고명", datype: "" }
];
 
 	
// 정보 조회
function findStockChk(url,orderNo,orderSeq) {
    
	var dialogStockChk;
	dialogStockChk = $( "#dialog-form-stockchk" ).dialog({
	    //autoOpen: false,
	    height: 500,
	    //minWidth: 500,
	    width: "90%",
	    modal: true,
	    headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position:[400,400],
		buttons: {
			//"확인": updateGridRow			,
			"취소": function (event) {
				dialogStockChk.dialog("close");
			}
		},
	    close: function() {
	     // $( "#users tbody tr td" ).empty();	   	
	    }
	});	
	
	//alert("조건에 맞는 자료가 없습니다.");
	// 그리드 생성 후 해당 ID 보관 변수
	var myGridIDStockChk;
	// AUIGrid 그리드를 생성합니다.

	dialogStockChk.dialog("open");
				
	createGridStockChk(columnLayoutStockChk);
				
	var list = [];
	//orderNo = $("#orderNo").val();
	//$("#orderSeq").val(orderSeq);
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"orderNo":orderNo,
			"orderSeq":orderSeq
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.orderStorageUseList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.orderStorageUseList.length;i++){
				    list.push({
						 idx: data.orderStorageUseList[i].estiSeq
						,orderSeq: data.orderStorageUseList[i].orderSeq 
						,itemId: data.orderStorageUseList[i].itemId 
						,itemNo: data.orderStorageUseList[i].itemNo 
						,itemName: data.orderStorageUseList[i].itemName
						,itemNameEn: data.orderStorageUseList[i].itemNameEn 
						,stockQty : data.orderStorageUseList[i].stockQty
						,useCnt: data.orderStorageUseList[i].useCnt
						,storageCode: data.orderStorageUseList[i].storageCode
						,storageName: data.orderStorageUseList[i].storageName  
					});
					
				}		
				AUIGrid.setGridData("#grid_wrap_stockchk", list);
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


 
function createGridStockChk(columnLayoutStockChk) {
	
	var auiGridProps = {			
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			//pageRowCount: 50,
            editable : true ,
			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			//rowIdField: "idx",
			
			selectionMode : "multipleCells",
			
						// 엑스트라 체크박스 표시 설정
			showRowCheckColumn: true,
	
			// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
			enableRowCheckShiftKey: true,
	
			// 전체 체크박스 표시 설정
			showRowAllCheckBox: true,
			rowCheckToRadio : true,

	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridIDStockChk = AUIGrid.create("#grid_wrap_stockchk", columnLayoutStockChk, auiGridProps);

}

// 창고재고사용수량 적용		
function stockApply(url) {
	
	var orderNo = $("#orderNo").val();
	var orderSeq = $("#orderSeq").val();


	var checkedItems = AUIGrid.getCheckedRowItems(myGridIDStockChk);
	if (checkedItems.length <= 0) {
		alert("적용대상을 선택하세요!");
		return;
	}
	
	var rowItem;
	var qtyArr = "";  //재고수량
	var cntArr = "";  //견적적용
	var scdArr = "";  //창고코드
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		qtyArr = qtyArr + "^" +rowItem.item.stockQty;
		cntArr = cntArr + "^" +rowItem.item.useCnt;
		scdArr = scdArr + "^" +rowItem.item.storageCode;
	}
	
	var data = {};
    data.workingType = "ADD";
	data.orderNo = orderNo;
	data.orderSeq = orderSeq;
	data.qtyArr = qtyArr;
	data.cntArr = cntArr;  
	data.scdArr = scdArr;
	
 	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    data : JSON.stringify(data),
	    success: function(data) {
	        //alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			parent.jQuery.fancybox.close();
			parent.location.reload(true);
	    },
	    error:function(request, status, error){ 
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
}
	

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// END: 창고수량 확인 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////		


//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function storSelect(code,name) {
    var checkedItems = AUIGrid.getCheckedRowItems(myGridIDStockChk);
	var rowItem;
	var len = checkedItems.length;

	if (len <= 0) {
		alert("체크된 행 없음!!");
		return;
	}

	for (var i = 0; i < len; i++) {
		rowItem = checkedItems[i];
		//str += "row : " + rowItem.rowIndex + ", id :" + rowItem.item.id + ", name : " + rowItem.item.name + "\n";
		//$(obj).val(rowItem.custCode);
		//$("#"+name+"").val(rowItem.custName);
		item = {
				storageCode: rowItem.item.storageCode,
				storageName: rowItem.item.storageName,
			};
		AUIGrid.updateRow(myGridID, item, "selectedIndex");
			
		var dialogCust;
		dialogCust = $( "#dialog-form-stockchk");			
		dialogCust.dialog("close");	
	}

}
function logisCodeListFind() // 수령물류센터 코드 받아오는 통신
{
	$.ajax({
		type: "POST",
		url: "/base/logisCodeList",
		dataType: "json",
		data: {
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) { 
			const selectLogisCode = $("#selectLogisCode");
			for(let i = 0 ; i < data.logisCodeList.length ; i++)
			{
				logisCodeList.push(data.logisCodeList[i].code); // 디테일 auigrid용 리스트 배열에 추가
				selectLogisCode.append("<option value="+data.logisCodeList[i].code+">"+data.logisCodeList[i].code+"</option> "); // 일괄선택을 위한 id selectLogisCode의 셀렉트 박스의 자식에 추가
			} 
		},
		error: function(e){
			
		}
		
	})
	
}
