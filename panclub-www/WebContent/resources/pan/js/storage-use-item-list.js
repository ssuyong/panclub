
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

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
	*/
	$("#btnClose").click(function(){
		parent.location.reload(true);  //2024.01.05
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	$("#btnDel").click(function(){
		//alert("등록버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.창고사용내역을 삭제하시겠습니까?")){
			updateDataToServer("/logis/storageUseReqItemAdd", "DEL");
		}
	});
	
	$("#btnDelSub").click(function(){  //2024.01.05
		//alert("등록버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.선택한 부품을 삭제하시겠습니까?")){
			updateDataToServer("/logis/storageUseReqItemAdd", "DEL_SUB");
		}
	});
	

	//요청번호가  존재하는 경우 
	let storageUseReqNo = $("#storageUseReqNo").text();
	if (storageUseReqNo !=''){		
		findReq('/logis/storage-use-list');
	}	  
	
});
 
// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [
		 { dataField : "chkYmd",      headerText : "완료처리일", width : 100, editable : false }
		,{ dataField : "storageUseReqNo",      headerText : "요청번호", width : 100, editable : false }
		,{ dataField : "reqSeq",      headerText : "요청순번", width : 60, editable : false }
		,{ dataField : "orderNo",      headerText : "주문번호", width : 90, editable : false ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict"}
		,{ dataField : "orderSeq",      headerText : "주문순번", width : 60, editable : false ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict"}
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80, editable : false ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict"}
		,{ dataField: "makerName",        headerText: "제조사"  , width : 50,editable: false    }
		,{ dataField : "itemNo",      headerText : "품번", width : 100, editable : false ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict"} 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", headerText : "품명", width: 120, editable : false, style : "left" ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict"  } 
		//,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "orderCnt",      headerText : "주문수량", width : 60, editable : false  ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict" }
		,{ dataField : "storageUseCnt",     headerText : "창고사용수량", width : 80 , editable : false}
		,{ dataField : "storageCode",      headerText : "창고코드", width : 60, editable : false }
		,{ dataField : "storageName",      headerText : "창고명", width : 100, editable : false, style : "left" }
		//,{ dataField : "unitPrice",     headerText : "주문단가", editable : false }
		//,{ dataField : "sumPrice",     headerText : "합계", editable : false }
		,{ dataField : "memo1",     headerText : "비고1", editable : false, style : "left" }
		,{ dataField : "memo2",     headerText : "비고2" , editable : false, style : "left" }
	];
	
	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		enableCellMerge: true,
		selectionMode: "singleRow",
		editable : false,			
		// 상태 칼럼 사용
		//showStateColumn : true,
		//rowIdField: "idx",
		rowCheckToRadio: true,
		showRowCheckColumn: false,

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		//enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		//showRowAllCheckBox: true,
		
		//footer 노출
		showFooter: true,
		showAutoNoDataMessage : false, 


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


// 데이터 서버로 보내기. 삭제시(전체삭제,선택취소)
function updateDataToServer( url, workingType ) {
	
	var storageUseReqNo = $("#storageUseReqNo").text();  

	var data = {};
	let reqSeq = "";
	
	//부품단위 삭제 가능. 2024.01.05
	if (workingType == 'DEL_SUB') {
		var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
		if (checkedItems.length <= 0) {
			alert("품목을 선택하세요!");
			return;
		}
		
		for (var i = 0, len = checkedItems.length; i < len; i++) {
			rowItem = checkedItems[i];
			reqSeq = rowItem.item.reqSeq;
		}
		
		workingType = "DEL";
	}		
	//data.workingType = workingType;
    //data.storageUseReqNo = storageUseReqNo;
    if(dblRegClkChk()) return;  //Reg Double click Check 2024.01.05.
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : {
			"workingType" : workingType,		
			"storageUseReqNo" : storageUseReqNo,	
			"reqSeq" : reqSeq		
		},
	    success: function(data) {
	        //alert("성공:"+data.success);
	     
	        alert(data.result_code+":"+data.result_msg);
	        //$.fancybox(data);
	        //parent.jQuery.fancybox.close();
	        location.reload(true);
	        if (reqSeq == '') {  //2024.01.05 부분삭제가 아닌 전체삭제인 경우 부모창 새로고침
    			parent.location.reload(true);
    		}				        
	    
	    },
	    error:function(request, status, error){
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
};
	

// 마스터 조회
function findReq(url) {
	var storageUseReqNo = $("#storageUseReqNo").text();
    var list = []; //2024.01.05
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":"LIST",
			"storageUseReqNo":storageUseReqNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){ 
			if (data.reqList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				
				for(i=0;i<data.reqList.length;i++){
					if (i==0) {  
						storageUseReqNo = data.reqList[i].storageUseReqNo;
						storageMgr = data.reqList[i].storageMgr;
					    memo1 = data.reqList[i].memo1; 
						useDmdYmd = data.reqList[i].useDmdYmd; 
						moveSchYmd = data.reqList[i].moveSchYmd; 
						orderGroupId = data.reqList[i].orderGroupId;
	
						orderTypeName = data.reqList[i].orderTypeName;
						regUserName = data.reqList[i].regUserName;
						orderYmd = data.reqList[i].orderYmd;
						carNo = data.reqList[i].carNo; 
						vinNo = data.reqList[i].vinNo; 
						makerCode = data.reqList[i].makerCode; 
						carType = data.reqList[i].carType; 
											
						$("#storageUseReqNo").text(storageUseReqNo);
						$("#storageMgr").val(storageMgr); 
						$("#memo1").val(memo1); 
						$("#useDmdYmd").val(useDmdYmd); 
						$("#moveSchYmd").val(moveSchYmd);
						$("#orderGroupId").val(orderGroupId); 
						
						$("#orderTypeName").text(orderTypeName);  
						$("#carNo").text(carNo); 
						$("#vinNo").text(vinNo); 
						$("#makerName_carType").text(makerCode + ' ' + carType);  
						$("#orderYmd").text(orderYmd); 
						$("#regUserName").text(regUserName);
					}
					//2024.01.05
					list.push({						  
						 storageUseReqNo: data.reqList[i].storageUseReqNo
						,reqSeq: data.reqList[i].reqSeq  
						,orderNo: data.reqList[i].orderNo  
						,orderSeq: data.reqList[i].orderSeq 
						,itemId: data.reqList[i].itemId 
						,itemNo: data.reqList[i].itemNo 
						,itemName: data.reqList[i].itemName
						,itemNameEn: data.reqList[i].itemNameEn 
						,orderCnt: data.reqList[i].orderCnt 
						,storageUseCnt: data.reqList[i].useCnt
						,storageCode: data.reqList[i].storageCode 
						,storageName: data.reqList[i].storageName
						,salePrice: data.reqList[i].salePrice 
						,sumPrice: data.reqList[i].useCnt * data.reqList[i].salePrice
						,memo1: data.reqList[i].memo1 						
						,memo2: data.reqList[i].memo2 						
						,chkYmd: data.reqList[i].chkYmd  
						
						,className: data.reqList[i].className  
						,makerName: data.reqList[i].makerName  
						,factoryNo: data.reqList[i].factoryNo  
					});
					
				}		
				AUIGrid.setGridData("#grid_wrap", list);
				//findReqItem('/logis/storage-use-req-item-list');				
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
function findReqItem(url) {
	var list = [];
	var storageUseReqNo = $("#storageUseReqNo").text();
	
	//var ordArr  = $("#ordArr").val();
	//var seqArr  = $("#seqArr").val();
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"storageUseReqNo":storageUseReqNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.reqItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.reqItemList.length;i++){
				    list.push({						  
						 storageUseReqNo: data.reqItemList[i].storageUseReqNo
						,reqSeq: data.reqItemList[i].reqSeq  
						,orderNo: data.reqItemList[i].orderNo  
						,orderSeq: data.reqItemList[i].orderSeq 
						,itemId: data.reqItemList[i].itemId 
						,itemNo: data.reqItemList[i].itemNo 
						,itemName: data.reqItemList[i].itemName
						,itemNameEn: data.reqItemList[i].itemNameEn 
						,orderCnt: data.reqItemList[i].orderCnt 
						,storageUseCnt: data.reqItemList[i].useCnt
						,storageCode: data.reqItemList[i].storageCode 
						,storageName: data.reqItemList[i].storageName
						,salePrice: data.reqItemList[i].salePrice 
						,sumPrice: data.reqItemList[i].useCnt * data.reqItemList[i].salePrice
						,memo1: data.reqItemList[i].memo1 						
						,memo2: data.reqItemList[i].memo2 
						
						,chkYmd: data.reqItemList[i].chkYmd  
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
		
		
///창고사용요청전송
function storageUseReqSend(url){
 
 	var orderGroupId = $('#orderGroupId').val();
 	var storageMgr = $('#storageMgr').val();
 	var memo1 = $('#memo1').val();
 	var useDmdYmd = $('#useDmdYmd').val();
 	var moveSchYmd = $('#moveSchYmd').val();

 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var ordArr = "";
	var seqArr = "";
	var scdArr = "";   // 창고코드배열 
	var cntArr
	var mm1Arr = "";
	var mm2Arr = "";
	
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		
		orderNo = rowItem.item.orderNo;
		orderSeq = rowItem.item.orderSeq;
		storageCode = rowItem.item.storageCode;
		storageUseCnt = rowItem.item.storageUseCnt;
		memo1 = rowItem.item.memo1;
		memo2 = rowItem.item.memo2;		
		
		if (typeof orderNo == 'undefined' || orderNo == null) {			orderNo = "";		}
		if (typeof orderSeq == 'undefined' || orderSeq == null) {			orderSeq = "";		}
		if (typeof storageCode == 'undefined' || storageCode == null) {			storageCode = "";		}
		if (typeof storageUseCnt == 'undefined' || storageUseCnt == null) {			storageUseCnt = "";		}
		if (typeof memo1 == 'undefined' || memo1 == null) {			memo1 = "";		}
		if (typeof memo2 == 'undefined' || memo2 == null) {			memo2 = "";		}
		
		if (i == 0) {
			ordArr = orderNo;		
			seqArr = orderSeq;
			scdArr = storageCode;
			cntArr = storageUseCnt;
			mm1Arr = memo1;						
			mm2Arr = memo2;
		}else{
			ordArr = ordArr + "^" +orderNo;		
			seqArr = seqArr + "^" +orderSeq;
			scdArr = scdArr + "^" +storageCode;
			cntArr = cntArr + "^" +storageUseCnt;
			mm1Arr = mm1Arr + "^" +memo1;
			mm2Arr = mm2Arr + "^" +memo2;
		}

	}

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
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			parent.location.reload(true);
			//location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}  
		
// 창고사용 확인
function reqChk(url) {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	var rowItem;
	var reqArr = "";
	var rseArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		reqArr = reqArr + "^" +rowItem.item.storageUseReqNo;
		rseArr = rseArr + "^" +rowItem.item.reqSeq;
	}
	
	var data = {};
    data.workingType = "CHK";
	
	//sub
	data.reqArr = reqArr;   //요천번호 
	data.rseArr = rseArr;    //요청순번
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : "CHK",
			"reqArr" : reqArr,   //요천번호 
			"rseArr" : rseArr,    //요청순번
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
}
