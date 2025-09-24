
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
		 
	$("#btnReg").click(function(){
		//alert("등록버튼");
		//updateDataToServer("/order/estiAdd", "ADD");
		updateDataToServer_memo('/order/storageUseReqAdd');
	});
	$("#btnClose").click(function(){
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	/*
	$("#btnDel").click(function(){
		//alert("등록버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.견적을 삭제하시겠습니까?")){
			updateDataToServer("/order/estiAdd", "DEL");
		}
	});
	*/

	//요청번호가  존재하는 경우 
	let storageUseReqNo = $("#storageUseReqNo").text();
	if (storageUseReqNo !=''){	
		
		findReq('/logis/storage-use-req-list');
	}	  
	$("#barcodeLabelPrint").click(()=>{ //인쇄버튼 이벤트
		barcodePrintItem();
	});
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "chkYmd",      headerText : "완료처리일", width : 100, editable : false }
		,{ dataField : "storageUseReqNo",      headerText : "요청번호", width : 100, editable : false }
		,{ dataField : "reqSeq",      headerText : "요청순번", width : 60, editable : false }
		,{ dataField : "orderNo",      headerText : "주문번호", width : 90, editable : false  ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict" }
		,{ dataField : "orderSeq",      headerText : "주문순번", width : 60, editable : false  ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict" }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80, editable : false ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict"  }
		,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false  }
		,{ dataField : "itemNo",      headerText : "품번", width : 100, editable : false ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict" } 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", headerText : "품명", width: 120, editable : false, style : "left"   ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict"  } 
		//,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "orderCnt",      headerText : "주문수량", width : 60, editable : false   ,cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict"  }
		,{ dataField : "storageUseCnt",     headerText : "창고사용수량", width : 80 , editable : false}
		,{ dataField : "barcodeScanQty",     headerText : "바코드스캔수량", width : 100 , editable : false}
		,{ dataField : "storageCode",      headerText : "창고코드", width : 60, editable : false }
		,{ dataField : "storageName",      headerText : "창고명", width : 100, editable : false, style : "left" }
		,{ dataField : "rackCode",      headerText : "랙코드", width : 60, editable : false }
		,{ dataField : "rackName",      headerText : "랙명", width : 100, editable : false, style : "left" }
		//,{ dataField : "unitPrice",     headerText : "주문단가", editable : false }
		//,{ dataField : "sumPrice",     headerText : "합계", editable : false }
		
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
		,{ dataField : "ctReqNo",     headerText : "회수요청번호",  width : 120 ,editable : false  }
		,{ dataField : "ctReqSeq",     headerText : "회수요청순번",  width : 100 ,editable : false  }
		,{ dataField : "ctProcStep",     headerText : "회수요청상태", width : 100 , editable : false  }
		,{ dataField : "pcReqNo",     headerText : "주문요청번호", width : 100 , editable : false  }
		,{ dataField : "pcReqSeq",     headerText : "주문요청순번", width : 100 , editable : false  }
		,{ dataField : "memo1",     headerText : "비고1", editable : false, style : "left" }
		,{ dataField : "memo2",     headerText : "비고2" , editable : false, style : "left" }
	];
	
	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		enableCellMerge: true,
		selectionMode: "multiRow",
		editable : true,			
		// 상태 칼럼 사용
		//showStateColumn : true,
		//rowIdField: "idx",
	
		showRowCheckColumn: true, //체크박스 표시 설정
//    	independentAllCheckBox: true,    // 전체 선택 체크박스가 독립적인 역할을 할지 여부
		
		// 엑스트라 체크박스 표시 설정
		//showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
		//footer 노출
		showFooter: true,

		selectionMode: "multipleCells",
		showAutoNoDataMessage : false, 

		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
//		rowCheckableFunction: function (rowIndex, isChecked, item) {
//			if (item.chkYmd != "") { // 
//				return false;
//			}
//			return true;
//		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
//		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
//			if (item.chkYmd != "") { // 
//				return false; // false 반환하면 disabled 처리됨
//			}
//			return true;
//		}	
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
	
	// 전체 체크박스 클릭 이벤트 바인딩 : 주문번호 있는 경우 제외 전체체크 시 제외되게
//	AUIGrid.bind(myGridID, "rowAllChkClick", function (event) {
//		if (event.checked) {
//			// name 의 값들 얻기
//			//var uniqueValues = AUIGrid.getColumnDistinctValues(event.pid, "chkYmd");
//			// Anna 제거하기
//			//uniqueValues.splice(!uniqueValues.indexOf(""), 2);
//			let uniqueValues = [''];
//			AUIGrid.setCheckedRowsByValue(event.pid, "chkYmd", uniqueValues);
//		} else {
//			AUIGrid.setCheckedRowsByValue(event.pid, "chkYmd", []);
//		}
//	});
	
};

