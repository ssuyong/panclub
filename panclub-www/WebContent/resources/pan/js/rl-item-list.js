
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
const setTimeoutDelay = 250; // 입고, 원가 확인 및 취소 딜레이 (밀리세컨드)
/*
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
*/    

var datepicker1 = new tui.DatePicker('#wrapper1', {
	language: 'ko',
	date: new Date(),
	input: {
		element: '#popCnRlYmd',
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
	
	// 윈도우 리사이징 이벤트
	window.onresize = function () {

		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
		if (typeof myGridID !== "undefined") {
			AUIGrid.resize(myGridID);
		}
	};
		 
	 var pageMoveYN = $("#pageMoveYN").val();
	 
	 function disableButtons() {
        $("#btnReg").prop("disabled", true);
        $("#btnDel").prop("disabled", true);
        $("#btnDateChange").prop("disabled", true);
    }
	 if (pageMoveYN == "Y") {
        disableButtons();
    }
	  	 
	$("#btnReg").click(function(){
		//alert("등록버튼");
		updateDataToServer("/logis/rlAdd", "UPT");
	});
	$("#btnClose").click(function(){
		
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	$("#btnDel").click(function(){
		//alert("등록버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.출고를 삭제하시겠습니까?")){
			updateDataToServer("/logis/rlAdd", "DEL");
		}
	});
	$("#btnDateChange").click(function(){
		openDialog();
	});


	//출고번호가  존재하는 경우 
	let rlNo = $("#rlNo").text();
	if (rlNo !=''){		
		
		
		findReq('/logis/rl-list');
		
		if($("#orderTypeName").text() ==='대행'){
			$("#supplyInfo-title").css("display","block");
			$("#supplyInfo-input").css("display","block");			
		}
	}	  
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [
		{ dataField: "idx", headerText: "idx", width: 100, editable: false, visible: false }		 
		,{ dataField : "rlNo",      headerText : "출고번호", width : 100, editable : false }
		,{ dataField : "rlSeq",      headerText : "출고순번", width : 60, editable : false }
		,{ dataField : "claimType",      headerText : "청구구분", width : 60, editable : false }
	 
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80, editable : false }
		,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false  }
		,{ dataField : "itemNo",      headerText : "품번*", width : 140, editable : false} 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", headerText : "품명" , style:"left", width: 200, editable : false  } 
		,{ dataField : "itemNameEn", headerText : "영문품명" , style:"left", width: 140, editable : false  }
		,{ dataField : "rlCnt",     headerText : "출고수량" , style:"right" ,width : 70 ,editable : false  }
		,{ dataField : "rlUnitPrice",     headerText : "판매단가" , width : 90, dataType: "numeric",formatString: "#,##0"  , style:"right", editable : false }
		,{ dataField : "rlSumPrice",     headerText : "공급가액" , width : 90, dataType: "numeric",formatString: "#,##0"  , style:"right", editable : false }
		,{ dataField : "memo1",     headerText : "비고1" , editable : false}
		,{ dataField : "orderGroupId",      headerText : "주문관리ID", width : 100, editable : false,
			styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }
		,{ dataField : "reqRegUserId",     headerText : "요청자", width : 80, editable : false }
		,{ dataField : "rlRegUserId",     headerText : "처리자" , width : 80, editable : false}
	];
	
	var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "rlCnt",		positionField: "rlCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "rlUnitPrice",		positionField: "rlUnitPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "rlSumPrice",		positionField: "rlSumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
	
		];
	
	// 그리드 속성 설정
	var gridPros = {
		selectionMode : "multipleCells",
		// singleRow 선택모드
		//selectionMode: "multiRow",
		editable : true,			
		// 상태 칼럼 사용
		showStateColumn: true,
		rowIdField: "idx",
		showRowCheckColumn: false,

		// 셀 선택모드 (기본값: singleCell)
		
		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,

		//footer 노출
		showFooter: true,
		showAutoNoDataMessage : false, 
		
		// 셀 선택모드 (기본값: singleCell)
		//selectionMode: "multipleCells",

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
	
	AUIGrid.setFooter(myGridID, footerLayout);	
	/*
	AUIGrid.bind(myGridID, "rowAllChkClick", function (event) {
		if (event.checked) {
			// name 의 값들 얻기
			var uniqueValues = AUIGrid.getColumnDistinctValues(event.pid, "rlNo");
			// Anna 제거하기
			uniqueValues.splice(!uniqueValues.indexOf(""), 1);
			AUIGrid.setCheckedRowsByValue(event.pid, "rlNo", uniqueValues);
		} else {
			AUIGrid.setCheckedRowsByValue(event.pid, "rlNo", []);
		}
	});
	*/

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
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {

		var orderGroupId = event.item.orderGroupId;
		if (event.dataField == 'orderGroupId') {
			//window.location.href = '/order/cl-req-item-list?clGroupId=' + clGroupId;
			var orderGroupId = event.item.orderGroupId;
			var url = '/order/order-group-item-list?orderGroupId=' + orderGroupId
			var newWindow = window.open(url, '_blank');
			 newWindow.focus();
		}		
				
	});		
};

function auiCellEditingHandler(event) {
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		
	} else if (event.type == "cellEditCancel") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	}
};	
	

		
// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;



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





// 마스터 조회
function findReq(url) {
	var rlNo = $("#rlNo").text();
	let gvComCode = $("#gvComCode").val();
	if(gvComCode=='null'){gvComCode = ''}
	let workingType = 'LIST';
	if(gvComCode !=''){
		workingType = 'LIST-ALL';
	}
	//console.log("workingType : " + workingType)
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":workingType,
			"rlNo":rlNo,
			"gvComCode":gvComCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.rlList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
			}else{
				for(i=0;i<data.rlList.length;i++){
					rlNo = data.rlList[i].rlNo;
					custCode = data.rlList[i].custCode;
				    custName = data.rlList[i].custName; 
				    custMgrName = data.rlList[i].custMgrName; 
				    custMgrPhone = data.rlList[i].custMgrPhone; 
					orderGroupId = data.rlList[i].orderGroupId; 
					orderTypeName = data.rlList[i].orderTypeName; 
					rlYmd = data.rlList[i].rlYmd; 
					carNo = data.rlList[i].carNo; 
					vinNo = data.rlList[i].vinNo; 
					makerCode = data.rlList[i].makerCode; 
					carType = data.rlList[i].carType; 
					rlMgr = data.rlList[i].rlMgr; 
					rlWay = data.rlList[i].rlWay; 
					memo1 = data.rlList[i].memo1; 
					realRlYmd = data.rlList[i].regYmd; 
					deliveryFee = data.rlList[i].deliveryFee.toLocaleString(); 
					deliveryYN = data.rlList[i].deliveryYN; 

					supplyCustCode = data.rlList[i].supplyCustCode; 
					supplyCustName = data.rlList[i].supplyCustName; 
					supplyMgrName = data.rlList[i].supplyMgrName; 
					supplyMgrPhone = data.rlList[i].supplyMgrPhone; 
					
					if(deliveryYN== "Y"){
						 $('#deliveryYN').prop('checked', true);
						$('#deliveryFee').css('display', 'block');
					}else{
						 $('#deliveryYN').prop('checked', false);
					}
					
					$("#rlNo").text(rlNo);
					$("#custCode").val(custCode); 
					$("#custName").val(custName); 
					$("#custMgrName").val(custMgrName); 
					$("#custMgrPhone").val(custMgrPhone); 
					$("#orderGroupIdDsp").text(orderGroupId);
					$("#orderTypeName").text(orderTypeName);
					$("#rlYmd").text(rlYmd);
					$("#carNo").text(carNo);
					$("#vinNo").text(vinNo);
					$("#makerName_carType").text(makerCode + ' ' + carType); 
					$("#rlMgr").val(rlMgr);
					$("#rlWay").val(rlWay);
					$("#memo1").val(memo1);
					$("#realRlYmd").text(realRlYmd);
					$("#deliveryFee").val(deliveryFee);

					$("#supplyCustCode").val(supplyCustCode);
					$("#supplyCustName").val(supplyCustName);
					$("#supplyMgrName").val(supplyMgrName);
					$("#supplyMgrPhone").val(supplyMgrPhone);
				}		
				findRegItem('/logis/rl-item-list');				
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

//요청 품목 조회
function findRegItem(url) {
	
	var list = [];
	var rlNo = $("#rlNo").text();

	var workingType = "LIST";
	//var ordArr  = $("#ordArr").val();
	//var seqArr  = $("#seqArr").val();
	let gvComCode = $("#gvComCode").val();
	if(gvComCode=='null'){gvComCode = ''}
 

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType": workingType,
			"rlNo":rlNo,
			"gvComCode":gvComCode
			
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
		 
			
			if (data.rlItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.rlItemList.length;i++){
				    list.push({
						idx: i						  
						 ,rlNo: data.rlItemList[i].rlNo
						,rlSeq: data.rlItemList[i].rlSeq 
						,claimType: data.rlItemList[i].claimType 
						,makerCode: data.rlItemList[i].makerCode 
						,itemId: data.rlItemList[i].itemId 
						,itemNo: data.rlItemList[i].itemNo 
						,itemName: data.rlItemList[i].itemName
						,itemNameEn: data.rlItemList[i].itemNameEn 
						,rlCnt: data.rlItemList[i].cnt
						,rlUnitPrice: data.rlItemList[i].rlUnitPrice 
						,rlSumPrice: data.rlItemList[i].rlSumPrice
						,memo1: data.rlItemList[i].memo1 
						,orderGroupId: data.rlItemList[i].orderGroupId 
						,reqRegUserId: data.rlItemList[i].reqRegUserId 
						,rlRegUserId: data.rlItemList[i].regUserId
						
						,className: data.rlItemList[i].className
						,makerName: data.rlItemList[i].makerName
						,factoryNo: data.rlItemList[i].factoryNo
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
/*
function updateDataToServer( url, workingType ) {
		
	var rlMgr = $("#rlMgr").val();  
    var rlWay = $("#rlWay").val(); 
    var rlNo = $("#rlNo").text(); 
    
	var data = {};
	
	data.workingType = workingType;
    data.rlMgr = rlMgr;
	data.rlWay = rlWay;  

	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : {
			"workingType" : workingType,		
			"rlMgr" : rlMgr,		
			"rlWay" : rlWay,		
			"rlNo" : rlNo		
		},
	    success: function(data) {
	        //alert("성공:"+data.success);
	     
	        alert(data.result_code+":"+data.result_msg);
	        parent.jQuery.fancybox.close();
			parent.location.reload(true);
			location.reload(true);
	        
	    
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};
*/

function updateDataToServer( url, workingType ) {
	
	$("#btnDel").toggle('disabled');	
	var rlMgr = $("#rlMgr").val();  
    var rlWay = $("#rlWay").val(); 
    var rlNo = $("#rlNo").text(); 
    var rowItem;
	var seqArr = "";
	
	var deliveryFee =0; // 20240112 yoonsang int라 데이터가안넘어가던거 수정
	
	var deliveryYN =  "N";
  	 if ($('input:checkbox[name=deliveryYN]').is(':checked') == true){	 
			deliveryYN = "Y";		
			deliveryFee = cf_getNumberOnly($("#deliveryFee").val()); //배송비
		}	//배송비 적용여부
  	 
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
/*	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}*/
	
	let gvComCode = $("#gvComCode").val();
	if(gvComCode=='null'){gvComCode = ''}
	
if (checkedItems.length > 0){
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		rlSeq = rowItem.item.rlSeq;
		
		if (typeof rlSeq == 'undefined' || rlSeq == null) {			rlSeq = "";		}

		
		if (i == 0) {
			seqArr = rlSeq;
		}else{
			seqArr = seqArr + "^" +rlSeq;
		}

	}
}	
 	
 	
 	
	//console.log("deliveryFee"+deliveryFee);
	//return;
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : {
			"workingType" : workingType,		
			"rlMgr" : rlMgr,		
			"rlWay" : rlWay,		
			"rlNo" : rlNo,		
			"rlSeqArr" : seqArr,
			"deliveryFee": deliveryFee,
			"deliveryYN":deliveryYN,		
			"gvComCode":gvComCode		
		},
	    success: function(data) {
			if(url == "/logis/rlAdd" && workingType == "DEL")
 			{
				 
				const delItemInfo =  seqArr.split("^").map(row=>{
												return { "workingType" : workingType,	
														rlNo : data.rlno , 
														rlSeqArr : row ,	
														"rlMgr" : rlMgr,		
														"rlWay" : rlWay,		
														"rlNo" : rlNo,		 
														"deliveryFee": deliveryFee,
														"deliveryYN":deliveryYN,		
														"gvComCode":gvComCode	}
									})
				//console.log(delItemInfo); 
				parent.ProgressManager.open(delItemInfo.length)
				rlProcItemDel(delItemInfo , 0)
				return;
			}
	    	setStopSpinner();
	        alert(data.result_code+":"+data.result_msg);
	        parent.jQuery.fancybox.close();
			parent.location.reload(true);
			location.reload(true);
	        
	    
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};

//디테일 처리
function rlProcItemDel(itemInfo , index, err = [])
{
	const data = itemInfo[index];
	$.ajax({
	    url : '/logis/rlItemAdd',
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data  ,
	    success: function(result) {
			parent.ProgressManager.next();
			const nextIndex = index+1;
			if(result.result_code == 'Err') err.push(result)
			
			if(itemInfo.length > nextIndex)
			{
				setTimeout(()=>{
					rlProcItemDel(itemInfo,nextIndex);
				} , setTimeoutDelay);
			}
			else
			{
				let msg = '처리완료';
				if(err.length >0)
				{
					msg = err.reduce((a,c)=>{
				            a+=c.result_msg+'\n'
				            return a
				    } ,'')
				}
				parent.ProgressManager.end(msg , 
					()=>{
					setStopSpinner(); 
			        parent.jQuery.fancybox.close();
					parent.location.reload(true);
					location.reload(true);
				});
			}
	    },
	    error:function(request, status, error){ 
	    }
	});
}	
		
//인쇄

//엑셀업로드 버튼 클릭 
function print() {
	
	var dialogPrint;
	dialogPrint = $( "#dialogPrint-form" ).dialog({
	    autoOpen: false,
	    height: 350,
	    //minWidth: 500,
	    width: "40%",
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
		
	
	//인쇄버튼 클릭 
//href="order/esti-up-print"
$("#print").click(function() {
	var rlNo = $("#rlNo").text();
	var printDcYN = "";
	 
	//2024.11.04
	let chnLogCust = $("#chnLogCust").val();
	//console.log("chnLogCust1:"+chnLogCust);
	if (chnLogCust ===`undefined` || chnLogCust ===undefined ) {
		chnLogCust = "";
	} 
	console.log("chnLogCust:"+chnLogCust);
	if (chnLogCust != ``) {
		if (!confirm('인쇄 시에만 청구업체정보가 변경됩니다. 변경하시겠습니까?')) {
			return;
		}
	}
		/*
	var isPrintDcYN = $('input:checkbox[name=printDcYN]').is(':checked');		
	 if(isPrintDcYN == true){
		printDcYN = 'Y';
	}else{
		printDcYN = 'N';
	} */
	
	var printMemoYN = "";	
	var isPrintMemoYN = $('input:checkbox[name=printMemoYN]').is(':checked');
		
    if(isPrintMemoYN == true){
		printMemoYN = 'Y';
	}else{
		printMemoYN = 'N';
	}
	//인쇄시 품번에 따라 정렬 체크박스에 대한 코드
	var itemNoOderBy = '';
	if($('input:checkbox[name=itemNoOderByAscYN]').is(':checked'))
	{
		 itemNoOderBy = "ASC";
	}
	
	var deliveryYN =  "N";
  	 if ($('input:checkbox[name=deliveryYN]').is(':checked') == true){	 deliveryYN = "Y";		}	//배송비 적용여부 	 
	var printDcYN = $('input[name="printDcYN"]:checked').val();
	
	let gvComCode = $("#gvComCode").val();
	if(gvComCode=='null'){gvComCode = ''}
		window.open("/logis/rl-item-list-print?rlNo=" + rlNo+"&printDcYN=" + printDcYN+"&printMemoYN=" + printMemoYN+"&deliveryYN=" + deliveryYN +"&itemNoOderBy="+itemNoOderBy+"&gvComCode=" + gvComCode + "&chnLogCust=" + chnLogCust, "_blank");
});


//이미지 다운로드 버튼 클릭
$("#btnDownload").click(function() {
    var rlNo = $("#rlNo").text(); 
    var imgYN = "Y";
    var printDcYN = "";
	/*
	var isPrintDcYN = $('input:checkbox[name=printDcYN]').is(':checked');		
	 if(isPrintDcYN == true){
		printDcYN = 'Y';
	}else{
		printDcYN = 'N';
	}*/
	var printMemoYN = "";
	
	var isPrintMemoYN = $('input:checkbox[name=printMemoYN]').is(':checked');
	
    if(isPrintMemoYN == true){
		printMemoYN = 'Y';
	}else{
		printMemoYN = 'N';
	}
 var printDcYN = $('input[name="printDcYN"]:checked').val();
 let gvComCode = $("#gvComCode").val();
	if(gvComCode=='null'){gvComCode = ''}
    window.open("/logis/rl-item-list-print?rlNo=" + rlNo + "&imgYN=" + imgYN+"&printDcYN=" + printDcYN+"&printMemoYN=" + printMemoYN+"&gvComCode=" + gvComCode, "_blank");
});
	//window.location.href = "/order/esti-up-print?estiNo="+ $("#estiNo").val();

// 출고일 변경 팝업 0726 bk
function openDialog(){	

	var rlNo = $("#rlNo").text(); 
	var rlYmd = $("#rlYmd").text(); 
	//console.log("hi");
	$("#popCustName").val(custName);
	$("#popCustCode").val(custCode);
	$("#popRlNo").val(rlNo);
	$("#popCnRlYmd").val(rlYmd);
	var dialogChangeDate;
	dialogChangeDate = $("#dialogChangeDate").dialog({
		//autoOpen: false,
		height: 500,
		//minWidth: 500,
		width: 400,
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position: [400, 400],
		buttons: {
			"확인": changeRlYmd,
			"취소": function(event) {
				dialogChangeDate.dialog("close");
			}
		},
		close: function() {
		}
	});
		
}

function changeRlYmd(){
	var rlNo = $("#popRlNo").val();
	var rlYmd = $("#popCnRlYmd").val();
	var workingType = "CHANGE"
	
	let gvComCode = $("#gvComCode").val();
	if(gvComCode=='null'){gvComCode = ''}
	//console.log("gvComCode :" + gvComCode)
		
	var data = {};
	
    data.rlNo = rlNo;
	data.rlYmd = rlYmd;
	data.workingType = workingType;
	data.gvComCode = gvComCode;
	
	$.ajax({
	    url : "/logis/changeRlYmd",
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : data,
	    
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			parent.jQuery.fancybox.close();
			parent.location.reload(true);
			location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}

//2023.09.19 bk 
function delivery_chk(){
	if ($('input:checkbox[name=deliveryYN]').is(':checked') == true){
		$("#deliveryFee").css("display", "block");
	}else{
		$("#deliveryFee").css("display", "none");
		$("#deliveryFee").val("");
	}
}

	$("#deliveryFee").bind('keyup keydown', function() {
		inputNumberFormat(this);
	});
	
	function inputNumberFormat(obj) {
	obj.value = comma(obj.value);
}


function inputNumberFormat(obj) {
	obj.value = comma(uncomma(obj.value));
}
//콤마찍기
function comma(str) {
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//콤마풀기
function uncomma(str) {
	str = String(str);
	return str.replace(/[^\d]+/g, '');
}

function cf_getNumberOnly(str) {
	var len = str.length;
	var sReturn = "";

	for (var i = 0; i < len; i++) {
		if ((str.charAt(i) >= "0") && (str.charAt(i) <= "9")) {
			sReturn += str.charAt(i);
		}
	}
	return sReturn;
}