function auiCellEditingHandler(event) {
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 종료(cellEditEnd) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
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


/*
// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {
	
	var estiNo = $("#estiNo").val();  
    var estiType = $(':radio[name="estiType"]:checked').val();
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
    var dcDspType =  $(':radio[name="dcDspType"]:checked').val();
    var agencyFeeRate = $("#agencyFeeRate").val(); 
    var marginRate = $("#marginRate").val(); 
    var memo1 = $("#memo1").val(); 
    var memo2 = $("#memo2").val(); 
   
    //필수값 체크
    if (custCode == '') {	alert("판매거래처코드는 필수 입력해야 합니다.");		  $("#custCode").focus();		return;	}

	// AUIGrid 에서 추가, 삭제, 수정된 행들 얻기
	// 추가된 행 아이템들(배열)
  	var addList = AUIGrid.getAddedRowItems(myGridID);                   
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowColumnItems(myGridID); 
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);    
    
	var isValid1 = AUIGrid.validateGridData(myGridID, ["itemNo", "salePrice", "cnt"], "품번, 수량, 견적단가 필드는 반드시 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["itemNo", "cnt", "salePrice"], "품번, 수량, 견적단가 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
		
	if (isValid1 == false || isValidChanged1 == false) {
		return;
	}
	
	var data = {};
	
	if(addList.length > 0) data.estiItemAdd = addList;
	else data.estiItemAdd = [];
	
	if(updateList.length > 0) data.estiItemUpdate = updateList;
	else data.estiItemUpdate = [];
	
	if(removeList.length > 0) data.estiItemRemove = removeList;
	else data.estiItemRemove = [];

    data.workingType = workingType;
	data.estiNo = estiNo;  
    data.estiType = estiType; 
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
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
	        //alert("성공:"+data.success);
	        alert(data.result_code+":"+data.result_msg);
	        //location.reload();
	        
	        //post형식으로 페이지 데이터 조회
			let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'estiNo');
		    obj.setAttribute('value', data.estiNo);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/esti-up');
		    document.body.appendChild(f);
		    f.submit();
		
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};
*/

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
					custName = data.reqList[i].custName; 
 					
					$("#storageUseReqNo").text(storageUseReqNo);
					$("#storageMgr").val(storageMgr); 
					$("#memo1").val(memo1); 
					$("#useDmdYmd").val(useDmdYmd); 
					$("#moveSchYmd").val(moveSchYmd);
					$("#orderGroupId").text(orderGroupId); 
					
					$("#orderTypeName").text(orderTypeName);  
					$("#carNo").text(carNo); 
					$("#vinNo").text(vinNo); 
					$("#makerName_carType").text(makerCode + ' ' + carType);  
					$("#orderYmd").text(orderYmd); 
					$("#regUserName").text(regUserName);
					$("#custName").text(custName);
					
				}		
				findReqItem('/logis/storage-use-req-item-list');				
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
						//,itemNameEn: data.reqItemList[i].itemNameEn 
						,orderCnt: data.reqItemList[i].orderCnt 
						,storageUseCnt: data.reqItemList[i].useCnt
						,storageCode: data.reqItemList[i].storageCode 
						,storageName: data.reqItemList[i].storageName
						,salePrice: data.reqItemList[i].salePrice 
						,sumPrice: data.reqItemList[i].useCnt * data.reqItemList[i].salePrice
						,memo1: data.reqItemList[i].memo1 						
						,memo2: data.reqItemList[i].memo2
						,chkYmd: data.reqItemList[i].chkYmd  
						,rackCode: data.reqItemList[i].rackCode
						,rackName: data.reqItemList[i].rackName
						,ctReqNo: data.reqItemList[i].ctReqNo
						,ctReqSeq: data.reqItemList[i].ctReqSeq
						,ctProcStep: data.reqItemList[i].ctProcStep
						,pcReqNo: data.reqItemList[i].pcReqNo
						,pcReqSeq: data.reqItemList[i].pcReqSeq
						,logisCode: data.reqItemList[i].rcvLogisCode
						
						,makerName: data.reqItemList[i].makerName
						,className: data.reqItemList[i].className
						,factoryNo: data.reqItemList[i].factoryNo
						
						
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
		
// 창고사용 확인(사용완료)
function reqChk(url, workingType) {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	const chkRow = checkedItems.find((row)=>{
    	if(row.item.chkYmd != '') return true;
	})
	if(chkRow) 
	{
		alert(`이미 처리된 부품이 존재합니다 : 순번 ${chkRow.item.reqSeq}번째`);
		return;
	}
	
	var rowItem;
	var reqArr = "";
	var rseArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		if (i==0){
			reqArr = rowItem.item.storageUseReqNo;
			rseArr = rowItem.item.reqSeq;
		}else{
			reqArr = reqArr + "^" +rowItem.item.storageUseReqNo;
			rseArr = rseArr + "^" +rowItem.item.reqSeq;
		}		
	}
	reqArr = reqArr + "^";
	rseArr = rseArr + "^";
			
	var afterRackCode = $("#popAfterRackCode").val();  		
	/* panclub은 요청취소가 잘되는데 yoonsang로컬은 요청취소시 이동할 렉입력받음 일단 아래코드로 수정
	if (afterRackCode == ''){
		alert("이동할 랙을 입력하세요.");
		 return;
	}
	*/ 
	if (afterRackCode == '' && workingType !="CANCEL"){
		alert("이동할 랙을 입력하세요.");
		 return;
	}
	
	
	var data = {};
    //data.workingType = "CHK";
    data.workingType = workingType;
	
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
			"workingType" : workingType,
			"reqArr" : reqArr,   //요천번호 
			"rseArr" : rseArr,    //요청순번
			"afterRackCode" : afterRackCode
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


// 창고사용 완료 버튼 클릭 시 팝업
function reqChkPop(url, workingType) {

	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	const chkRow = checkedItems.find((row)=>{ 
    	if(row.item.chkYmd != '') return true;
	}) 
	if(chkRow) 
	{
		alert(`이미 처리된 부품이 존재합니다 : 순번 ${chkRow.item.reqSeq}번째`);
		return;
	}

	//창고목록
	commonFindStor("/base/storage-list", 1,'popAfterStorCode','','','', 'Y', 'Y');
	
	//창고입고 팝업
	//$("#popAfterStorCode").val(storageNameStd);
	//$("#popAfterStorName").val(storageCodeStd);
	//$("#popAfterRackCode").val(rackNameStd);
	//$("#popAfterRackName").val(rackCodeStd);
	$(".ui-dialog-titlebar-close").html("X");
	
	var dialogItem;
	dialogItem = $("#dialog-form-chk").dialog({
		//autoOpen: false,
		height: 500,
		//minWidth: 500,
		width: 400,
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position: [400, 400],
		buttons: {
			"확인": function(event) {
				reqChk(url, workingType);
			},
			"취소": function(event) {
				dialogItem.dialog("close");
			}
		},
		close: function() {
			// $( "#users tbody tr td" ).empty();	   	

		},
		open:function(){
			if(lcd =='ㄱ121') //창고사용 요청 사용완료 버튼 누르면 그린파츠의 경우에는 
			{
				$("#popAfterStorCode").val(2); // 출고대기 창고의
				$("#popAfterRackCode").val(1); //1번랙 
				$("#popAfterRackName").val('출고대기랙'); //텍스트 출고대기랙 으로 초기화
			}
		}
	});

	return;
	
}


function resetRackInfo() {
	$("#afterRackCode").val("");
	$("#afterRackName").val("");
}

function updateDataToServer_memo(url) {

	var storageUseReqNo = $("#storageUseReqNo").text();
    var memo1 = $("#memo1").val(); 
    var storageMgr = $("#storageMgr").val(); 
    var useDmdYmd = $("#useDmdYmd").val(); 
    var moveSchYmd = $("#moveSchYmd").val(); 
   
	var data = {};
	data.workingType = "UPT";
	data.storageUseReqNo = storageUseReqNo;  
    data.memo1 = memo1; 
    data.storageMgr = storageMgr; 
    data.useDmdYmd = useDmdYmd; 
    data.moveSchYmd = moveSchYmd; 
	
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : "UPT",
			"storageUseReqNo" : storageUseReqNo,
			"memo1" : memo1,
			"storageMgr" : storageMgr,
			"useDmdYmd" : useDmdYmd,
			"moveSchYmd" : moveSchYmd
		}, success: function(data) {
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


function print_() {
	var storageUseReqNo = $("#storageUseReqNo").text();
	//console.log ("storageUseReqNo" +storageUseReqNo);
	window.open ("/logis/storage-use-req-print?storageUseReqNo="+storageUseReqNo,"_blank");
	
};
		



function updateDataToServer_memo(url) {

	var storageUseReqNo = $("#storageUseReqNo").text();
    var memo1 = $("#memo1").val(); 
    var storageMgr = $("#storageMgr").val(); 
    var useDmdYmd = $("#useDmdYmd").val(); 
    var moveSchYmd = $("#moveSchYmd").val(); 
   
	var data = {};
	data.workingType = "UPT";
	data.storageUseReqNo = storageUseReqNo;  
    data.memo1 = memo1; 
    data.storageMgr = storageMgr; 
    data.useDmdYmd = useDmdYmd; 
    data.moveSchYmd = moveSchYmd; 
	
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : "UPT",
			"storageUseReqNo" : storageUseReqNo,
			"memo1" : memo1,
			"storageMgr" : storageMgr,
			"useDmdYmd" : useDmdYmd,
			"moveSchYmd" : moveSchYmd
		}, success: function(data) {
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


setItemBarcodeScanFun((item)=>
{
	const itemData = {itemId:item.itemId ,
				 itemNo:item.itemNo ,
				 itemName:item.itemName ,
				 rackCode:item.rackCode ,
				 rackName:item.rackName ,
				 storCode:item.storCode ,
				 storName:item.storName ,
				 stockQty:item.stockQty ,
				 
				 };
	 	 
	const GridId = '#grid_wrap'; 
	const auiGridData = AUIGrid.getRowsByValue(GridId , 'itemId' , itemData.itemId); //상세내역 그리드 내에서 itemId가 스캔데이터와 일치하는 행들을 배열로 가져옴
 
 	if(auiGridData.length == 0)
 	{
		itemBarcodeScanfailPopup('스캔한 부품과 동일한 부품ID가 요청에 존재하지 않습니다',itemData);
		return;
	}
 	
 	if(!auiGridData.find((row)=>{if(row.chkYmd == '') return true;}))
 	{
		itemBarcodeScanfailPopup('미처리된 창고사용요청이 없습니다.',itemData);
		return;
	}
	
	const targetRow = auiGridData.find((row)=>{  if(row.rackCode == itemData.rackCode) return true;});
	
	if(!targetRow)
	{
		itemBarcodeScanfailPopup('스캔한 부품의 랙정보와 일치하는 요청이 존재하지 않습니다',itemData);
		return;
	}
 
 	if((targetRow?.barcodeScanQty || 0) >= targetRow.storageUseCnt)
 	{
		itemBarcodeScanfailPopup('스캔한 부품의 스캔한 수량을 더이상 증가시킬수 없습니다(수량확인)',itemData);
		return;
	}
 	const targetIndex = AUIGrid.getRowIndexesByValue(GridId , '_$uid' , targetRow._$uid); // 그리드행의 _$uid를 통해 해당 인덱스 추출
 	AUIGrid.updateRow(GridId , {barcodeScanQty:(targetRow?.barcodeScanQty || 0)+1}, targetIndex[0]); 
 	barcodeScanSuccessCountUp();
 	if((targetRow?.barcodeScanQty || 0)+1 == targetRow.storageUseCnt)
		AUIGrid.addCheckedRowsByValue(GridId ,  '_$uid' , targetRow._$uid); 
 	
}); 

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